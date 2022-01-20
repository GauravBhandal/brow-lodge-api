import { omit as _omit } from "lodash";

import WhoLogModel from "./whoLog.model";
import {
  CreateWhoLogProps,
  UpdateWhoLogProps,
  DeleteWhoLogProps,
  GetWhoLogByIdProps,
  GetWhoLogsProps,
} from "./whoLog.types";
import { CustomError } from "../../components/errors";
import WhoLogErrorCode from "./whoLog.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { StaffProfileModel } from "../staffProfile";

import { getFilters } from "../../components/filters";

class WhoLogService {
  async createWhoLog(props: CreateWhoLogProps) {
    const whoLog = await WhoLogModel.create(props);
    return whoLog;
  }

  async updateWhoLog(props: UpdateWhoLogProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find whoLog by id and company
    const whoLog = await WhoLogModel.findOne({
      where: { id, company },
    });

    // if whoLog not found, throw an error
    if (!whoLog) {
      throw new CustomError(404, WhoLogErrorCode.WHO_LOG_NOT_FOUND);
    }

    // Finally, update the whoLog
    const [, [updatedWhoLog]] = await WhoLogModel.update(updateProps, {
      where: { id, company },
      returning: true,
    });
    return updatedWhoLog;
  }

  async deleteWhoLog(props: DeleteWhoLogProps) {
    // Props
    const { id, company } = props;

    // Find and delete the whoLog by id and company
    const whoLog = await WhoLogModel.destroy({
      where: { id, company },
    });

    // if whoLog has been deleted, throw an error
    if (!whoLog) {
      throw new CustomError(404, WhoLogErrorCode.WHO_LOG_NOT_FOUND);
    }

    return whoLog;
  }

  async getWhoLogById(props: GetWhoLogByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the whoLog by id and company
    const whoLog = await WhoLogModel.findOne({
      where: { id, company },
      include: [
        {
          model: CompanyModel,
        },
        {
          model: StaffProfileModel,
          as: "Staff",
        },
      ],
    });

    // If no whoLog has been found, then throw an error
    if (!whoLog) {
      throw new CustomError(404, WhoLogErrorCode.WHO_LOG_NOT_FOUND);
    }

    return whoLog;
  }

  async getWhoLogs(props: GetWhoLogsProps) {
    // Props
    const { page, pageSize, sort, where, company } = props;

    const { offset, limit } = getPagingParams(page, pageSize);
    const order = getSortingParams(sort);
    const filters = getFilters(where);

    // Count total whoLogs in the given company
    const count = await WhoLogModel.count({
      where: {
        company,
        ...filters,
      },
    });

    // Find all whoLogs for matching props and company
    const data = await WhoLogModel.findAll({
      offset,
      limit,
      order,
      where: {
        company,
        ...filters,
      },
      include: [
        {
          model: CompanyModel,
        },
        {
          model: StaffProfileModel,
          as: "Staff",
        },
      ],
    });

    // TODO: Clean up getPagingData function
    const response = getPagingData({ count, rows: data }, page, limit);

    return response;
  }
}

export default new WhoLogService();
