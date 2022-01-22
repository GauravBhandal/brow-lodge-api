import express from "express";

import controller from "./clientRisk.controller";
import clientRiskSchems from "./clientRisk.schema";
import { catchWrap } from "../../components/errors";

const router = express.Router();

router.post(
  "/",
  clientRiskSchems.createClientRisk,
  catchWrap(controller.createClientRisk)
);

router.put(
  "/:clientRiskId",
  clientRiskSchems.editClientRisk,
  catchWrap(controller.updateClientRisk)
);

router.delete(
  "/:clientRiskId",
  clientRiskSchems.deleteClientRisk,
  catchWrap(controller.deleteClientRisk)
);

router.get(
  "/:clientRiskId",
  clientRiskSchems.getClientRiskById,
  catchWrap(controller.getclientRiskById)
);

router.get(
  "/",
  clientRiskSchems.getClientRisks,
  catchWrap(controller.getClientRisks)
);

export default router;
