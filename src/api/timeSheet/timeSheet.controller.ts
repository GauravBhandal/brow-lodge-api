import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import timeSheetService from "./timeSheet.service";

class TimeSheetController {
  async updateTimeSheet(req: Request, res: Response) {
    const { timeSheetId } = req.params;
    const props = {
      id: timeSheetId,
      company: req.auth.companyId,
      ...req.body,
    };

    const timeSheet = await timeSheetService.updateTimeSheet(props);

    res.status(200).json(timeSheet);
  }

  async updateTimeSheetStatus(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const timeSheet = await timeSheetService.updateTimeSheetStatus(props);

    res.status(200).json(timeSheet);
  }

  async gettimeSheetById(req: Request, res: Response) {
    const { timeSheetId } = req.params;
    const props = {
      id: timeSheetId,
      company: req.auth.companyId,
    };

    const timeSheet = await timeSheetService.getTimeSheetById(props);

    res.status(200).json(timeSheet);
  }

  async getTimeSheets(req: Request, res: Response) {
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

    const timeSheets = await timeSheetService.getTimeSheets(
      props,
      req.auth.userId
    );

    res.status(200).json(timeSheets);
  }
}

export default new TimeSheetController();
