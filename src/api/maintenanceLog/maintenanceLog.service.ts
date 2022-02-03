import { omit as _omit } from "lodash";

import MaintenanceLogModel from "./maintenanceLog.model";
import {
  CreateMaintenanceLogProps,
  UpdateMaintenanceLogProps,
  DeleteMaintenanceLogProps,
  GetMaintenanceLogByIdProps,
  GetMaintenanceLogsProps,
} from "./maintenanceLog.types";
import { CustomError } from "../../components/errors";
import MaintenanceLogErrorCode from "./maintenanceLog.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { StaffProfileModel } from "../staffProfile";
import { getFilters } from "../../components/filters";
import { maintenanceLogAttachmentService } from "./maintenanceLogAttachment";
import { AttachmentModel } from "../attachment";

class MaintenanceLogService {
  async createMaintenanceLog(props: CreateMaintenanceLogProps) {
    const maintenanceLog = await MaintenanceLogModel.create(props);

    // Create attachments

    if (props.attachments && props.attachments.length) {
      await maintenanceLogAttachmentService.createBulkMaintenanceLogAttachment({
        relation: maintenanceLog.id,

        attachments: props.attachments,
      });
    }
    return maintenanceLog;
  }

  async updateMaintenanceLog(props: UpdateMaintenanceLogProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find maintenanceLog by id and company
    const maintenanceLog = await MaintenanceLogModel.findOne({
      where: { id, company },
    });

    // if maintenanceLog not found, throw an error
    if (!maintenanceLog) {
      throw new CustomError(
        404,
        MaintenanceLogErrorCode.MAINTENANCE_LOG_NOT_FOUND
      );
    }

    // Finally, update the maintenanceLog
    const [, [updatedMaintenanceLog]] = await MaintenanceLogModel.update(
      updateProps,
      {
        where: { id, company },
        returning: true,
      }
    );

    // Update attachments

    if (props.attachments) {
      await maintenanceLogAttachmentService.updateBulkMaintenanceLogAttachment({
        relation: maintenanceLog.id,

        attachments: props.attachments,
      });
    }
    return updatedMaintenanceLog;
  }

  async deleteMaintenanceLog(props: DeleteMaintenanceLogProps) {
    // Props
    const { id, company } = props;

    // Find and delete the maintenanceLog by id and company
    const maintenanceLog = await MaintenanceLogModel.destroy({
      where: { id, company },
    });

    // if maintenanceLog has been deleted, throw an error
    if (!maintenanceLog) {
      throw new CustomError(
        404,
        MaintenanceLogErrorCode.MAINTENANCE_LOG_NOT_FOUND
      );
    }

    return maintenanceLog;
  }

  async getMaintenanceLogById(props: GetMaintenanceLogByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the maintenanceLog by id and company
    const maintenanceLog = await MaintenanceLogModel.findOne({
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

    // If no maintenanceLog has been found, then throw an error
    if (!maintenanceLog) {
      throw new CustomError(
        404,
        MaintenanceLogErrorCode.MAINTENANCE_LOG_NOT_FOUND
      );
    }

    return maintenanceLog;
  }

  async getMaintenanceLogs(props: GetMaintenanceLogsProps) {
    // Props
    const { page, pageSize, sort, where, company } = props;

    const { offset, limit } = getPagingParams(page, pageSize);
    const order = getSortingParams(sort);
    const filters = getFilters(where);
    const include = [
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
        where: {
          ...filters["Staff"],
        },
      },
    ];

    // Count total maintenanceLogs in the given company
    const count = await MaintenanceLogModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
      include,
    });

    // Find all maintenanceLogs for matching props and company
    const data = await MaintenanceLogModel.findAll({
      offset,
      limit,
      order,
      where: {
        company,
        ...filters["primaryFilters"],
      },
      subQuery: false, // TODO: I have no idea why we need this, but removing it will break sort by staff
      include,
    });

    // TODO: Clean up getPagingData function
    const response = getPagingData({ count, rows: data }, page, limit);

    return response;
  }
}

export default new MaintenanceLogService();
