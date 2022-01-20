import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import repairRequestService from "./repairRequest.service";

class RepairRequestController {
  async createRepairRequest(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const repairRequest = await repairRequestService.createRepairRequest(props);

    res.status(200).json(repairRequest);
  }

  async updateRepairRequest(req: Request, res: Response) {
    const { repairRequestId } = req.params;
    const props = {
      id: repairRequestId,
      company: req.auth.companyId,
      ...req.body,
    };

    const repairRequest = await repairRequestService.updateRepairRequest(props);

    res.status(200).json(repairRequest);
  }

  async deleteRepairRequest(req: Request, res: Response) {
    const { repairRequestId } = req.params;
    const props = {
      id: repairRequestId,
      company: req.auth.companyId,
    };

    await repairRequestService.deleteRepairRequest(props);

    res.status(204).json();
  }

  async getrepairRequestById(req: Request, res: Response) {
    const { repairRequestId } = req.params;
    const props = {
      id: repairRequestId,
      company: req.auth.companyId,
    };

    const repairRequest = await repairRequestService.getRepairRequestById(
      props
    );

    res.status(200).json(repairRequest);
  }

  async getRepairRequests(req: Request, res: Response) {
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

    const repairRequests = await repairRequestService.getRepairRequests(props);

    res.status(200).json(repairRequests);
  }
}

export default new RepairRequestController();
