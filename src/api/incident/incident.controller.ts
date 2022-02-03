import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import incidentService from "./incident.service";

class IncidentController {
  async createIncident(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const incident = await incidentService.createIncident(props);

    res.status(200).json(incident);
  }

  async updateIncident(req: Request, res: Response) {
    const { incidentId } = req.params;
    const props = {
      id: incidentId,
      company: req.auth.companyId,
      ...req.body,
    };

    const incident = await incidentService.updateIncident(props);

    res.status(200).json(incident);
  }

  async deleteIncident(req: Request, res: Response) {
    const { incidentId } = req.params;
    const props = {
      id: incidentId,
      company: req.auth.companyId,
    };

    await incidentService.deleteIncident(props);

    res.status(204).json();
  }

  async getincidentById(req: Request, res: Response) {
    const { incidentId } = req.params;
    const props = {
      id: incidentId,
      company: req.auth.companyId,
    };

    const incident = await incidentService.getIncidentById(props);

    res.status(200).json(incident);
  }

  async getIncidents(req: Request, res: Response) {
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

    const incidents = await incidentService.getIncidents(props);

    res.status(200).json(incidents);
  }
}

export default new IncidentController();
