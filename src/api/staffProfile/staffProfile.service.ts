import { isString, omit as _omit } from "lodash";
import { Op } from "sequelize";

import StaffProfileModel from "./staffProfile.model";
import {
  CreateStaffProfileProps,
  UpdateStaffProfileProps,
  DeleteStaffProfileProps,
  GetStaffProfileByIdProps,
  GetStaffProfilesProps,
  GetStaffProfileByUserProps,
  GetAllStaffProfilesProps,
} from "./staffProfile.types";
import { CustomError } from "../../components/errors";
import StaffProfileErrorCode from "./staffProfile.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { getFilters } from "../../components/filters";
import { CompanyModel } from "../company";
import { User, UserModel, userService } from "../user";

class StaffProfileService {
  async createStaffProfile(props: CreateStaffProfileProps) {
    const { preferredName, email, password } = props;

    // Check if staff already exist
    const existingStaffWithName = await StaffProfileModel.findOne({
      where: {
        preferredName: {
          [Op.iLike]: `${preferredName}`,
        },
        company: props.company,
      },
    });

    let existingStaffWithEmail = null;

    let existingStaffWithUser = null;

    if (
      isString(email) &&
      email.length > 0 &&
      isString(password) &&
      password.length > 0
    ) {
      existingStaffWithEmail = await StaffProfileModel.findOne({
        where: {
          email: {
            [Op.iLike]: `${email}`,
          },
          company: props.company,
        },
      });

      // TODO: We are not using company id here which might be a problem
      existingStaffWithUser = await UserModel.findOne({
        where: {
          email: {
            [Op.iLike]: `${email}`,
          },
        },
      });
    }

    // if the staff exists, throw an error
    if (existingStaffWithName) {
      throw new CustomError(
        409,
        StaffProfileErrorCode.STAFF_PROFILE_NAME_ALREADY_EXIST
      );
    }
    if (existingStaffWithEmail || existingStaffWithUser) {
      throw new CustomError(
        409,
        StaffProfileErrorCode.STAFF_PROFILE_EMAIL_ALREADY_EXIST
      );
    }
    let user = null;
    if (email && isString(email) && email.length > 0 && props.roles) {
      const createUserProps = _omit(props, ["preferredName"]);
      user = (await userService.createUser({
        ...createUserProps,
        email: email ? email : "",
      })) as User;
    }

    const createStaffProps = {
      firstName: props.firstName,
      lastName: props.lastName,
      preferredName: props.preferredName,
      email: props.email,
      user: user ? user.id : null,
      company: props.company,
      gender: props.gender,
      jobTitle: props.jobTitle,
    };

    const staffProfile = await StaffProfileModel.create(createStaffProps);
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
    if (
      staffProfile.preferredName.toLowerCase() !==
      props.preferredName.toLowerCase()
    ) {
      // Check if Staff with same preferred name already exists
      const existingStaff = await StaffProfileModel.findOne({
        where: {
          preferredName: {
            [Op.iLike]: `${props.preferredName}`,
          },
          company,
        },
      });

      // If exists, then throw an error
      if (existingStaff) {
        throw new CustomError(
          409,
          StaffProfileErrorCode.STAFF_PROFILE_NAME_ALREADY_EXIST
        );
      }
    }

    if (
      staffProfile.email &&
      props.email &&
      staffProfile.email.toLowerCase() !== props.email.toLowerCase()
    ) {
      // Check if Staff with same email already exists
      const existingStaff = await StaffProfileModel.findOne({
        where: {
          email: {
            [Op.iLike]: `${props.email}`, // We are not using company here
          },
        },
      });

      // If exists, then throw an error
      if (existingStaff) {
        throw new CustomError(
          409,
          StaffProfileErrorCode.STAFF_PROFILE_EMAIL_ALREADY_EXIST
        );
      }
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

    const getStaffProfile = await StaffProfileModel.findOne({
      where: { id, company },
      include: [
        {
          model: CompanyModel,
        },
        {
          model: UserModel,
          as: "User",
        },
      ],
    });

    if (!getStaffProfile) {
      throw new CustomError(404, StaffProfileErrorCode.STAFF_PROFILE_NOT_FOUND);
    }

    if (getStaffProfile?.user) {
      userService.deleteUser({ id: getStaffProfile?.user, company });
    }

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
      ],
    });

    // If no staffProfile has been found, then throw an error
    if (!staffProfile) {
      throw new CustomError(404, StaffProfileErrorCode.STAFF_PROFILE_NOT_FOUND);
    }

    return staffProfile;
  }

  async getStaffProfileByUser(props: GetStaffProfileByUserProps) {
    // Props
    const { user, company } = props;

    // Find the staffProfile by id and company
    const staffProfile = await StaffProfileModel.findOne({
      where: { user, company },
      include: [
        {
          model: CompanyModel,
        },
        {
          model: UserModel,
          as: "User",
          required: false,
        },
      ],
    });

    // If no staffProfile has been found, then throw an error
    if (!staffProfile) {
      throw new CustomError(404, StaffProfileErrorCode.STAFF_PROFILE_NOT_FOUND);
    }

    return staffProfile;
  }

  async getAllStaffProfiles(props: GetAllStaffProfilesProps) {
    const { company } = props;
    const include = [
      {
        model: CompanyModel,
      },
    ];

    const staffProfilesList = await StaffProfileModel.findAll({
      where: {
        company,
      },
      include,
    });

    return staffProfilesList;
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
        required: false,
        where: {
          ...filters["User"],
        },
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
