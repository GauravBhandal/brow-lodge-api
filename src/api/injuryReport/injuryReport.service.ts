import { omit as _omit } from "lodash";

import InjuryReportModel from "./injuryReport.model";
import {
  CreateInjuryReportProps,
  UpdateInjuryReportProps,
  DeleteInjuryReportProps,
  GetInjuryReportByIdProps,
  GetInjuryReportsProps,
} from "./injuryReport.types";
import { CustomError } from "../../components/errors";
import InjuryReportErrorCode from "./injuryReport.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { StaffProfileModel } from "../staffProfile";
import { ClientProfileModel } from "../clientProfile";
import { getFilters } from "../../components/filters";

class InjuryReportService {
  async createInjuryReport(props: CreateInjuryReportProps) {
    const injuryReport = await InjuryReportModel.create(props);
    return injuryReport;
  }

  async updateInjuryReport(props: UpdateInjuryReportProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find injuryReport by id and company
    const injuryReport = await InjuryReportModel.findOne({
      where: { id, company },
    });

    // if injuryReport not found, throw an error
    if (!injuryReport) {
      throw new CustomError(404, InjuryReportErrorCode.INJURY_REPORT);
    }

    // Finally, update the injuryReport
    const [, [updatedInjuryReport]] = await InjuryReportModel.update(
      updateProps,
      {
        where: { id, company },
        returning: true,
      }
    );
    return updatedInjuryReport;
  }

  async deleteInjuryReport(props: DeleteInjuryReportProps) {
    // Props
    const { id, company } = props;

    // Find and delete the injuryReport by id and company
    const injuryReport = await InjuryReportModel.destroy({
      where: { id, company },
    });

    // if injuryReport has been deleted, throw an error
    if (!injuryReport) {
      throw new CustomError(404, InjuryReportErrorCode.INJURY_REPORT);
    }

    return injuryReport;
  }

  async getInjuryReportById(props: GetInjuryReportByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the injuryReport by id and company
    const injuryReport = await InjuryReportModel.findOne({
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

    // If no injuryReport has been found, then throw an error
    if (!injuryReport) {
      throw new CustomError(404, InjuryReportErrorCode.INJURY_REPORT);
    }

    return injuryReport;
  }

  async getInjuryReports(props: GetInjuryReportsProps) {
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

    // Count total injuryReports in the given company
    const count = await InjuryReportModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      include,
    });

    // Find all injuryReports for matching props and company
    const data = await InjuryReportModel.findAll({
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

export default new InjuryReportService();
