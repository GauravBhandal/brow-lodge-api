import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import incidentTypeService from "./incidentType.service";

class IncidentTypeController {
  async getIncidentTypes(req: Request, res: Response) {
    const queryParams = _pick(req.query, [
      "page",
      "pageSize",
      "sort",
      "where",
    ]) as any;
    const props = {
      ...queryParams,
    };

    const incidentTypes = await incidentTypeService.getIncidentTypes(props);

    res.status(200).json(incidentTypes);
  }
}

export default new IncidentTypeController();
