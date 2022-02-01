import { omit as _omit } from "lodash";

import TemperatureLogModel from "./temperatureLog.model";
import {
  CreateTemperatureLogProps,
  UpdateTemperatureLogProps,
  DeleteTemperatureLogProps,
  GetTemperatureLogByIdProps,
  GetTemperatureLogsProps,
} from "./temperatureLog.types";
import { CustomError } from "../../components/errors";
import TemperatureLogErrorCode from "./temperatureLog.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { StaffProfileModel } from "../staffProfile";
import { ClientProfileModel } from "../clientProfile";
import { getFilters } from "../../components/filters";

class TemperatureLogService {
  async createTemperatureLog(props: CreateTemperatureLogProps) {
    const temperatureLog = await TemperatureLogModel.create(props);
    return temperatureLog;
  }

  async updateTemperatureLog(props: UpdateTemperatureLogProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find temperatureLog by id and company
    const temperatureLog = await TemperatureLogModel.findOne({
      where: { id, company },
    });

    // if temperatureLog not found, throw an error
    if (!temperatureLog) {
      throw new CustomError(
        404,
        TemperatureLogErrorCode.TEMPERATURE_LOG_NOT_FOUND
      );
    }

    // Finally, update the temperatureLog
    const [, [updatedTemperatureLog]] = await TemperatureLogModel.update(
      updateProps,
      {
        where: { id, company },
        returning: true,
      }
    );
    return updatedTemperatureLog;
  }

  async deleteTemperatureLog(props: DeleteTemperatureLogProps) {
    // Props
    const { id, company } = props;

    // Find and delete the temperatureLog by id and company
    const temperatureLog = await TemperatureLogModel.destroy({
      where: { id, company },
    });

    // if temperatureLog has been deleted, throw an error
    if (!temperatureLog) {
      throw new CustomError(
        404,
        TemperatureLogErrorCode.TEMPERATURE_LOG_NOT_FOUND
      );
    }

    return temperatureLog;
  }

  async getTemperatureLogById(props: GetTemperatureLogByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the temperatureLog by id and company
    const temperatureLog = await TemperatureLogModel.findOne({
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

    // If no temperatureLog has been found, then throw an error
    if (!temperatureLog) {
      throw new CustomError(
        404,
        TemperatureLogErrorCode.TEMPERATURE_LOG_NOT_FOUND
      );
    }

    return temperatureLog;
  }

  async getTemperatureLogs(props: GetTemperatureLogsProps) {
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

    // Count total temperatureLogs in the given company
    const count = await TemperatureLogModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
      include,
    });

    // Find all temperatureLogs for matching props and company
    const data = await TemperatureLogModel.findAll({
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

export default new TemperatureLogService();
