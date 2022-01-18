import { omit as _omit } from "lodash";

import BloodGlucoseLogModel from "./bloodGlucoseLog.model";
import {
  CreateBloodGlucoseLogProps,
  UpdateBloodGlucoseLogProps,
  DeleteBloodGlucoseLogProps,
  GetBloodGlucoseLogByIdProps,
  GetBloodGlucoseLogsProps,
} from "./bloodGlucoseLog.types";
import { CustomError } from "../../components/errors";
import BloodGlucoseLogErrorCode from "./bloodGlucoseLog.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { StaffProfileModel } from "../staffProfile";
import { ClientProfileModel } from "../clientProfile";
import { getFilters } from "../../components/filters";

class BloodGlucoseLogService {
  async createBloodGlucoseLog(props: CreateBloodGlucoseLogProps) {
    const bloodGlucoseLog = await BloodGlucoseLogModel.create(props);
    return bloodGlucoseLog;
  }

  async updateBloodGlucoseLog(props: UpdateBloodGlucoseLogProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find bloodGlucoseLog by id and company
    const bloodGlucoseLog = await BloodGlucoseLogModel.findOne({
      where: { id, company },
    });

    // if bloodGlucoseLog not found, throw an error
    if (!bloodGlucoseLog) {
      throw new CustomError(
        404,
        BloodGlucoseLogErrorCode.BLOOD_GLUCOSE_LOG_NOT_FOUND
      );
    }

    // Finally, update the bloodGlucoseLog
    const [, [updatedBloodGlucoseLog]] = await BloodGlucoseLogModel.update(
      updateProps,
      {
        where: { id, company },
        returning: true,
      }
    );
    return updatedBloodGlucoseLog;
  }

  async deleteBloodGlucoseLog(props: DeleteBloodGlucoseLogProps) {
    // Props
    const { id, company } = props;

    // Find and delete the bloodGlucoseLog by id and company
    const bloodGlucoseLog = await BloodGlucoseLogModel.destroy({
      where: { id, company },
    });

    // if bloodGlucoseLog has been deleted, throw an error
    if (!bloodGlucoseLog) {
      throw new CustomError(
        404,
        BloodGlucoseLogErrorCode.BLOOD_GLUCOSE_LOG_NOT_FOUND
      );
    }

    return bloodGlucoseLog;
  }

  async getBloodGlucoseLogById(props: GetBloodGlucoseLogByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the bloodGlucoseLog by id and company
    const bloodGlucoseLog = await BloodGlucoseLogModel.findOne({
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

    // If no bloodGlucoseLog has been found, then throw an error
    if (!bloodGlucoseLog) {
      throw new CustomError(
        404,
        BloodGlucoseLogErrorCode.BLOOD_GLUCOSE_LOG_NOT_FOUND
      );
    }

    return bloodGlucoseLog;
  }

  async getBloodGlucoseLogs(props: GetBloodGlucoseLogsProps) {
    // Props
    const { page, pageSize, sort, where, company } = props;

    const { offset, limit } = getPagingParams(page, pageSize);
    const order = getSortingParams(sort);
    const filters = getFilters(where);

    // Count total bloodGlucoseLogs in the given company
    const count = await BloodGlucoseLogModel.count({
      where: {
        company,
        ...filters,
      },
    });

    // Find all bloodGlucoseLogs for matching props and company
    const data = await BloodGlucoseLogModel.findAll({
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

export default new BloodGlucoseLogService();
