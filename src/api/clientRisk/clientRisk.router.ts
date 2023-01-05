import express from "express";

import controller from "./clientRisk.controller";
import clientRiskSchems from "./clientRisk.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.post(
  "/",
  canDo("create", "clientRisk"),
  clientRiskSchems.createClientRisk,
  catchWrap(controller.createClientRisk)
);

router.put(
  "/:clientRiskId",
  canDo("update", "clientRisk"),
  clientRiskSchems.editClientRisk,
  catchWrap(controller.updateClientRisk)
);

router.put(
  "/archive/:clientRiskId",
  canDo("delete", "clientRisk"),
  clientRiskSchems.deleteArchiveClientRisk,
  catchWrap(controller.deleteArchiveClientRisk)
);

router.delete(
  "/:clientRiskId",
  canDo("delete", "clientRisk"),
  clientRiskSchems.deleteClientRisk,
  catchWrap(controller.deleteClientRisk)
);

router.get(
  "/:clientRiskId",
  canDo("read", "clientRisk"),
  clientRiskSchems.getClientRiskById,
  catchWrap(controller.getclientRiskById)
);

router.get(
  "/",
  canDo("read", "clientRisk"),
  clientRiskSchems.getClientRisks,
  catchWrap(controller.getClientRisks)
);

export default router;
