import { omit as _omit } from "lodash";

import StaffSupervisionLogModel from "./staffSupervisionLog.model";
import {
  CreateStaffSupervisionLogProps,
  UpdateStaffSupervisionLogProps,
  DeleteStaffSupervisionLogProps,
  GetStaffSupervisionLogByIdProps,
  GetStaffSupervisionLogsProps,
} from "./staffSupervisionLog.types";
import { CustomError } from "../../components/errors";
import StaffSupervisionLogErrorCode from "./staffSupervisionLog.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { StaffProfileModel } from "../staffProfile";
import { addCientFiltersByTeams, getFilters } from "../../components/filters";
import { staffSupervisionLogAttachmentService } from "./staffSupervisionLogAttachment";
import { AttachmentModel } from "../attachment";

class StaffSupervisionLogService {
  async createStaffSupervisionLog(props: CreateStaffSupervisionLogProps) {
    const staffSupervisionLog = await StaffSupervisionLogModel.create(props);

    // Create attachments
    if (props.attachments && props.attachments.length) {
      await staffSupervisionLogAttachmentService.createBulkStaffSupervisionLogAttachment(
        {
          relation: staffSupervisionLog.id,
          attachments: props.attachments,
        }
      );
    }

    return staffSupervisionLog;
  }

  async updateStaffSupervisionLog(props: UpdateStaffSupervisionLogProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find staffSupervisionLog by id and company
    const staffSupervisionLog = await StaffSupervisionLogModel.findOne({
      where: { id, company },
    });

    // if staffSupervisionLog not found, throw an error
    if (!staffSupervisionLog) {
      throw new CustomError(
        404,
        StaffSupervisionLogErrorCode.STAFF_SUPERVISION_LOG_NOT_FOUND
      );
    }

    // Finally, update the staffSupervisionLog
    const [, [updatedStaffSupervisionLog]] =
      await StaffSupervisionLogModel.update(updateProps, {
        where: { id, company },
        returning: true,
      });

    // Update attachments
    if (props.attachments) {
      await staffSupervisionLogAttachmentService.updateBulkStaffSupervisionLogAttachment(
        {
          relation: staffSupervisionLog.id,
          attachments: props.attachments,
        }
      );
    }
    return updatedStaffSupervisionLog;
  }

  async deleteArchiveStaffSupervisionLog(
    props: DeleteStaffSupervisionLogProps
  ) {
    // Props
    const { id, company } = props;

    // Find and delete the staffSupervisionLog by id and company
    const staffSupervisionLog = await StaffSupervisionLogModel.findOne({
      where: { id, company },
    });

    // if staffSupervisionLog has been deleted, throw an error
    if (!staffSupervisionLog) {
      throw new CustomError(
        404,
        StaffSupervisionLogErrorCode.STAFF_SUPERVISION_LOG_NOT_FOUND
      );
    }

    if (staffSupervisionLog.archived) {
      // Check if staffSupervisionLog already exists
      const existingStaffSupervisionLog =
        await StaffSupervisionLogModel.findAll({
          where: {
            date: staffSupervisionLog.date,
            staff: staffSupervisionLog.staff,
            type: staffSupervisionLog.type,
            nextDueOn: staffSupervisionLog.nextDueOn,
            company: staffSupervisionLog.company,
            archived: false,
          },
        });

      if (existingStaffSupervisionLog.length > 0) {
        throw new CustomError(
          409,
          StaffSupervisionLogErrorCode.STAFF_SUPERVISION_LOG_ALREADY_EXISTS
        );
      }
    }

    // Finally, update the staffSupervisionLog update the Archive state
    const [, [updatedStaffSupervisionLog]] =
      await StaffSupervisionLogModel.update(
        { archived: !staffSupervisionLog.archived },
        {
          where: { id, company },
          returning: true,
        }
      );

    return updatedStaffSupervisionLog;
  }

  async deleteStaffSupervisionLog(props: DeleteStaffSupervisionLogProps) {
    // Props
    const { id, company } = props;

    // Find and delete the staffSupervisionLog by id and company
    const staffSupervisionLog = await StaffSupervisionLogModel.destroy({
      where: { id, company },
    });

    // if staffSupervisionLog has been deleted, throw an error
    if (!staffSupervisionLog) {
      throw new CustomError(
        404,
        StaffSupervisionLogErrorCode.STAFF_SUPERVISION_LOG_NOT_FOUND
      );
    }

    return staffSupervisionLog;
  }

  async getStaffSupervisionLogById(props: GetStaffSupervisionLogByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the staffSupervisionLog by id and company
    const staffSupervisionLog = await StaffSupervisionLogModel.findOne({
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
          model: AttachmentModel,
          through: {
            attributes: [],
          },
        },
      ],
    });

    // If no staffSupervisionLog has been found, then throw an error
    if (!staffSupervisionLog) {
      throw new CustomError(
        404,
        StaffSupervisionLogErrorCode.STAFF_SUPERVISION_LOG_NOT_FOUND
      );
    }

    return staffSupervisionLog;
  }

  async getStaffSupervisionLogs(
    props: GetStaffSupervisionLogsProps,
    userId: string
  ) {
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
    ];
    // Count total staffSupervisionLogs in the given company
    const count = await StaffSupervisionLogModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
      include,
    });

    // Find all staffSupervisionLogs for matching props and company
    const data = await StaffSupervisionLogModel.findAll({
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

export default new StaffSupervisionLogService();
