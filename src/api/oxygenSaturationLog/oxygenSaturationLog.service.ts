import { omit as _omit } from "lodash";

import OxygenSaturationLogModel from "./oxygenSaturationLog.model";
import {
  CreateOxygenSaturationLogProps,
  UpdateOxygenSaturationLogProps,
  DeleteOxygenSaturationLogProps,
  GetOxygenSaturationLogByIdProps,
  GetOxygenSaturationLogsProps,
} from "./oxygenSaturationLog.types";
import { CustomError } from "../../components/errors";
import OxygenSaturationLogErrorCode from "./oxygenSaturationLog.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { StaffProfileModel } from "../staffProfile";
import { ClientProfileModel } from "../clientProfile";
import { getFilters } from "../../components/filters";

class OxygenSaturationLogService {
  async createOxygenSaturationLog(props: CreateOxygenSaturationLogProps) {
    const oxygenSaturationLog = await OxygenSaturationLogModel.create(props);
    return oxygenSaturationLog;
  }

  async updateOxygenSaturationLog(props: UpdateOxygenSaturationLogProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find oxygenSaturationLog by id and company
    const oxygenSaturationLog = await OxygenSaturationLogModel.findOne({
      where: { id, company },
    });

    // if oxygenSaturationLog not found, throw an error
    if (!oxygenSaturationLog) {
      throw new CustomError(
        404,
        OxygenSaturationLogErrorCode.OXYGEN_SATURATION_LOG_NOT_FOUND
      );
    }

    // Finally, update the oxygenSaturationLog
    const [, [updatedOxygenSaturationLog]] =
      await OxygenSaturationLogModel.update(updateProps, {
        where: { id, company },
        returning: true,
      });
    return updatedOxygenSaturationLog;
  }

  async deleteOxygenSaturationLog(props: DeleteOxygenSaturationLogProps) {
    // Props
    const { id, company } = props;

    // Find and delete the oxygenSaturationLog by id and company
    const oxygenSaturationLog = await OxygenSaturationLogModel.destroy({
      where: { id, company },
    });

    // if oxygenSaturationLog has been deleted, throw an error
    if (!oxygenSaturationLog) {
      throw new CustomError(
        404,
        OxygenSaturationLogErrorCode.OXYGEN_SATURATION_LOG_NOT_FOUND
      );
    }

    return oxygenSaturationLog;
  }

  async getOxygenSaturationLogById(props: GetOxygenSaturationLogByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the oxygenSaturationLog by id and company
    const oxygenSaturationLog = await OxygenSaturationLogModel.findOne({
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

    // If no oxygenSaturationLog has been found, then throw an error
    if (!oxygenSaturationLog) {
      throw new CustomError(
        404,
        OxygenSaturationLogErrorCode.OXYGEN_SATURATION_LOG_NOT_FOUND
      );
    }

    return oxygenSaturationLog;
  }

  async getOxygenSaturationLogs(props: GetOxygenSaturationLogsProps) {
    // Props
    const { page, pageSize, sort, where, company } = props;

    const { offset, limit } = getPagingParams(page, pageSize);
    const order = getSortingParams(sort);
    const filters = getFilters(where);

    // Count total oxygenSaturationLogs in the given company
    const count = await OxygenSaturationLogModel.count({
      where: {
        company,
        ...filters,
      },
    });

    // Find all oxygenSaturationLogs for matching props and company
    const data = await OxygenSaturationLogModel.findAll({
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
        {
          model: ClientProfileModel,
          as: "Client",
        },
      ],
    });

    // TODO: Clean up getPagingData function
    const response = getPagingData({ count, rows: data }, page, limit);

    return response;
  }
}

export default new OxygenSaturationLogService();