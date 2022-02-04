import { omit as _omit } from "lodash";

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

class StaffProfileService {
  async createStaffProfile(props: CreateStaffProfileProps) {
    const staffProfile = await StaffProfileModel.create(props);
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
    const filters = getFilters(where);

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

    // TODO: Clean up getPagingData function
    const response = getPagingData({ count, rows: data }, page, limit);

    return response;
  }
}

export default new StaffProfileService();
