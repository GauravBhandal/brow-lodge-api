import { omit as _omit } from "lodash";

import SleepLogModel from "./sleepLog.model";
import {
  CreateSleepLogProps,
  UpdateSleepLogProps,
  DeleteSleepLogProps,
  GetSleepLogByIdProps,
  GetSleepLogsProps,
} from "./sleepLog.types";
import { CustomError } from "../../components/errors";
import SleepLogErrorCode from "./sleepLog.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { StaffProfileModel } from "../staffProfile";
import { ClientProfileModel } from "../clientProfile";
import { getFilters } from "../../components/filters";

class SleepLogService {
  async createSleepLog(props: CreateSleepLogProps) {
    const sleepLog = await SleepLogModel.create(props);
    return sleepLog;
  }

  async updateSleepLog(props: UpdateSleepLogProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find sleepLog by id and company
    const sleepLog = await SleepLogModel.findOne({
      where: { id, company },
    });

    // if sleepLog not found, throw an error
    if (!sleepLog) {
      throw new CustomError(404, SleepLogErrorCode.SLEEP_LOG_NOT_FOUND);
    }

    // Finally, update the sleepLog
    const [, [updatedSleepLog]] = await SleepLogModel.update(updateProps, {
      where: { id, company },
      returning: true,
    });
    return updatedSleepLog;
  }

  async deleteSleepLog(props: DeleteSleepLogProps) {
    // Props
    const { id, company } = props;

    // Find and delete the sleepLog by id and company
    const sleepLog = await SleepLogModel.destroy({
      where: { id, company },
    });

    // if sleepLog has been deleted, throw an error
    if (!sleepLog) {
      throw new CustomError(404, SleepLogErrorCode.SLEEP_LOG_NOT_FOUND);
    }

    return sleepLog;
  }

  async getSleepLogById(props: GetSleepLogByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the sleepLog by id and company
    const sleepLog = await SleepLogModel.findOne({
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

    // If no sleepLog has been found, then throw an error
    if (!sleepLog) {
      throw new CustomError(404, SleepLogErrorCode.SLEEP_LOG_NOT_FOUND);
    }

    return sleepLog;
  }

  async getSleepLogs(props: GetSleepLogsProps) {
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

    // Count total sleepLogs in the given company
    const count = await SleepLogModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
    });

    // Find all sleepLogs for matching props and company
    const data = await SleepLogModel.findAll({
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

export default new SleepLogService();
