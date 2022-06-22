import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import timesheetService from "./timesheet.service";

class TimesheetController {
  async updateTimesheet(req: Request, res: Response) {
    const { timesheetId } = req.params;
    const props = {
      id: timesheetId,
      company: req.auth.companyId,
      ...req.body,
    };

    const timesheet = await timesheetService.updateTimesheet(props);

    res.status(200).json(timesheet);
  }

  async updateTimesheetStatus(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const timesheet = await timesheetService.updateTimesheetStatus(props);

    res.status(200).json(timesheet);
  }

  async generateTimesheets(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const timesheet = await timesheetService.generateTimesheets(props);

    res.status(200).json(timesheet);
  }

  async getTimesheetById(req: Request, res: Response) {
    const { timesheetId } = req.params;
    const props = {
      id: timesheetId,
      company: req.auth.companyId,
    };

    const timesheet = await timesheetService.getTimesheetById(props);

    res.status(200).json(timesheet);
  }

  async getTimesheets(req: Request, res: Response) {
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

    const timesheets = await timesheetService.getTimesheets(props);

    res.status(200).json(timesheets);
  }
}

export default new TimesheetController();
