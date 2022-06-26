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
import { addCientFiltersByTeams, getFilters } from "../../components/filters";
import { clientAssetAttachmentService } from "./clientAssetAttachment";
import { AttachmentModel } from "../attachment";

class ClientAssetService {
  async createClientAsset(props: CreateClientAssetProps) {
    const clientAsset = await ClientAssetModel.create(props);
    // Create attachments
    if (props.attachments && props.attachments.length) {
      await clientAssetAttachmentService.createBulkClientAssetAttachment({
        relation: clientAsset.id,
        attachments: props.attachments,
      });
    }
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

    // Update attachments
    if (props.attachments) {
      await clientAssetAttachmentService.updateBulkClientAssetAttachment({
        relation: clientAsset.id,
        attachments: props.attachments,
      });
    }
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
        {
          model: AttachmentModel,
          through: {
            attributes: [],
          },
        },
      ],
    });

    // If no clientAsset has been found, then throw an error
    if (!clientAsset) {
      throw new CustomError(404, ClientAssetErrorCode.CLIENT_ASSET_NOT_FOUND);
    }

    return clientAsset;
  }

  async getClientAssets(props: GetClientAssetsProps, userId: string) {
    // Props
    const { page, pageSize, sort, where, company } = props;

    const { offset, limit } = getPagingParams(page, pageSize);
    const order = getSortingParams(sort);
    const filters = getFilters(where);

    const clientFilters = await addCientFiltersByTeams(userId, company);

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
          ...clientFilters,
        },
      },
    ];

    // Count total clientAssets in the given company
    const count = await ClientAssetModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
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

    const response = getPagingData({ count, rows: data }, page, limit);

    return response;
  }
}

export default new ClientAssetService();
