import { omit as _omit } from "lodash";
import { Op } from "sequelize";

import ClientProfileModel from "./clientProfile.model";
import {
  CreateClientProfileProps,
  DeleteClientProfileProps,
  GetClientProfileByIdProps,
  GetClientProfilesProps,
  UpdateClientProfileProps,
} from "./clientProfile.types";
import { CustomError } from "../../components/errors";
import ClientProfileErrorCode from "./clientProfile.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { addCientFiltersByTeams, getFilters } from "../../components/filters";
import { clientContactService } from "./clientContact";
import { CreateClientContactProps } from "./clientContact/clientContact.types";

class ClientProfileService {
  async createClientProfile(props: CreateClientProfileProps) {
    const clientProfile = await ClientProfileModel.create(props);
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

    if (props.contacts && props.contacts.length) {
      const updatedClientContacts = props.contacts.map(
        (clientContact: any) => ({
          ...clientContact,
          client: id,
          company,
        })
      );
      const updateClientContactsProp = {
        client: id,
        company,
        contacts: updatedClientContacts,
      };
      await clientContactService.updateBulkClientContact(
        updateClientContactsProp
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

    // Find  the clientProfile by id and company
    const clientProfile = await ClientProfileModel.findOne({
      where: { id, company },
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

  async getClientProfiles(props: GetClientProfilesProps, userId: string) {
    // Props
    const { page, pageSize, sort, where, company } = props;

    const { offset, limit } = getPagingParams(page, pageSize);
    const order = getSortingParams(sort);
    let filters = getFilters(where);
    const clientFilters = await addCientFiltersByTeams(userId, company);

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

    // Count total clientProfiles in the given company
    const count = await ClientProfileModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
    });

    // Find all clientProfiles for matching props and company
    const data = await ClientProfileModel.findAll({
      offset,
      limit,
      order,
      where: {
        company,
        ...filters["primaryFilters"],
        ...clientFilters,
      },
    });

    const response = getPagingData({ count, rows: data }, page, limit);

    return response;
  }
}

export default new ClientProfileService();
