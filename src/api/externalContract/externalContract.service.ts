import { omit as _omit } from "lodash";

import ExternalContractModel from "./externalContract.model";
import {
  CreateExternalContractProps,
  UpdateExternalContractProps,
  DeleteExternalContractProps,
  GetExternalContractByIdProps,
  GetExternalContractsProps,
} from "./externalContract.types";
import { CustomError } from "../../components/errors";
import ExternalContractErrorCode from "./externalContract.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { StaffProfileModel } from "../staffProfile";
import { getFilters } from "../../components/filters";
import { externalContractAttachmentService } from "./externalContractAttachment";
import { AttachmentModel } from "../attachment";

class ExternalContractService {
  async createExternalContract(props: CreateExternalContractProps) {
    const externalContract = await ExternalContractModel.create(props);

    // Create attachments
    if (props.attachments && props.attachments.length) {
      await externalContractAttachmentService.createBulkExternalContractAttachment(
        {
          relation: externalContract.id,
          attachments: props.attachments,
        }
      );
    }
    return externalContract;
  }

  async updateExternalContract(props: UpdateExternalContractProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find externalContract by id and company
    const externalContract = await ExternalContractModel.findOne({
      where: { id, company },
    });

    // if externalContract not found, throw an error
    if (!externalContract) {
      throw new CustomError(404, ExternalContractErrorCode.EXTERNAL_CONTRACT);
    }

    // Finally, update the externalContract
    const [, [updatedExternalContract]] = await ExternalContractModel.update(
      updateProps,
      {
        where: { id, company },
        returning: true,
      }
    );

    // Update attachments
    if (props.attachments) {
      await externalContractAttachmentService.updateBulkExternalContractAttachment(
        {
          relation: externalContract.id,
          attachments: props.attachments,
        }
      );
    }

    return updatedExternalContract;
  }

  async deleteExternalContract(props: DeleteExternalContractProps) {
    // Props
    const { id, company } = props;

    // Find and delete the externalContract by id and company
    const externalContract = await ExternalContractModel.destroy({
      where: { id, company },
    });

    // if externalContract has been deleted, throw an error
    if (!externalContract) {
      throw new CustomError(404, ExternalContractErrorCode.EXTERNAL_CONTRACT);
    }

    return externalContract;
  }

  async getExternalContractById(props: GetExternalContractByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the externalContract by id and company
    const externalContract = await ExternalContractModel.findOne({
      where: { id, company },
      include: [
        {
          model: AttachmentModel,
          through: {
            attributes: [],
          },
        },
        {
          model: CompanyModel,
        },
        {
          model: StaffProfileModel,
          as: "Staff",
        },
      ],
    });

    // If no externalContract has been found, then throw an error
    if (!externalContract) {
      throw new CustomError(404, ExternalContractErrorCode.EXTERNAL_CONTRACT);
    }

    return externalContract;
  }

  async getExternalContracts(props: GetExternalContractsProps) {
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
    ];

    // Count total externalContracts in the given company
    const count = await ExternalContractModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
      include,
    });

    // Find all externalContracts for matching props and company
    const data = await ExternalContractModel.findAll({
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

export default new ExternalContractService();
