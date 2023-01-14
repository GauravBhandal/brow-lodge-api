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
import { addCientFiltersByTeams, getFilters } from "../../components/filters";

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

  async deleteArchiveBloodGlucoseLog(props: DeleteBloodGlucoseLogProps) {
    // Props
    const { id, company } = props;

    // Find and delete the bloodGlucoseLog by id and company
    const bloodGlucoseLog = await BloodGlucoseLogModel.findOne({
      where: { id, company },
    });

    // if bloodGlucoseLog has been deleted, throw an error
    if (!bloodGlucoseLog) {
      throw new CustomError(
        404,
        BloodGlucoseLogErrorCode.BLOOD_GLUCOSE_LOG_NOT_FOUND
      );
    }

    if (bloodGlucoseLog.archived) {
      // Check if bloodGlucoseLog already exists
      const existingBloodGlucoseLog = await BloodGlucoseLogModel.findAll({
        where: {
          date: bloodGlucoseLog.date,
          time: bloodGlucoseLog.time,
          staff: bloodGlucoseLog.staff,
          client: bloodGlucoseLog.client,
          reading: bloodGlucoseLog.reading,
          company: bloodGlucoseLog.company,
          archived: false,
        },
      });

      if (existingBloodGlucoseLog.length > 0) {
        throw new CustomError(
          409,
          BloodGlucoseLogErrorCode.BLOOD_GLUCOSE_LOG_ALREADY_EXISTS
        );
      }
    }

    // Finally, update the bloodGlucoseLog update the Archive state
    const [, [updatedBloodGlucoseLog]] = await BloodGlucoseLogModel.update(
      { archived: !bloodGlucoseLog.archived },
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

  async getBloodGlucoseLogs(props: GetBloodGlucoseLogsProps, userId: string) {
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

    // Count total bloodGlucoseLogs in the given company
    const count = await BloodGlucoseLogModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
      include,
    });

    // Find all bloodGlucoseLogs for matching props and company
    const data = await BloodGlucoseLogModel.findAll({
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

export default new BloodGlucoseLogService();
