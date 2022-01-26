import express from "express";

import controller from "./corporateRisk.controller";
import corporateRiskSchems from "./corporateRisk.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability";

const router = express.Router();

router.post(
  "/",
  canDo("create", "corporateRisk"),
  corporateRiskSchems.createCorporateRisk,
  catchWrap(controller.createCorporateRisk)
);

router.put(
  "/:corporateRiskId",
  canDo("update", "corporateRisk"),
  corporateRiskSchems.editCorporateRisk,
  catchWrap(controller.updateCorporateRisk)
);

router.delete(
  "/:corporateRiskId",
  canDo("delete", "corporateRisk"),
  corporateRiskSchems.deleteCorporateRisk,
  catchWrap(controller.deleteCorporateRisk)
);

router.get(
  "/:corporateRiskId",
  canDo("read", "corporateRisk"),
  corporateRiskSchems.getCorporateRiskById,
  catchWrap(controller.getcorporateRiskById)
);

router.get(
  "/",
  canDo("read", "corporateRisk"),
  corporateRiskSchems.getCorporateRisks,
  catchWrap(controller.getCorporateRisks)
);

export default router;
