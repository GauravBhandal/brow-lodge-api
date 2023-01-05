import express from "express";

import controller from "./medicationRegister.controller";
import medicationRegisterSchems from "./medicationRegister.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.post(
  "/",
  canDo("create", "medicationRegister"),
  medicationRegisterSchems.createMedicationRegister,
  catchWrap(controller.createMedicationRegister)
);

router.put(
  "/:medicationRegisterId",
  canDo("update", "medicationRegister"),
  medicationRegisterSchems.editMedicationRegister,
  catchWrap(controller.updateMedicationRegister)
);

router.put(
  "/archive/:medicationRegisterId",
  canDo("delete", "medicationRegister"),
  medicationRegisterSchems.deleteArchiveMedicationRegister,
  catchWrap(controller.deleteArchiveMedicationRegister)
);

router.delete(
  "/:medicationRegisterId",
  canDo("delete", "medicationRegister"),
  medicationRegisterSchems.deleteMedicationRegister,
  catchWrap(controller.deleteMedicationRegister)
);

router.get(
  "/:medicationRegisterId",
  canDo("read", "medicationRegister"),
  medicationRegisterSchems.getMedicationRegisterById,
  catchWrap(controller.getmedicationRegisterById)
);

router.get(
  "/",
  canDo("read", "medicationRegister"),
  medicationRegisterSchems.getMedicationRegisters,
  catchWrap(controller.getMedicationRegisters)
);

export default router;
