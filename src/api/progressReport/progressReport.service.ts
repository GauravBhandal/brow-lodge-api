import { omit as _omit } from "lodash";

import ProgressReportModel from "./progressReport.model";
import {
  CreateProgressReportProps,
  UpdateProgressReportProps,
  DeleteProgressReportProps,
  GetProgressReportByIdProps,
  GetProgressReportsProps,
} from "./progressReport.types";
import { CustomError } from "../../components/errors";
import ProgressReportErrorCode from "./progressReport.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { StaffProfileModel } from "../staffProfile";
import { ClientProfileModel } from "../clientProfile";
import { getFilters } from "../../components/filters";
import { addCientFiltersByTeams } from "../../components/filters";

class ProgressReportService {
  async createProgressReport(props: CreateProgressReportProps) {
    const progressReport = await ProgressReportModel.create(props);
    return progressReport;
  }

  async updateProgressReport(props: UpdateProgressReportProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find progressReport by id and company
    const progressReport = await ProgressReportModel.findOne({
      where: { id, company },
    });

    // if progressReport not found, throw an error
    if (!progressReport) {
      throw new CustomError(
        404,
        ProgressReportErrorCode.PROGRESS_REPORT_NOT_FOUND
      );
    }

    // Finally, update the progressReport
    const [, [updatedProgressReport]] = await ProgressReportModel.update(
      updateProps,
      {
        where: { id, company },
        returning: true,
      }
    );
    return updatedProgressReport;
  }

  async deleteProgressReport(props: DeleteProgressReportProps) {
    // Props
    const { id, company } = props;

    // Find and delete the progressReport by id and company
    const progressReport = await ProgressReportModel.destroy({
      where: { id, company },
    });

    // if progressReport has been deleted, throw an error
    if (!progressReport) {
      throw new CustomError(
        404,
        ProgressReportErrorCode.PROGRESS_REPORT_NOT_FOUND
      );
    }

    return progressReport;
  }

  async getProgressReportById(props: GetProgressReportByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the progressReport by id and company
    const progressReport = await ProgressReportModel.findOne({
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

    // If no progressReport has been found, then throw an error
    if (!progressReport) {
      throw new CustomError(
        404,
        ProgressReportErrorCode.PROGRESS_REPORT_NOT_FOUND
      );
    }

    return progressReport;
  }

  async getProgressReports(props: GetProgressReportsProps, userId: string) {
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

    // Count total progressReports in the given company
    const count = await ProgressReportModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
      include,
    });

    // Find all progressReports for matching props and company
    const data = await ProgressReportModel.findAll({
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

export default new ProgressReportService();
