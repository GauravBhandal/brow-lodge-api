import { omit as _omit } from "lodash";
import { Op } from "sequelize";

import StaffProfileModel from "./staffProfile.model";
import {
  CreateStaffProfileProps,
  UpdateStaffProfileProps,
  DeleteStaffProfileProps,
  GetStaffProfileByIdProps,
  GetStaffProfilesProps,
} from "./staffProfile.types";
import { CustomError } from "../../components/errors";
import StaffProfileErrorCode from "./staffProfile.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { getFilters } from "../../components/filters";
import { CompanyModel } from "../company";
import { UserModel } from "../user";
import { staffProfilePayLevelService } from "./staffProfilePayLevel";
import { PayLevelModel } from "../payLevel";

class StaffProfileService {
  async createStaffProfile(props: CreateStaffProfileProps) {
    const staffProfile = await StaffProfileModel.create(props);

    // Assign pay levels
    if (props.paylevel && props.paylevel.length) {
      await staffProfilePayLevelService.createBulkStaffProfilePayLevel({
        staff: staffProfile.id,
        paylevel: props.paylevel,
      });
    }

    return staffProfile;
  }

  async updateStaffProfile(props: UpdateStaffProfileProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find staffProfile by id and company
    const staffProfile = await StaffProfileModel.findOne({
      where: { id, company },
    });

    // if staffProfile not found, throw an error
    if (!staffProfile) {
      throw new CustomError(404, StaffProfileErrorCode.STAFF_PROFILE_NOT_FOUND);
    }

    // Finally, update the staffProfile
    const [, [updatedStaffProfile]] = await StaffProfileModel.update(
      updateProps,
      {
        where: { id, company },
        returning: true,
      }
    );

    // Update pay levels
    if (props.paylevel) {
      await staffProfilePayLevelService.updateBulkStaffProfilePayLevel({
        staff: staffProfile.id,
        paylevel: props.paylevel,
      });
    }

    return updatedStaffProfile;
  }

  async deleteStaffProfile(props: DeleteStaffProfileProps) {
    // Props
    const { id, company } = props;

    // Find and delete the staffProfile by id and company
    const staffProfile = await StaffProfileModel.destroy({
      where: { id, company },
    });

    // If no staffProfile has been deleted, then throw an error
    if (!staffProfile) {
      throw new CustomError(404, StaffProfileErrorCode.STAFF_PROFILE_NOT_FOUND);
    }

    return staffProfile;
  }

  async getStaffProfileById(props: GetStaffProfileByIdProps) {
    // Props
    const { id, company } = props;

    // Find the staffProfile by id and company
    const staffProfile = await StaffProfileModel.findOne({
      where: { id, company },
      include: [
        {
          model: CompanyModel,
        },
        {
          model: UserModel,
          as: "User",
        },
        { model: StaffProfileModel, as: "Manager" },
        {
          model: PayLevelModel,
          through: {
            attributes: [],
          },
          as: "Paylevel",
        },
      ],
    });

    // If no staffProfile has been found, then throw an error
    if (!staffProfile) {
      throw new CustomError(404, StaffProfileErrorCode.STAFF_PROFILE_NOT_FOUND);
    }

    return staffProfile;
  }

  async getStaffProfiles(props: GetStaffProfilesProps) {
    // Props
    const { page, pageSize, sort, where, company } = props;

    const { offset, limit } = getPagingParams(page, pageSize);
    const order = getSortingParams(sort);
    let filters = getFilters(where);

    // Only return archived results if filters contains archived
    if (filters.primaryFilters && !filters.primaryFilters.archived) {
      filters.primaryFilters.archived = {
        [Op.eq]: "false",
      };
    } else if (!filters.primaryFilters) {
      filters = {
        primaryFilters: {
          archived: {
            [Op.eq]: "false",
          },
        },
      };
    }

    const include = [
      {
        model: CompanyModel,
      },
      {
        model: UserModel,
        as: "User",
        where: {
          ...filters["User"],
        },
      },
      { model: StaffProfileModel, as: "Manager" },
      {
        model: PayLevelModel,
        through: {
          attributes: [],
        },
        where: {
          ...filters["Paylevel"],
        },
        as: "Paylevel",
        duplicating: true,
        required: false,
      },
    ];

    // Count total staffProfiles in the given company
    const count = await StaffProfileModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
      include,
    });

    // Find all staffProfiles for matching props and company
    const data = await StaffProfileModel.findAll({
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

export default new StaffProfileService();
