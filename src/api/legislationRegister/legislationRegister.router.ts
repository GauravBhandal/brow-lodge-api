import express from "express";

import controller from "./legislationRegister.controller";
import legislationRegisterSchemas from "./legislationRegister.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.post(
  "/",
  canDo("create", "legislationRegister"),
  legislationRegisterSchemas.createLegislationRegister,
  catchWrap(controller.createLegislationRegister)
);

router.put(
  "/:legislationRegisterId",
  canDo("update", "legislationRegister"),
  legislationRegisterSchemas.editLegislationRegister,
  catchWrap(controller.updateLegislationRegister)
);

router.put(
  "/archive/:legislationRegisterId",
  canDo("delete", "legislationRegister"),
  legislationRegisterSchemas.deleteArchiveLegislationRegister,
  catchWrap(controller.deleteArchiveLegislationRegister)
);

router.delete(
  "/:legislationRegisterId",
  canDo("delete", "legislationRegister"),
  legislationRegisterSchemas.deleteLegislationRegister,
  catchWrap(controller.deleteLegislationRegister)
);

router.get(
  "/:legislationRegisterId",
  canDo("read", "legislationRegister"),
  legislationRegisterSchemas.getLegislationRegisterById,
  catchWrap(controller.getlegislationRegisterById)
);

router.get(
  "/",
  canDo("read", "legislationRegister"),
  legislationRegisterSchemas.getLegislationRegisters,
  catchWrap(controller.getLegislationRegisters)
);

export default router;
