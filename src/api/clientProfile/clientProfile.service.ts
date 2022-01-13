import ClientProfileModel from "./clientProfile.model";
import {
  ClientProfile,
  CreateClientProfileProps,
  UpdateClientProfileProps,
} from "./clientProfile.types";
import { CustomError } from "../../components/errors";
import ClientProfileErrorCode from "./clientProfile.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { QueryParams } from "../../common/types";

class ClientProfileService {
  async createClientProfile(props: CreateClientProfileProps) {
    const clientProfile = await ClientProfileModel.create(props);
    return clientProfile;
  }

  async updateClientProfile(
    clientProfileId: ClientProfile["id"],
    props: UpdateClientProfileProps
  ) {
    const clientProfile = await ClientProfileModel.findOne({
      where: { id: clientProfileId },
    });
    if (!clientProfile) {
      throw new CustomError(
        404,
        ClientProfileErrorCode.CLIENT_PROFILE_NOT_FOUND
      );
    }
    const [, [updatedClientProfile]] = await ClientProfileModel.update(props, {
      where: { id: clientProfileId },
      returning: true,
    });
    return updatedClientProfile;
  }

  async deleteClientProfile(clientProfileId: ClientProfile["id"]) {
    const clientProfile = await ClientProfileModel.destroy({
      where: { id: clientProfileId },
    });
    return clientProfile;
  }

  async getClientProfiles(queryParams: QueryParams) {
    const { page, pageSize, sort } = queryParams;

    const { offset, limit } = getPagingParams(page, pageSize);
    const order = getSortingParams(sort);

    const data = await ClientProfileModel.findAndCountAll({
      offset,
      limit,
      order,
    });

    const response = getPagingData(data, page, limit);

    return response;
  }

  async getClientProfileById(clientProfileId: ClientProfile["id"]) {
    const clientProfile = await ClientProfileModel.findOne({
      where: { id: clientProfileId },
    });
    return clientProfile;
  }
}

export default new ClientProfileService();
