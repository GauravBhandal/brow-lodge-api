import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import injuryReportService from "./injuryReport.service";

class InjuryReportController {
  async createInjuryReport(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const injuryReport = await injuryReportService.createInjuryReport(props);

    res.status(200).json(injuryReport);
  }

  async updateInjuryReport(req: Request, res: Response) {
    const { injuryReportId } = req.params;
    const props = {
      id: injuryReportId,
      company: req.auth.companyId,
      ...req.body,
    };

    const injuryReport = await injuryReportService.updateInjuryReport(props);

    res.status(200).json(injuryReport);
  }

  async deleteInjuryReport(req: Request, res: Response) {
    const { injuryReportId } = req.params;
    const props = {
      id: injuryReportId,
      company: req.auth.companyId,
    };

    await injuryReportService.deleteInjuryReport(props);

    res.status(204).json();
  }

  async deleteArchiveInjuryReport(req: Request, res: Response) {
    const { injuryReportId } = req.params;
    const props = {
      id: injuryReportId,
      company: req.auth.companyId,
    };

    await injuryReportService.deleteArchiveInjuryReport(props);

    res.status(204).json();
  }

  async getinjuryReportById(req: Request, res: Response) {
    const { injuryReportId } = req.params;
    const props = {
      id: injuryReportId,
      company: req.auth.companyId,
    };

    const injuryReport = await injuryReportService.getInjuryReportById(props);

    res.status(200).json(injuryReport);
  }

  async getInjuryReports(req: Request, res: Response) {
    const queryParams = _pick(req.query, [
      "page",
      "pageSize",
      "sort",
      "where",
    ]) as any;
    const props = {
      company: req.auth.companyId,
      ...queryParams,
    };

    const injuryReports = await injuryReportService.getInjuryReports(
      props,
      req.auth.userId
    );

    res.status(200).json(injuryReports);
  }
}

export default new InjuryReportController();
