import { omit as _omit } from "lodash";

import RepairRequestModel from "./repairRequest.model";
import {
  CreateRepairRequestProps,
  UpdateRepairRequestProps,
  DeleteRepairRequestProps,
  GetRepairRequestByIdProps,
  GetRepairRequestsProps,
} from "./repairRequest.types";
import { CustomError } from "../../components/errors";
import RepairRequestErrorCode from "./repairRequest.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { StaffProfileModel } from "../staffProfile";
import { getFilters } from "../../components/filters";
import { repairRequestAttachmentService } from "./repairRequestAttachment";
import { AttachmentModel } from "../attachment";

class RepairRequestService {
  async createRepairRequest(props: CreateRepairRequestProps) {
    const repairRequest = await RepairRequestModel.create(props);

    // Create attachments
    if (props.attachments && props.attachments.length) {
      await repairRequestAttachmentService.createBulkRepairRequestAttachment({
        relation: repairRequest.id,
        attachments: props.attachments,
      });
    }

    return repairRequest;
  }

  async updateRepairRequest(props: UpdateRepairRequestProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find repairRequest by id and company
    const repairRequest = await RepairRequestModel.findOne({
      where: { id, company },
    });

    // if repairRequest not found, throw an error
    if (!repairRequest) {
      throw new CustomError(
        404,
        RepairRequestErrorCode.REPAIR_REQUEST_NOT_FOUND
      );
    }

    // Finally, update the repairRequest
    const [, [updatedRepairRequest]] = await RepairRequestModel.update(
      updateProps,
      {
        where: { id, company },
        returning: true,
      }
    );

    // Update attachments
    if (props.attachments) {
      await repairRequestAttachmentService.updateBulkRepairRequestAttachment({
        relation: repairRequest.id,
        attachments: props.attachments,
      });
    }

    return updatedRepairRequest;
  }

  async deleteArchiveRepairRequest(props: DeleteRepairRequestProps) {
    // Props
    const { id, company } = props;

    // Find and delete the repairRequest by id and company
    const repairRequest = await RepairRequestModel.findOne({
      where: { id, company },
    });

    // if repairRequest has been deleted, throw an error
    if (!repairRequest) {
      throw new CustomError(
        404,
        RepairRequestErrorCode.REPAIR_REQUEST_NOT_FOUND
      );
    }

    if (repairRequest.archived) {
      // Check if repairRequest already exists
      const existingRepairRequest = await RepairRequestModel.findAll({
        where: {
          risk: repairRequest.risk,
          staff: repairRequest.staff,
          problem: repairRequest.problem,
          location: repairRequest.location,
          priority: repairRequest.priority,
          company: repairRequest.company,
          archived: false,
        },
      });

      if (existingRepairRequest.length > 0) {
        throw new CustomError(
          409,
          RepairRequestErrorCode.REPAIR_REQUEST_ALREADY_EXISTS
        );
      }
    }

    // Finally, update the repairRequest update the Archive state
    const [, [updatedRepairRequest]] = await RepairRequestModel.update(
      { archived: !repairRequest.archived },
      {
        where: { id, company },
        returning: true,
      }
    );

    return updatedRepairRequest;
  }

  async deleteRepairRequest(props: DeleteRepairRequestProps) {
    // Props
    const { id, company } = props;

    // Find and delete the repairRequest by id and company
    const repairRequest = await RepairRequestModel.destroy({
      where: { id, company },
    });

    // if repairRequest has been deleted, throw an error
    if (!repairRequest) {
      throw new CustomError(
        404,
        RepairRequestErrorCode.REPAIR_REQUEST_NOT_FOUND
      );
    }

    return repairRequest;
  }

  async getRepairRequestById(props: GetRepairRequestByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the repairRequest by id and company
    const repairRequest = await RepairRequestModel.findOne({
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
          model: StaffProfileModel,
          as: "ClosedBy",
        },
        {
          model: AttachmentModel,
          through: {
            attributes: [],
          },
        },
      ],
    });

    // If no repairRequest has been found, then throw an error
    if (!repairRequest) {
      throw new CustomError(
        404,
        RepairRequestErrorCode.REPAIR_REQUEST_NOT_FOUND
      );
    }

    return repairRequest;
  }

  async getRepairRequests(props: GetRepairRequestsProps) {
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

    // Count total repairRequests in the given company
    const count = await RepairRequestModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
      include,
    });

    // Find all repairRequests for matching props and company
    const data = await RepairRequestModel.findAll({
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

export default new RepairRequestService();
