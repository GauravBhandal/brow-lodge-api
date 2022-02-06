import { omit as _omit } from "lodash";

import WhsLogModel from "./whsLog.model";
import {
  CreateWhsLogProps,
  UpdateWhsLogProps,
  DeleteWhsLogProps,
  GetWhsLogByIdProps,
  GetWhsLogsProps,
} from "./whsLog.types";
import { CustomError } from "../../components/errors";
import WhsLogErrorCode from "./whsLog.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { StaffProfileModel } from "../staffProfile";
import { getFilters } from "../../components/filters";
import { whsLogAttachmentService } from "./whsLogAttachment";
import { AttachmentModel } from "../attachment";

class WhsLogService {
  async createWhsLog(props: CreateWhsLogProps) {
    const whsLog = await WhsLogModel.create(props);

    // Create attachments
    if (props.attachments && props.attachments.length) {
      await whsLogAttachmentService.createBulkWhsLogAttachment({
        relation: whsLog.id,
        attachments: props.attachments,
      });
    }
    return whsLog;
  }

  async updateWhsLog(props: UpdateWhsLogProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find whsLog by id and company
    const whsLog = await WhsLogModel.findOne({
      where: { id, company },
    });

    // if whsLog not found, throw an error
    if (!whsLog) {
      throw new CustomError(404, WhsLogErrorCode.WHS_LOG_NOT_FOUND);
    }

    // Finally, update the whsLog
    const [, [updatedWhsLog]] = await WhsLogModel.update(updateProps, {
      where: { id, company },
      returning: true,
    });

    // Update attachments
    if (props.attachments) {
      await whsLogAttachmentService.updateBulkWhsLogAttachment({
        relation: whsLog.id,
        attachments: props.attachments,
      });
    }

    return updatedWhsLog;
  }

  async deleteWhsLog(props: DeleteWhsLogProps) {
    // Props
    const { id, company } = props;

    // Find and delete the whsLog by id and company
    const whsLog = await WhsLogModel.destroy({
      where: { id, company },
    });

    // if whsLog has been deleted, throw an error
    if (!whsLog) {
      throw new CustomError(404, WhsLogErrorCode.WHS_LOG_NOT_FOUND);
    }

    return whsLog;
  }

  async getWhsLogById(props: GetWhsLogByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the whsLog by id and company
    const whsLog = await WhsLogModel.findOne({
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

    // If no whsLog has been found, then throw an error
    if (!whsLog) {
      throw new CustomError(404, WhsLogErrorCode.WHS_LOG_NOT_FOUND);
    }

    return whsLog;
  }

  async getWhsLogs(props: GetWhsLogsProps) {
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
      },
    ];

    // Count total whsLogs in the given company
    const count = await WhsLogModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
      include,
    });

    // Find all whsLogs for matching props and company
    const data = await WhsLogModel.findAll({
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

export default new WhsLogService();
