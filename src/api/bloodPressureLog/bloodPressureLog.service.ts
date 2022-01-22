import { omit as _omit } from "lodash";

import BloodPressureLogModel from "./bloodPressureLog.model";
import {
  CreateBloodPressureLogProps,
  UpdateBloodPressureLogProps,
  DeleteBloodPressureLogProps,
  GetBloodPressureLogByIdProps,
  GetBloodPressureLogsProps,
} from "./bloodPressureLog.types";
import { CustomError } from "../../components/errors";
import BloodPressureLogErrorCode from "./bloodPressureLog.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { StaffProfileModel } from "../staffProfile";
import { ClientProfileModel } from "../clientProfile";
import { getFilters } from "../../components/filters";

class BloodPressureLogService {
  async createBloodPressureLog(props: CreateBloodPressureLogProps) {
    const bloodPressureLog = await BloodPressureLogModel.create(props);
    return bloodPressureLog;
  }

  async updateBloodPressureLog(props: UpdateBloodPressureLogProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find bloodPressureLog by id and company
    const bloodPressureLog = await BloodPressureLogModel.findOne({
      where: { id, company },
    });

    // if bloodPressureLog not found, throw an error
    if (!bloodPressureLog) {
      throw new CustomError(
        404,
        BloodPressureLogErrorCode.BLOOD_PRESSURE_LOG_NOT_FOUND
      );
    }

    // Finally, update the bloodPressureLog
    const [, [updatedBloodPressureLog]] = await BloodPressureLogModel.update(
      updateProps,
      {
        where: { id, company },
        returning: true,
      }
    );
    return updatedBloodPressureLog;
  }

  async deleteBloodPressureLog(props: DeleteBloodPressureLogProps) {
    // Props
    const { id, company } = props;

    // Find and delete the bloodPressureLog by id and company
    const bloodPressureLog = await BloodPressureLogModel.destroy({
      where: { id, company },
    });

    // if bloodPressureLog has been deleted, throw an error
    if (!bloodPressureLog) {
      throw new CustomError(
        404,
        BloodPressureLogErrorCode.BLOOD_PRESSURE_LOG_NOT_FOUND
      );
    }

    return bloodPressureLog;
  }

  async getBloodPressureLogById(props: GetBloodPressureLogByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the bloodPressureLog by id and company
    const bloodPressureLog = await BloodPressureLogModel.findOne({
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

    // If no bloodPressureLog has been found, then throw an error
    if (!bloodPressureLog) {
      throw new CustomError(
        404,
        BloodPressureLogErrorCode.BLOOD_PRESSURE_LOG_NOT_FOUND
      );
    }

    return bloodPressureLog;
  }

  async getBloodPressureLogs(props: GetBloodPressureLogsProps) {
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

    // Count total bloodPressureLogs in the given company
    const count = await BloodPressureLogModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      include,
    });

    // Find all bloodPressureLogs for matching props and company
    const data = await BloodPressureLogModel.findAll({
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

export default new BloodPressureLogService();
