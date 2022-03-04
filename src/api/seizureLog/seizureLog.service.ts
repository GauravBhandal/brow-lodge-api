import { omit as _omit } from "lodash";

import SeizureLogModel from "./seizureLog.model";
import {
  CreateSeizureLogProps,
  UpdateSeizureLogProps,
  DeleteSeizureLogProps,
  GetSeizureLogByIdProps,
  GetSeizureLogsProps,
} from "./seizureLog.types";
import { CustomError } from "../../components/errors";
import SeizureLogErrorCode from "./seizureLog.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { StaffProfileModel } from "../staffProfile";
import { ClientProfileModel } from "../clientProfile";
import { getFilters } from "../../components/filters";

class SeizureLogService {
  async createSeizureLog(props: CreateSeizureLogProps) {
    const seizureLog = await SeizureLogModel.create(props);
    return seizureLog;
  }

  async updateSeizureLog(props: UpdateSeizureLogProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find seizureLog by id and company
    const seizureLog = await SeizureLogModel.findOne({
      where: { id, company },
    });

    // if seizureLog not found, throw an error
    if (!seizureLog) {
      throw new CustomError(404, SeizureLogErrorCode.SEIZURE_LOG_NOT_FOUND);
    }

    // Finally, update the seizureLog
    const [, [updatedSeizureLog]] = await SeizureLogModel.update(updateProps, {
      where: { id, company },
      returning: true,
    });
    return updatedSeizureLog;
  }

  async deleteSeizureLog(props: DeleteSeizureLogProps) {
    // Props
    const { id, company } = props;

    // Find and delete the seizureLog by id and company
    const seizureLog = await SeizureLogModel.destroy({
      where: { id, company },
    });

    // if seizureLog has been deleted, throw an error
    if (!seizureLog) {
      throw new CustomError(404, SeizureLogErrorCode.SEIZURE_LOG_NOT_FOUND);
    }

    return seizureLog;
  }

  async getSeizureLogById(props: GetSeizureLogByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the seizureLog by id and company
    const seizureLog = await SeizureLogModel.findOne({
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

    // If no seizureLog has been found, then throw an error
    if (!seizureLog) {
      throw new CustomError(404, SeizureLogErrorCode.SEIZURE_LOG_NOT_FOUND);
    }

    return seizureLog;
  }

  async getSeizureLogs(props: GetSeizureLogsProps) {
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

    // Count total seizureLogs in the given company
    const count = await SeizureLogModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
      include,
    });

    // Find all seizureLogs for matching props and company
    const data = await SeizureLogModel.findAll({
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

export default new SeizureLogService();
