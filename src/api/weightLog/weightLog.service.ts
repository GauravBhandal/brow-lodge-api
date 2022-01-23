import { omit as _omit } from "lodash";

import WeightLogModel from "./weightLog.model";
import {
  CreateWeightLogProps,
  UpdateWeightLogProps,
  DeleteWeightLogProps,
  GetWeightLogByIdProps,
  GetWeightLogsProps,
} from "./weightLog.types";
import { CustomError } from "../../components/errors";
import WeightLogErrorCode from "./weightLog.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { StaffProfileModel } from "../staffProfile";
import { ClientProfileModel } from "../clientProfile";
import { getFilters } from "../../components/filters";

class WeightLogService {
  async createWeightLog(props: CreateWeightLogProps) {
    const weightLog = await WeightLogModel.create(props);
    return weightLog;
  }

  async updateWeightLog(props: UpdateWeightLogProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find weightLog by id and company
    const weightLog = await WeightLogModel.findOne({
      where: { id, company },
    });

    // if weightLog not found, throw an error
    if (!weightLog) {
      throw new CustomError(404, WeightLogErrorCode.WEIGHT_LOG_NOT_FOUND);
    }

    // Finally, update the weightLog
    const [, [updatedWeightLog]] = await WeightLogModel.update(updateProps, {
      where: { id, company },
      returning: true,
    });
    return updatedWeightLog;
  }

  async deleteWeightLog(props: DeleteWeightLogProps) {
    // Props
    const { id, company } = props;

    // Find and delete the weightLog by id and company
    const weightLog = await WeightLogModel.destroy({
      where: { id, company },
    });

    // if weightLog has been deleted, throw an error
    if (!weightLog) {
      throw new CustomError(404, WeightLogErrorCode.WEIGHT_LOG_NOT_FOUND);
    }

    return weightLog;
  }

  async getWeightLogById(props: GetWeightLogByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the weightLog by id and company
    const weightLog = await WeightLogModel.findOne({
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

    // If no weightLog has been found, then throw an error
    if (!weightLog) {
      throw new CustomError(404, WeightLogErrorCode.WEIGHT_LOG_NOT_FOUND);
    }

    return weightLog;
  }

  async getWeightLogs(props: GetWeightLogsProps) {
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
        where: {
          ...filters["Client"],
        },
      },
    ];

    // Count total weightLogs in the given company
    const count = await WeightLogModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      include,
    });

    // Find all weightLogs for matching props and company
    const data = await WeightLogModel.findAll({
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

export default new WeightLogService();
