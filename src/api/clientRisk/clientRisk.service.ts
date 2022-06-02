import { omit as _omit } from "lodash";

import ClientRiskModel from "./clientRisk.model";
import {
  CreateClientRiskProps,
  UpdateClientRiskProps,
  DeleteClientRiskProps,
  GetClientRiskByIdProps,
  GetClientRisksProps,
} from "./clientRisk.types";
import { CustomError } from "../../components/errors";
import ClientRiskErrorCode from "./clientRisk.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { ClientProfileModel } from "../clientProfile";
import { StaffProfileModel } from "../staffProfile";

import { addCientFiltersByTeams, getFilters } from "../../components/filters";
import { clientRiskAttachmentService } from "./clientRiskAttachment";
import { AttachmentModel } from "../attachment";

class ClientRiskService {
  async createClientRisk(props: CreateClientRiskProps) {
    const clientRisk = await ClientRiskModel.create(props);

    // Create attachments
    if (props.attachments && props.attachments.length) {
      await clientRiskAttachmentService.createBulkClientRiskAttachment({
        relation: clientRisk.id,
        attachments: props.attachments,
      });
    }

    return clientRisk;
  }

  async updateClientRisk(props: UpdateClientRiskProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find clientRisk by id and company
    const clientRisk = await ClientRiskModel.findOne({
      where: { id, company },
    });

    // if clientRisk not found, throw an error
    if (!clientRisk) {
      throw new CustomError(404, ClientRiskErrorCode.CLIENT_RISK_NOT_FOUND);
    }

    // Finally, update the clientRisk
    const [, [updatedClientRisk]] = await ClientRiskModel.update(updateProps, {
      where: { id, company },
      returning: true,
    });

    // Update attachments
    if (props.attachments) {
      await clientRiskAttachmentService.updateBulkClientRiskAttachment({
        relation: clientRisk.id,
        attachments: props.attachments,
      });
    }

    return updatedClientRisk;
  }

  async deleteClientRisk(props: DeleteClientRiskProps) {
    // Props
    const { id, company } = props;

    // Find and delete the clientRisk by id and company
    const clientRisk = await ClientRiskModel.destroy({
      where: { id, company },
    });

    // if clientRisk has been deleted, throw an error
    if (!clientRisk) {
      throw new CustomError(404, ClientRiskErrorCode.CLIENT_RISK_NOT_FOUND);
    }

    return clientRisk;
  }

  async getClientRiskById(props: GetClientRiskByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the clientRisk by id and company
    const clientRisk = await ClientRiskModel.findOne({
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

    // If no clientRisk has been found, then throw an error
    if (!clientRisk) {
      throw new CustomError(404, ClientRiskErrorCode.CLIENT_RISK_NOT_FOUND);
    }

    return clientRisk;
  }

  async getClientRisks(props: GetClientRisksProps, userId: string) {
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
    // Count total clientRisks in the given company
    const count = await ClientRiskModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
      include,
    });

    // Find all clientRisks for matching props and company
    const data = await ClientRiskModel.findAll({
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

export default new ClientRiskService();
