import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import processService from "./process.service";

class ProcessController {
  async createProcess(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const process = await processService.createProcess(props);

    res.status(200).json(process);
  }

  async updateProcess(req: Request, res: Response) {
    const { processId } = req.params;
    const props = {
      id: processId,
      company: req.auth.companyId,
      ...req.body,
    };

    const process = await processService.updateProcess(props);

    res.status(200).json(process);
  }

  async deleteProcess(req: Request, res: Response) {
    const { processId } = req.params;
    const props = {
      id: processId,
      company: req.auth.companyId,
    };

    await processService.deleteProcess(props);

    res.status(204).json();
  }

  async getprocessById(req: Request, res: Response) {
    const { processId } = req.params;
    const props = {
      id: processId,
      company: req.auth.companyId,
    };

    const process = await processService.getProcessById(props);

    res.status(200).json(process);
  }

  async getProcesses(req: Request, res: Response) {
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

    const processes = await processService.getProcesses(props, req.auth.userId);

    res.status(200).json(processes);
  }
}

export default new ProcessController();
