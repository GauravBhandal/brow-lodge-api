import { isString, omit as _omit } from "lodash";
import { Op } from "sequelize";

import ClientProfileModel from "./clientProfile.model";
import {
  CreateClientProfileProps,
  UpdateClientProfileProps,
  DeleteClientProfileProps,
  GetClientProfileByIdProps,
  GetClientProfilesProps,
  GetAllClientProfilesProps,
} from "./clientProfile.types";
import { CustomError } from "../../components/errors";
import ClientProfileErrorCode from "./clientProfile.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { getFilters } from "../../components/filters";
import { CompanyModel } from "../company";

class ClientProfileService {
  async createClientProfile(props: CreateClientProfileProps) {
    const createClientProps = {
      firstName: props.firstName,
      lastName: props.lastName,
      email: props.email,
      company: props.company,
      gender: props.gender,
      address: props.address,
      personalContactNumber: props.personalContactNumber,
      dateOfBirth: props.dateOfBirth
    };

    const clientProfile = await ClientProfileModel.create(createClientProps);
    return clientProfile;
  }

  async updateClientProfile(props: UpdateClientProfileProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find clientProfile by id and company
    const clientProfile = await ClientProfileModel.findOne({
      where: { id, company },
    });

    // if clientProfile not found, throw an error
    if (!clientProfile) {
      throw new CustomError(
        404,
        ClientProfileErrorCode.CLIENT_PROFILE_NOT_FOUND
      );
    }
    
    // Finally, update the clientProfile
    const [, [updatedClientProfile]] = await ClientProfileModel.update(
      updateProps,
      {
        where: { id, company },
        returning: true,
      }
    );

    return updatedClientProfile;
  }

  async deleteClientProfile(props: DeleteClientProfileProps) {
    // Props
    const { id, company } = props;

    const getClientProfile = await ClientProfileModel.findOne({
      where: { id, company },
      include: [
        {
          model: CompanyModel,
        },
      ],
    });

    if (!getClientProfile) {
      throw new CustomError(
        404,
        ClientProfileErrorCode.CLIENT_PROFILE_NOT_FOUND
      );
    }

    // Find and delete the clientProfile by id and company
    const clientProfile = await ClientProfileModel.destroy({
      where: { id, company },
    });

    // If no clientProfile has been deleted, then throw an error
    if (!clientProfile) {
      throw new CustomError(
        404,
        ClientProfileErrorCode.CLIENT_PROFILE_NOT_FOUND
      );
    }

    return clientProfile;
  }

  async getClientProfileById(props: GetClientProfileByIdProps) {
    // Props
    const { id, company } = props;

    // Find the clientProfile by id and company
    const clientProfile = await ClientProfileModel.findOne({
      where: { id, company },
      include: [
        {
          model: CompanyModel,
        },
      ],
    });

    // If no clientProfile has been found, then throw an error
    if (!clientProfile) {
      throw new CustomError(
        404,
        ClientProfileErrorCode.CLIENT_PROFILE_NOT_FOUND
      );
    }

    return clientProfile;
  }

  async getAllClientProfiles(props: GetAllClientProfilesProps) {
    const { company } = props;
    const include = [
      {
        model: CompanyModel,
      },
    ];

    const clientProfilesList = await ClientProfileModel.findAll({
      where: {
        company,
      },
      include,
    });

    return clientProfilesList;
  }

  async getClientProfiles(props: GetClientProfilesProps) {
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
    ];

    // Count total clientProfiles in the given company
    const count = await ClientProfileModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
      include,
    });

    // Find all clientProfiles for matching props and company
    const data = await ClientProfileModel.findAll({
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

export default new ClientProfileService();
