import { omit as _omit } from "lodash";

import StaffSleepDisturbanceModel from "./staffSleepDisturbance.model";
import {
  CreateStaffSleepDisturbanceProps,
  UpdateStaffSleepDisturbanceProps,
  DeleteStaffSleepDisturbanceProps,
  GetStaffSleepDisturbanceByIdProps,
  GetStaffSleepDisturbancesProps,
} from "./staffSleepDisturbance.types";
import { CustomError } from "../../components/errors";
import StaffSleepDisturbanceErrorCode from "./staffSleepDisturbance.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { ClientProfileModel } from "../clientProfile";
import { StaffProfileModel } from "../staffProfile";

import { getFilters } from "../../components/filters";

class StaffSleepDisturbanceService {
  async createStaffSleepDisturbance(props: CreateStaffSleepDisturbanceProps) {
    const staffSleepDisturbance = await StaffSleepDisturbanceModel.create(
      props
    );
    return staffSleepDisturbance;
  }

  async updateStaffSleepDisturbance(props: UpdateStaffSleepDisturbanceProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find staffSleepDisturbance by id and company
    const staffSleepDisturbance = await StaffSleepDisturbanceModel.findOne({
      where: { id, company },
    });

    // if staffSleepDisturbance not found, throw an error
    if (!staffSleepDisturbance) {
      throw new CustomError(
        404,
        StaffSleepDisturbanceErrorCode.STAFF_SLEEP_DISTURBANCE_NOT_FOUND
      );
    }

    // Finally, update the staffSleepDisturbance
    const [, [updatedStaffSleepDisturbance]] =
      await StaffSleepDisturbanceModel.update(updateProps, {
        where: { id, company },
        returning: true,
      });
    return updatedStaffSleepDisturbance;
  }

  async deleteStaffSleepDisturbance(props: DeleteStaffSleepDisturbanceProps) {
    // Props
    const { id, company } = props;

    // Find and delete the staffSleepDisturbance by id and company
    const staffSleepDisturbance = await StaffSleepDisturbanceModel.destroy({
      where: { id, company },
    });

    // if staffSleepDisturbance has been deleted, throw an error
    if (!staffSleepDisturbance) {
      throw new CustomError(
        404,
        StaffSleepDisturbanceErrorCode.STAFF_SLEEP_DISTURBANCE_NOT_FOUND
      );
    }

    return staffSleepDisturbance;
  }

  async getStaffSleepDisturbanceById(props: GetStaffSleepDisturbanceByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the staffSleepDisturbance by id and company
    const staffSleepDisturbance = await StaffSleepDisturbanceModel.findOne({
      where: { id, company },
      include: [
        {
          model: CompanyModel,
        },
        {
          model: StaffProfileModel,
          as: "Staff",
        },
        {
          model: ClientProfileModel,
          as: "Client",
        },
      ],
    });

    // If no staffSleepDisturbance has been found, then throw an error
    if (!staffSleepDisturbance) {
      throw new CustomError(
        404,
        StaffSleepDisturbanceErrorCode.STAFF_SLEEP_DISTURBANCE_NOT_FOUND
      );
    }

    return staffSleepDisturbance;
  }

  async getStaffSleepDisturbances(props: GetStaffSleepDisturbancesProps) {
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
        model: ClientProfileModel,
        as: "Client",
        where: {
          ...filters["Client"],
        },
      },
    ];
    // Count total staffSleepDisturbances in the given company
    const count = await StaffSleepDisturbanceModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
      include,
    });

    // Find all staffSleepDisturbances for matching props and company
    const data = await StaffSleepDisturbanceModel.findAll({
      offset,
      limit,
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

export default new StaffSleepDisturbanceService();
