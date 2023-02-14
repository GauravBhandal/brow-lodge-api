import { omit as _omit } from "lodash";
import { Op } from "sequelize";

import StaffUnavailabilityModel from "./staffUnavailability.model";
import {
  CreateStaffUnavailabilityInBulkProps,
  CreateStaffUnavailabilityProps,
  DeleteStaffUnavailabilityProps,
  GetStaffUnavailabilityByIdProps,
  GetStaffUnavailabilitysProps,
} from "./staffUnavailability.types";
import { CustomError } from "../../components/errors";
import StaffUnavailabilityErrorCode from "./staffUnavailability.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel, companyService } from "../company";
import { getFilters } from "../../components/filters";
import { StaffProfileModel } from "../staffProfile";
import { StaffUnavailabilityRepeatModel, staffUnavailabilityRepeatService } from "../staffUnavailabilityRepeat";
import { createUnavailableEntries } from "../../utils/unavailabilityGenerator";


class StaffUnavailabilityService {
  async createStaffUnavailabilityInBulk(props: CreateStaffUnavailabilityInBulkProps) {
    const companyData = await companyService.getCompanyById({
      company: props.company,
    });

    const createProps = createUnavailableEntries({
      ...props,
      timezone: companyData.timezone,
    });

    const staffUnavailabilityRepeat = await staffUnavailabilityRepeatService.createStaffUnavailabilityRepeat({
      meta: props.repeat,
      company: props.company,
    });

    const bulkCreateProps = createProps.map((staffUnavailable) => {
      return { ...staffUnavailable, repeat: staffUnavailabilityRepeat.id };
    });

    // Create a staffUnavailabilitys in bulk
    const staffUnavailabilitys = await StaffUnavailabilityModel.bulkCreate(bulkCreateProps);

    return staffUnavailabilitys;
  }

  async createStaffUnavailability(props: CreateStaffUnavailabilityProps) {
    // Create a new staffUnavailability
    const staffUnavailability = await StaffUnavailabilityModel.create(props);

    return staffUnavailability;
  }


  async deleteStaffUnavailability(props: DeleteStaffUnavailabilityProps) {
    // Props
    const { id, company, deleteRecurring } = props;
    // Find  the staffUnavailability by id and company
    const staffUnavailability = await StaffUnavailabilityModel.findOne({
      where: { id, company },
    });
    // if staffUnavailability has not been found, throw an error
    if (!staffUnavailability) {
      throw new CustomError(404, StaffUnavailabilityErrorCode.STAFF_UNAVAILABILITY_NOT_FOUND);
    }

    if (deleteRecurring && staffUnavailability.repeat) {
      // Find and delete the staffUnavailabilitys by company, has repeat and date greater than equal to that shift
      const staffUnavailabilitys = await StaffUnavailabilityModel.destroy({
        where: {
          company,
          repeat: staffUnavailability.repeat,
          startDateTime: { [Op.gte]: staffUnavailability.startDateTime },
        },
      });
      return staffUnavailabilitys;
    } else {
      // Find and delete the staffUnavailability by id and company
      const staffUnavailability = await StaffUnavailabilityModel.destroy({
        where: { id, company },
      });
      return staffUnavailability;
    }
  }

  async getStaffUnavailabilityById(props: GetStaffUnavailabilityByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the staffUnavailability by id and company
    const staffUnavailability = await StaffUnavailabilityModel.findOne({
      where: { id, company },
      include: [
        {
          model: CompanyModel,
        },
        {
          model: StaffProfileModel,
          through: {
            attributes: [],
          },
          as: "Staff",
        },
      ],
    });

    // If no staffUnavailability has been found, then throw an error
    if (!staffUnavailability) {
      throw new CustomError(404, StaffUnavailabilityErrorCode.STAFF_UNAVAILABILITY_NOT_FOUND);
    }

    return staffUnavailability;
  }

  async getStaffUnavailabilitys(props: GetStaffUnavailabilitysProps) {
    // Props
    const { page, pageSize, sort, where, company } = props;

    const { offset, limit } = getPagingParams(page, pageSize);
    const order = getSortingParams(sort);
    const filters = getFilters(where);

    const include = [
      {
        model: CompanyModel,
      },
      {
        model: StaffProfileModel,
        as: "Staff",
        where: {
          ...filters["Staff"],
        },
      },
      {
        model: StaffUnavailabilityRepeatModel,
        as: "Repeat",
      },
    ];

    // Count total staffUnavailabilitys in the given company
    const count = await StaffUnavailabilityModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
      include,
    });

    // Find all staffUnavailabilitys for matching props and company
    const data = await StaffUnavailabilityModel.findAll({
      // offset, We don't need pagination for this endpoint
      // limit,
      order,
      where: {
        company,
        ...filters["primaryFilters"],
      },
      include,
    });

    const response = getPagingData({ count, rows: data }, page, limit);

    return response;
  }

}

export default new StaffUnavailabilityService();
