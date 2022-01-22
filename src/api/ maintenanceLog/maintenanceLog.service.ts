import { omit as _omit } from "lodash";

import  MaintenanceLogModel from "./ maintenanceLog.model";
import {
  Create MaintenanceLogProps,
  Update MaintenanceLogProps,
  Delete MaintenanceLogProps,
  Get MaintenanceLogByIdProps,
  Get MaintenanceLogsProps,
} from "./ maintenanceLog.types";
import { CustomError } from "../../components/errors";
import  MaintenanceLogErrorCode from "./ maintenanceLog.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { StaffProfileModel } from "../staffProfile";

import { getFilters } from "../../components/filters";

class  MaintenanceLogService {
  async create MaintenanceLog(props: Create MaintenanceLogProps) {
    const maintenanceLog = await  MaintenanceLogModel.create(props);
    return maintenanceLog;
  }

  async update MaintenanceLog(props: Update MaintenanceLogProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find  maintenanceLog by id and company
    const maintenanceLog = await  MaintenanceLogModel.findOne({
      where: { id, company },
    });

    // if  maintenanceLog not found, throw an error
    if (!maintenanceLog) {
      throw new CustomError(404,  MaintenanceLogErrorCode. MAINTENANCE_LOG_NOT_FOUND);
    }

    // Finally, update the  maintenanceLog
    const [, [updated MaintenanceLog]] = await  MaintenanceLogModel.update(updateProps, {
      where: { id, company },
      returning: true,
    });
    return updated MaintenanceLog;
  }

  async delete MaintenanceLog(props: Delete MaintenanceLogProps) {
    // Props
    const { id, company } = props;

    // Find and delete the  maintenanceLog by id and company
    const maintenanceLog = await  MaintenanceLogModel.destroy({
      where: { id, company },
    });

    // if  maintenanceLog has been deleted, throw an error
    if (!maintenanceLog) {
      throw new CustomError(404,  MaintenanceLogErrorCode. MAINTENANCE_LOG_NOT_FOUND);
    }

    return maintenanceLog;
  }

  async get MaintenanceLogById(props: Get MaintenanceLogByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the  maintenanceLog by id and company
    const maintenanceLog = await  MaintenanceLogModel.findOne({
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

    // If no  maintenanceLog has been found, then throw an error
    if (!maintenanceLog) {
      throw new CustomError(404,  MaintenanceLogErrorCode. MAINTENANCE_LOG_NOT_FOUND);
    }

    return maintenanceLog;
  }

  async get MaintenanceLogs(props: Get MaintenanceLogsProps) {
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
    ];

    // Count total  maintenanceLogs in the given company
    const count = await  MaintenanceLogModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      include,
    });

    // Find all  maintenanceLogs for matching props and company
    const data = await  MaintenanceLogModel.findAll({
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

export default new  MaintenanceLogService();
