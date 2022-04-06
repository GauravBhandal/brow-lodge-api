import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import doctorVisitService from "./doctorVisit.service";

class DoctorVisitController {
  async createDoctorVisit(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const doctorVisit = await doctorVisitService.createDoctorVisit(props);

    res.status(200).json(doctorVisit);
  }

  async updateDoctorVisit(req: Request, res: Response) {
    const { doctorVisitId } = req.params;
    const props = {
      id: doctorVisitId,
      company: req.auth.companyId,
      ...req.body,
    };

    const doctorVisit = await doctorVisitService.updateDoctorVisit(props);

    res.status(200).json(doctorVisit);
  }

  async deleteDoctorVisit(req: Request, res: Response) {
    const { doctorVisitId } = req.params;
    const props = {
      id: doctorVisitId,
      company: req.auth.companyId,
    };

    await doctorVisitService.deleteDoctorVisit(props);

    res.status(204).json();
  }

  async getdoctorVisitById(req: Request, res: Response) {
    const { doctorVisitId } = req.params;
    const props = {
      id: doctorVisitId,
      company: req.auth.companyId,
    };

    const doctorVisit = await doctorVisitService.getDoctorVisitById(props);

    res.status(200).json(doctorVisit);
  }

  async getDoctorVisits(req: Request, res: Response) {
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

    const doctorVisits = await doctorVisitService.getDoctorVisits(
      props,
      req.auth.userId
    );

    res.status(200).json(doctorVisits);
  }
}

export default new DoctorVisitController();
