import { omit as _omit } from "lodash";

import BowelLogModel from "./bowelLog.model";
import {
  CreateBowelLogProps,
  UpdateBowelLogProps,
  DeleteBowelLogProps,
  GetBowelLogByIdProps,
  GetBowelLogsProps,
} from "./bowelLog.types";
import { CustomError } from "../../components/errors";
import BowelLogErrorCode from "./bowelLog.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { StaffProfileModel } from "../staffProfile";
import { ClientProfileModel } from "../clientProfile";
import { getFilters } from "../../components/filters";

class BowelLogService {
  async createBowelLog(props: CreateBowelLogProps) {
    const bowelLog = await BowelLogModel.create(props);
    return bowelLog;
  }

  async updateBowelLog(props: UpdateBowelLogProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find bowelLog by id and company
    const bowelLog = await BowelLogModel.findOne({
      where: { id, company },
    });

    // if bowelLog not found, throw an error
    if (!bowelLog) {
      throw new CustomError(404, BowelLogErrorCode.BOWEL_LOG_NOT_FOUND);
    }

    // Finally, update the bowelLog
    const [, [updatedBowelLog]] = await BowelLogModel.update(updateProps, {
      where: { id, company },
      returning: true,
    });
    return updatedBowelLog;
  }

  async deleteBowelLog(props: DeleteBowelLogProps) {
    // Props
    const { id, company } = props;

    // Find and delete the bowelLog by id and company
    const bowelLog = await BowelLogModel.destroy({
      where: { id, company },
    });

    // if bowelLog has been deleted, throw an error
    if (!bowelLog) {
      throw new CustomError(404, BowelLogErrorCode.BOWEL_LOG_NOT_FOUND);
    }

    return bowelLog;
  }

  async getBowelLogById(props: GetBowelLogByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the bowelLog by id and company
    const bowelLog = await BowelLogModel.findOne({
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

    // If no bowelLog has been found, then throw an error
    if (!bowelLog) {
      throw new CustomError(404, BowelLogErrorCode.BOWEL_LOG_NOT_FOUND);
    }

    return bowelLog;
  }

  async getBowelLogs(props: GetBowelLogsProps) {
    // Props
    const { page, pageSize, sort, where, company } = props;

    const { offset, limit } = getPagingParams(page, pageSize);
    const order = getSortingParams(sort);
    const filters = getFilters(where);

    // Count total bowelLogs in the given company
    const count = await BowelLogModel.count({
      where: {
        company,
        ...filters,
      },
    });

    // Find all bowelLogs for matching props and company
    const data = await BowelLogModel.findAll({
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

export default new BowelLogService();
