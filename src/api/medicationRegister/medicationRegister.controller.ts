import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import medicationRegisterService from "./medicationRegister.service";

class MedicationRegisterController {
  async createMedicationRegister(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const medicationRegister =
      await medicationRegisterService.createMedicationRegister(props);

    res.status(200).json(medicationRegister);
  }

  async updateMedicationRegister(req: Request, res: Response) {
    const { medicationRegisterId } = req.params;
    const props = {
      id: medicationRegisterId,
      company: req.auth.companyId,
      ...req.body,
    };

    const medicationRegister =
      await medicationRegisterService.updateMedicationRegister(props);

    res.status(200).json(medicationRegister);
  }

  async deleteMedicationRegister(req: Request, res: Response) {
    const { medicationRegisterId } = req.params;
    const props = {
      id: medicationRegisterId,
      company: req.auth.companyId,
    };

    await medicationRegisterService.deleteMedicationRegister(props);

    res.status(204).json();
  }

  async getmedicationRegisterById(req: Request, res: Response) {
    const { medicationRegisterId } = req.params;
    const props = {
      id: medicationRegisterId,
      company: req.auth.companyId,
    };

    const medicationRegister =
      await medicationRegisterService.getMedicationRegisterById(props);

    res.status(200).json(medicationRegister);
  }

  async getMedicationRegisters(req: Request, res: Response) {
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

    const medicationRegisters =
      await medicationRegisterService.getMedicationRegisters(
        props,
        req.auth.userId
      );

    res.status(200).json(medicationRegisters);
  }
}

export default new MedicationRegisterController();
