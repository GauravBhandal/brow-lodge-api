import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import timeSheetService from "./timeSheet.service";

class TimeSheetController {
  async createTimeSheet(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const timeSheet = await timeSheetService.createTimeSheet(props);

    res.status(200).json(timeSheet);
  }

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

  async deleteTimeSheet(req: Request, res: Response) {
    const { timeSheetId } = req.params;
    const props = {
      id: timeSheetId,
      company: req.auth.companyId,
    };

    await timeSheetService.deleteTimeSheet(props);

    res.status(204).json();
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
