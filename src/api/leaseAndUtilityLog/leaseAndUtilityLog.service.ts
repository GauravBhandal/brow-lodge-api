import { omit as _omit } from "lodash";

import LeaseAndUtilityLogModel from "./leaseAndUtilityLog.model";
import {
  CreateLeaseAndUtilityLogProps,
  UpdateLeaseAndUtilityLogProps,
  DeleteLeaseAndUtilityLogProps,
  GetLeaseAndUtilityLogByIdProps,
  GetLeaseAndUtilityLogsProps,
} from "./leaseAndUtilityLog.types";
import { CustomError } from "../../components/errors";
import LeaseAndUtilityLogErrorCode from "./leaseAndUtilityLog.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { ClientProfileModel } from "../clientProfile";
import { StaffProfileModel } from "../staffProfile";
import { getFilters } from "../../components/filters";
import { leaseAndUtilityLogAttachmentService } from "./leaseAndUtilityLogAttachment";
import { AttachmentModel } from "../attachment";

class LeaseAndUtilityLogService {
  async createLeaseAndUtilityLog(props: CreateLeaseAndUtilityLogProps) {
    const leaseAndUtilityLog = await LeaseAndUtilityLogModel.create(props);

    // Create attachments
    if (props.attachments && props.attachments.length) {
      await leaseAndUtilityLogAttachmentService.createBulkLeaseAndUtilityLogAttachment(
        {
          relation: leaseAndUtilityLog.id,
          attachments: props.attachments,
        }
      );
    }

    return leaseAndUtilityLog;
  }

  async updateLeaseAndUtilityLog(props: UpdateLeaseAndUtilityLogProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find leaseAndUtilityLog by id and company
    const leaseAndUtilityLog = await LeaseAndUtilityLogModel.findOne({
      where: { id, company },
    });

    // if leaseAndUtilityLog not found, throw an error
    if (!leaseAndUtilityLog) {
      throw new CustomError(
        404,
        LeaseAndUtilityLogErrorCode.LEASE_AND_UTILITY_LOG_NOT_FOUND
      );
    }

    // Finally, update the leaseAndUtilityLog
    const [, [updatedLeaseAndUtilityLog]] =
      await LeaseAndUtilityLogModel.update(updateProps, {
        where: { id, company },
        returning: true,
      });

    // Update attachments
    if (props.attachments && props.attachments.length) {
      await leaseAndUtilityLogAttachmentService.updateBulkLeaseAndUtilityLogAttachment(
        {
          relation: leaseAndUtilityLog.id,
          attachments: props.attachments,
        }
      );
    }
    return updatedLeaseAndUtilityLog;
  }

  async deleteLeaseAndUtilityLog(props: DeleteLeaseAndUtilityLogProps) {
    // Props
    const { id, company } = props;

    // Find and delete the leaseAndUtilityLog by id and company
    const leaseAndUtilityLog = await LeaseAndUtilityLogModel.destroy({
      where: { id, company },
    });

    // if leaseAndUtilityLog has been deleted, throw an error
    if (!leaseAndUtilityLog) {
      throw new CustomError(
        404,
        LeaseAndUtilityLogErrorCode.LEASE_AND_UTILITY_LOG_NOT_FOUND
      );
    }

    return leaseAndUtilityLog;
  }

  async getLeaseAndUtilityLogById(props: GetLeaseAndUtilityLogByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the leaseAndUtilityLog by id and company
    const leaseAndUtilityLog = await LeaseAndUtilityLogModel.findOne({
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
          required: false,
        },
        {
          model: AttachmentModel,
          through: {
            attributes: [],
          },
        },
      ],
    });

    // If no leaseAndUtilityLog has been found, then throw an error
    if (!leaseAndUtilityLog) {
      throw new CustomError(
        404,
        LeaseAndUtilityLogErrorCode.LEASE_AND_UTILITY_LOG_NOT_FOUND
      );
    }

    return leaseAndUtilityLog;
  }

  async getLeaseAndUtilityLogs(props: GetLeaseAndUtilityLogsProps) {
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
        required: false,
      },
      {
        model: AttachmentModel,
        through: {
          attributes: [],
        },
      },
    ];
    // Count total leaseAndUtilityLogs in the given company
    const count = await LeaseAndUtilityLogModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
      include,
    });

    // Find all leaseAndUtilityLogs for matching props and company
    const data = await LeaseAndUtilityLogModel.findAll({
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

export default new LeaseAndUtilityLogService();
