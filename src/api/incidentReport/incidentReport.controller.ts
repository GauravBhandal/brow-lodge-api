import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import incidentReportService from "./incidentReport.service";

class IncidentReportController {
  async createIncidentReport(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const incidentReport = await incidentReportService.createIncidentReport(
      props
    );

    res.status(200).json(incidentReport);
  }

  async updateIncidentReport(req: Request, res: Response) {
    const { incidentReportId } = req.params;
    const props = {
      id: incidentReportId,
      company: req.auth.companyId,
      ...req.body,
    };

    const incidentReport = await incidentReportService.updateIncidentReport(
      props
    );

    res.status(200).json(incidentReport);
  }

  async deleteIncidentReport(req: Request, res: Response) {
    const { incidentReportId } = req.params;
    const props = {
      id: incidentReportId,
      company: req.auth.companyId,
    };

    await incidentReportService.deleteIncidentReport(props);

    res.status(204).json();
  }

  async deleteArchiveIncidentReport(req: Request, res: Response) {
    const { incidentReportId } = req.params;
    const props = {
      id: incidentReportId,
      company: req.auth.companyId,
    };

    await incidentReportService.deleteArchiveIncidentReport(props);

    res.status(204).json();
  }

  async getincidentReportById(req: Request, res: Response) {
    const { incidentReportId } = req.params;
    const props = {
      id: incidentReportId,
      company: req.auth.companyId,
    };

    const incidentReport = await incidentReportService.getIncidentReportById(
      props
    );

    res.status(200).json(incidentReport);
  }

  async getIncidentReports(req: Request, res: Response) {
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

    const incidentReports = await incidentReportService.getIncidentReports(
      props,
      req.auth.userId
    );

    res.status(200).json(incidentReports);
  }
}

export default new IncidentReportController();
