import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import progressReportService from "./progressReport.service";

class ProgressReportController {
  async createProgressReport(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const progressReport = await progressReportService.createProgressReport(
      props
    );

    res.status(200).json(progressReport);
  }

  async updateProgressReport(req: Request, res: Response) {
    const { progressReportId } = req.params;
    const props = {
      id: progressReportId,
      company: req.auth.companyId,
      ...req.body,
    };

    const progressReport = await progressReportService.updateProgressReport(
      props
    );

    res.status(200).json(progressReport);
  }

  async deleteProgressReport(req: Request, res: Response) {
    const { progressReportId } = req.params;
    const props = {
      id: progressReportId,
      company: req.auth.companyId,
    };

    await progressReportService.deleteProgressReport(props);

    res.status(204).json();
  }

  async deleteArchiveProgressReport(req: Request, res: Response) {
    const { progressReportId } = req.params;
    const props = {
      id: progressReportId,
      company: req.auth.companyId,
    };

    await progressReportService.deleteArchiveProgressReport(props);

    res.status(204).json();
  }

  async getprogressReportById(req: Request, res: Response) {
    const { progressReportId } = req.params;
    const props = {
      id: progressReportId,
      company: req.auth.companyId,
    };

    const progressReport = await progressReportService.getProgressReportById(
      props
    );

    res.status(200).json(progressReport);
  }

  async getProgressReports(req: Request, res: Response) {
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

    const progressReports = await progressReportService.getProgressReports(
      props,
      req.auth.userId
    );

    res.status(200).json(progressReports);
  }
}

export default new ProgressReportController();
