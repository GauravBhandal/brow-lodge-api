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

class LeaseAndUtilityLogService {
  async createLeaseAndUtilityLog(props: CreateLeaseAndUtilityLogProps) {
    const leaseAndUtilityLog = await LeaseAndUtilityLogModel.create(props);
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
      },
      {
        model: ClientProfileModel,
        as: "Client",
      },
    ];
    // Count total leaseAndUtilityLogs in the given company
    const count = await LeaseAndUtilityLogModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
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
      include,
    });

    // TODO: Clean up getPagingData function
    const response = getPagingData({ count, rows: data }, page, limit);

    return response;
  }
}

export default new LeaseAndUtilityLogService();
