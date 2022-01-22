import { omit as _omit } from "lodash";

import ClientAssetModel from "./clientAsset.model";
import {
  CreateClientAssetProps,
  UpdateClientAssetProps,
  DeleteClientAssetProps,
  GetClientAssetByIdProps,
  GetClientAssetsProps,
} from "./clientAsset.types";
import { CustomError } from "../../components/errors";
import ClientAssetErrorCode from "./clientAsset.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { StaffProfileModel } from "../staffProfile";
import { ClientProfileModel } from "../clientProfile";
import { getFilters } from "../../components/filters";

class ClientAssetService {
  async createClientAsset(props: CreateClientAssetProps) {
    const clientAsset = await ClientAssetModel.create(props);
    return clientAsset;
  }

  async updateClientAsset(props: UpdateClientAssetProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find clientAsset by id and company
    const clientAsset = await ClientAssetModel.findOne({
      where: { id, company },
    });

    // if clientAsset not found, throw an error
    if (!clientAsset) {
      throw new CustomError(404, ClientAssetErrorCode.CLIENT_ASSET_NOT_FOUND);
    }

    // Finally, update the clientAsset
    const [, [updatedClientAsset]] = await ClientAssetModel.update(
      updateProps,
      {
        where: { id, company },
        returning: true,
      }
    );
    return updatedClientAsset;
  }

  async deleteClientAsset(props: DeleteClientAssetProps) {
    // Props
    const { id, company } = props;

    // Find and delete the clientAsset by id and company
    const clientAsset = await ClientAssetModel.destroy({
      where: { id, company },
    });

    // if clientAsset has been deleted, throw an error
    if (!clientAsset) {
      throw new CustomError(404, ClientAssetErrorCode.CLIENT_ASSET_NOT_FOUND);
    }

    return clientAsset;
  }

  async getClientAssetById(props: GetClientAssetByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the clientAsset by id and company
    const clientAsset = await ClientAssetModel.findOne({
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

    // If no clientAsset has been found, then throw an error
    if (!clientAsset) {
      throw new CustomError(404, ClientAssetErrorCode.CLIENT_ASSET_NOT_FOUND);
    }

    return clientAsset;
  }

  async getClientAssets(props: GetClientAssetsProps) {
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

    // Count total clientAssets in the given company
    const count = await ClientAssetModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      include,
    });

    // Find all clientAssets for matching props and company
    const data = await ClientAssetModel.findAll({
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

export default new ClientAssetService();
