import { omit as _omit } from "lodash";

import PrnAdminLogModel from "./prnAdminLog.model";
import {
  CreatePrnAdminLogProps,
  UpdatePrnAdminLogProps,
  DeletePrnAdminLogProps,
  GetPrnAdminLogByIdProps,
  GetPrnAdminLogsProps,
} from "./prnAdminLog.types";
import { CustomError } from "../../components/errors";
import PrnAdminLogErrorCode from "./prnAdminLog.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { StaffProfileModel } from "../staffProfile";
import { ClientProfileModel } from "../clientProfile";
import { addCientFiltersByTeams, getFilters } from "../../components/filters";

class PrnAdminLogService {
  async createPrnAdminLog(props: CreatePrnAdminLogProps) {
    const prnAdminLog = await PrnAdminLogModel.create(props);
    return prnAdminLog;
  }

  async updatePrnAdminLog(props: UpdatePrnAdminLogProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find prnAdminLog by id and company
    const prnAdminLog = await PrnAdminLogModel.findOne({
      where: { id, company },
    });

    // if prnAdminLog not found, throw an error
    if (!prnAdminLog) {
      throw new CustomError(404, PrnAdminLogErrorCode.PRN_ADMIN_LOG_NOT_FOUND);
    }

    // Finally, update the prnAdminLog
    const [, [updatedPrnAdminLog]] = await PrnAdminLogModel.update(
      updateProps,
      {
        where: { id, company },
        returning: true,
      }
    );
    return updatedPrnAdminLog;
  }

  async deletePrnAdminLog(props: DeletePrnAdminLogProps) {
    // Props
    const { id, company } = props;

    // Find and delete the prnAdminLog by id and company
    const prnAdminLog = await PrnAdminLogModel.destroy({
      where: { id, company },
    });

    // if prnAdminLog has been deleted, throw an error
    if (!prnAdminLog) {
      throw new CustomError(404, PrnAdminLogErrorCode.PRN_ADMIN_LOG_NOT_FOUND);
    }

    return prnAdminLog;
  }

  async getPrnAdminLogById(props: GetPrnAdminLogByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the prnAdminLog by id and company
    const prnAdminLog = await PrnAdminLogModel.findOne({
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

    // If no prnAdminLog has been found, then throw an error
    if (!prnAdminLog) {
      throw new CustomError(404, PrnAdminLogErrorCode.PRN_ADMIN_LOG_NOT_FOUND);
    }

    return prnAdminLog;
  }

  async getPrnAdminLogs(props: GetPrnAdminLogsProps, userId: string) {
    // Props
    const { page, pageSize, sort, where, company } = props;

    const { offset, limit } = getPagingParams(page, pageSize);
    const order = getSortingParams(sort);
    const filters = getFilters(where);

    const clientFilters = await addCientFiltersByTeams(userId, company);

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
          ...clientFilters,
        },
      },
    ];

    // Count total prnAdminLogs in the given company
    const count = await PrnAdminLogModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
      include,
    });

    // Find all prnAdminLogs for matching props and company
    const data = await PrnAdminLogModel.findAll({
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

export default new PrnAdminLogService();
