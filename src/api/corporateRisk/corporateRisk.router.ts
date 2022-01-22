import express from "express";

import controller from "./corporateRisk.controller";
import corporateRiskSchems from "./corporateRisk.schema";
import { catchWrap } from "../../components/errors";

const router = express.Router();

router.post(
  "/",
  corporateRiskSchems.createCorporateRisk,
  catchWrap(controller.createCorporateRisk)
);

router.put(
  "/:corporateRiskId",
  corporateRiskSchems.editCorporateRisk,
  catchWrap(controller.updateCorporateRisk)
);

router.delete(
  "/:corporateRiskId",
  corporateRiskSchems.deleteCorporateRisk,
  catchWrap(controller.deleteCorporateRisk)
);

router.get(
  "/:corporateRiskId",
  corporateRiskSchems.getCorporateRiskById,
  catchWrap(controller.getcorporateRiskById)
);

router.get(
  "/",
  corporateRiskSchems.getCorporateRisks,
  catchWrap(controller.getCorporateRisks)
);

export default router;
