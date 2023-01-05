import express from "express";

import controller from "./continuousImprovement.controller";
import continuousImprovementSchems from "./continuousImprovement.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.post(
  "/",
  canDo("create", "continuousImprovement"),
  continuousImprovementSchems.createContinuousImprovement,
  catchWrap(controller.createContinuousImprovement)
);

router.put(
  "/:continuousImprovementId",
  canDo("update", "continuousImprovement"),
  continuousImprovementSchems.editContinuousImprovement,
  catchWrap(controller.updateContinuousImprovement)
);

router.put(
  "/archive/:continuousImprovementId",
  canDo("delete", "continuousImprovement"),
  continuousImprovementSchems.deleteArchiveContinuousImprovement,
  catchWrap(controller.deleteArchiveContinuousImprovement)
);

router.delete(
  "/:continuousImprovementId",
  canDo("delete", "continuousImprovement"),
  continuousImprovementSchems.deleteContinuousImprovement,
  catchWrap(controller.deleteContinuousImprovement)
);

router.get(
  "/:continuousImprovementId",
  canDo("read", "continuousImprovement"),
  continuousImprovementSchems.getContinuousImprovementById,
  catchWrap(controller.getcontinuousImprovementById)
);

router.get(
  "/",
  canDo("read", "continuousImprovement"),
  continuousImprovementSchems.getContinuousImprovements,
  catchWrap(controller.getContinuousImprovements)
);

export default router;
