import { omit as _omit } from "lodash";

import OnCallLogModel from "./onCallLog.model";
import {
  CreateOnCallLogProps,
  UpdateOnCallLogProps,
  DeleteOnCallLogProps,
  GetOnCallLogByIdProps,
  GetOnCallLogsProps,
} from "./onCallLog.types";
import { CustomError } from "../../components/errors";
import OnCallLogErrorCode from "./onCallLog.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { ClientProfileModel } from "../clientProfile";
import { StaffProfileModel } from "../staffProfile";
import { addCientFiltersByTeams, getFilters } from "../../components/filters";

class OnCallLogService {
  async createOnCallLog(props: CreateOnCallLogProps) {
    const onCallLog = await OnCallLogModel.create(props);

    return onCallLog;
  }

  async updateOnCallLog(props: UpdateOnCallLogProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find onCallLog by id and company
    const onCallLog = await OnCallLogModel.findOne({
      where: { id, company },
    });

    // if onCallLog not found, throw an error
    if (!onCallLog) {
      throw new CustomError(404, OnCallLogErrorCode.ON_CALL_LOG_NOT_FOUND);
    }

    // Finally, update the onCallLog
    const [, [updatedOnCallLog]] = await OnCallLogModel.update(updateProps, {
      where: { id, company },
      returning: true,
    });

    return updatedOnCallLog;
  }

  async deleteArchiveOnCallLog(props: DeleteOnCallLogProps) {
    // Props
    const { id, company } = props;

    // Find and delete the onCallLog by id and company
    const onCallLog = await OnCallLogModel.findOne({
      where: { id, company },
    });

    // if onCallLog has been deleted, throw an error
    if (!onCallLog) {
      throw new CustomError(404, OnCallLogErrorCode.ON_CALL_LOG_NOT_FOUND);
    }

    if (onCallLog.archived) {
      // Check if onCallLog already exists
      const existingOnCallLog = await OnCallLogModel.findAll({
        where: {
          date: onCallLog.date,
          time: onCallLog.time,
          staff: onCallLog.staff,
          duration: onCallLog.duration,
          communicationWith: onCallLog.communicationWith,
          description: onCallLog.description,
          company: onCallLog.company,
          archived: false,
        },
      });

      if (existingOnCallLog.length > 0) {
        throw new CustomError(
          409,
          OnCallLogErrorCode.ON_CALL_LOG_ALREADY_EXISTS
        );
      }
    }

    // Finally, update the onCallLog update the Archive state
    const [, [updatedOnCallLog]] = await OnCallLogModel.update(
      { archived: !onCallLog.archived },
      {
        where: { id, company },
        returning: true,
      }
    );

    return updatedOnCallLog;
  }

  async deleteOnCallLog(props: DeleteOnCallLogProps) {
    // Props
    const { id, company } = props;

    // Find and delete the onCallLog by id and company
    const onCallLog = await OnCallLogModel.destroy({
      where: { id, company },
    });

    // if onCallLog has been deleted, throw an error
    if (!onCallLog) {
      throw new CustomError(404, OnCallLogErrorCode.ON_CALL_LOG_NOT_FOUND);
    }

    return onCallLog;
  }

  async getOnCallLogById(props: GetOnCallLogByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the onCallLog by id and company
    const onCallLog = await OnCallLogModel.findOne({
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
      ],
    });

    // If no onCallLog has been found, then throw an error
    if (!onCallLog) {
      throw new CustomError(404, OnCallLogErrorCode.ON_CALL_LOG_NOT_FOUND);
    }

    return onCallLog;
  }

  async getOnCallLogs(props: GetOnCallLogsProps, userId: string) {
    // Props
    const { page, pageSize, sort, where, company } = props;

    const { offset, limit } = getPagingParams(page, pageSize);
    const order = getSortingParams(sort);
    const filters = getFilters(where);
    const clientFilters = await addCientFiltersByTeams(userId, company);

    // func to check for optional clients that to apply team permissions or not
    const checkClientPermissions = () => {
      if (Object.keys(clientFilters).length !== 0) {
        return { right: true };
      }
    };

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
          ...clientFilters,
        },
        required: false,
        ...checkClientPermissions(),
      },
    ];
    // Count total onCallLogs in the given company
    const count = await OnCallLogModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
      include,
    });

    // Find all onCallLogs for matching props and company
    const data = await OnCallLogModel.findAll({
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

export default new OnCallLogService();
