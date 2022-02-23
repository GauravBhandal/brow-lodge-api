import { omit as _omit } from "lodash";

import RestrictivePracticeLogModel from "./restrictivePracticeLog.model";
import {
  CreateRestrictivePracticeLogProps,
  UpdateRestrictivePracticeLogProps,
  DeleteRestrictivePracticeLogProps,
  GetRestrictivePracticeLogByIdProps,
  GetRestrictivePracticeLogsProps,
} from "./restrictivePracticeLog.types";
import { CustomError } from "../../components/errors";
import RestrictivePracticeLogErrorCode from "./restrictivePracticeLog.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { StaffProfileModel } from "../staffProfile";
import { ClientProfileModel } from "../clientProfile";
import { getFilters } from "../../components/filters";

class RestrictivePracticeLogService {
  async createRestrictivePracticeLog(props: CreateRestrictivePracticeLogProps) {
    const restrictivePracticeLog = await RestrictivePracticeLogModel.create(
      props
    );
    return restrictivePracticeLog;
  }

  async updateRestrictivePracticeLog(props: UpdateRestrictivePracticeLogProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find restrictivePracticeLog by id and company
    const restrictivePracticeLog = await RestrictivePracticeLogModel.findOne({
      where: { id, company },
    });

    // if restrictivePracticeLog not found, throw an error
    if (!restrictivePracticeLog) {
      throw new CustomError(
        404,
        RestrictivePracticeLogErrorCode.RESTRICTIVE_PRACTICE_LOG_NOT_FOUND
      );
    }

    // Finally, update the restrictivePracticeLog
    const [, [updatedRestrictivePracticeLog]] =
      await RestrictivePracticeLogModel.update(updateProps, {
        where: { id, company },
        returning: true,
      });
    return updatedRestrictivePracticeLog;
  }

  async deleteRestrictivePracticeLog(props: DeleteRestrictivePracticeLogProps) {
    // Props
    const { id, company } = props;

    // Find and delete the restrictivePracticeLog by id and company
    const restrictivePracticeLog = await RestrictivePracticeLogModel.destroy({
      where: { id, company },
    });

    // if restrictivePracticeLog has been deleted, throw an error
    if (!restrictivePracticeLog) {
      throw new CustomError(
        404,
        RestrictivePracticeLogErrorCode.RESTRICTIVE_PRACTICE_LOG_NOT_FOUND
      );
    }

    return restrictivePracticeLog;
  }

  async getRestrictivePracticeLogById(
    props: GetRestrictivePracticeLogByIdProps
  ) {
    // Props
    const { id, company } = props;

    // Find  the restrictivePracticeLog by id and company
    const restrictivePracticeLog = await RestrictivePracticeLogModel.findOne({
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

    // If no restrictivePracticeLog has been found, then throw an error
    if (!restrictivePracticeLog) {
      throw new CustomError(
        404,
        RestrictivePracticeLogErrorCode.RESTRICTIVE_PRACTICE_LOG_NOT_FOUND
      );
    }

    return restrictivePracticeLog;
  }

  async getRestrictivePracticeLogs(props: GetRestrictivePracticeLogsProps) {
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

    // Count total restrictivePracticeLogs in the given company
    const count = await RestrictivePracticeLogModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
      include,
    });

    // Find all restrictivePracticeLogs for matching props and company
    const data = await RestrictivePracticeLogModel.findAll({
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

export default new RestrictivePracticeLogService();
