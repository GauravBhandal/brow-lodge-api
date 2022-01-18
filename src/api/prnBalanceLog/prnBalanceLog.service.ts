import { omit as _omit } from "lodash";

import PrnBalanceLogModel from "./prnBalanceLog.model";
import {
  CreatePrnBalanceLogProps,
  UpdatePrnBalanceLogProps,
  DeletePrnBalanceLogProps,
  GetPrnBalanceLogByIdProps,
  GetPrnBalanceLogsProps,
} from "./prnBalanceLog.types";
import { CustomError } from "../../components/errors";
import PrnBalanceLogErrorCode from "./prnBalanceLog.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { StaffProfileModel } from "../staffProfile";
import { ClientProfileModel } from "../clientProfile";
import { getFilters } from "../../components/filters";

class PrnBalanceLogService {
  async createPrnBalanceLog(props: CreatePrnBalanceLogProps) {
    const prnBalanceLog = await PrnBalanceLogModel.create(props);
    return prnBalanceLog;
  }

  async updatePrnBalanceLog(props: UpdatePrnBalanceLogProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find prnBalanceLog by id and company
    const prnBalanceLog = await PrnBalanceLogModel.findOne({
      where: { id, company },
    });

    // if prnBalanceLog not found, throw an error
    if (!prnBalanceLog) {
      throw new CustomError(
        404,
        PrnBalanceLogErrorCode.PRN_BALANCE_LOG_NOT_FOUND
      );
    }

    // Finally, update the prnBalanceLog
    const [, [updatedPrnBalanceLog]] = await PrnBalanceLogModel.update(
      updateProps,
      {
        where: { id, company },
        returning: true,
      }
    );
    return updatedPrnBalanceLog;
  }

  async deletePrnBalanceLog(props: DeletePrnBalanceLogProps) {
    // Props
    const { id, company } = props;

    // Find and delete the prnBalanceLog by id and company
    const prnBalanceLog = await PrnBalanceLogModel.destroy({
      where: { id, company },
    });

    // if prnBalanceLog has been deleted, throw an error
    if (!prnBalanceLog) {
      throw new CustomError(
        404,
        PrnBalanceLogErrorCode.PRN_BALANCE_LOG_NOT_FOUND
      );
    }

    return prnBalanceLog;
  }

  async getPrnBalanceLogById(props: GetPrnBalanceLogByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the prnBalanceLog by id and company
    const prnBalanceLog = await PrnBalanceLogModel.findOne({
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

    // If no prnBalanceLog has been found, then throw an error
    if (!prnBalanceLog) {
      throw new CustomError(
        404,
        PrnBalanceLogErrorCode.PRN_BALANCE_LOG_NOT_FOUND
      );
    }

    return prnBalanceLog;
  }

  async getPrnBalanceLogs(props: GetPrnBalanceLogsProps) {
    // Props
    const { page, pageSize, sort, where, company } = props;

    const { offset, limit } = getPagingParams(page, pageSize);
    const order = getSortingParams(sort);
    const filters = getFilters(where);

    // Count total prnBalanceLogs in the given company
    const count = await PrnBalanceLogModel.count({
      where: {
        company,
        ...filters,
      },
    });

    // Find all prnBalanceLogs for matching props and company
    const data = await PrnBalanceLogModel.findAll({
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

export default new PrnBalanceLogService();
