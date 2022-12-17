import express from "express";
import controller from "./practiceGuide.controller";
import practiceGuideSchems from "./practiceGuide.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.post(
  "/",
  canDo("create", "practiceGuide"),
  practiceGuideSchems.createPracticeGuide,
  catchWrap(controller.createPracticeGuide)
);

router.put(
  "/:practiceGuideId",
  canDo("update", "practiceGuide"),
  practiceGuideSchems.editPracticeGuide,
  catchWrap(controller.updatePracticeGuide)
);

router.put(
  "/archive/:practiceGuideId",
  canDo("delete", "practiceGuide"),
  practiceGuideSchems.deletePracticeGuide,
  catchWrap(controller.deletePracticeGuide)
);

router.delete(
  "/:practiceGuideId",
  canDo("delete", "practiceGuide"),
  practiceGuideSchems.deleteArchivePracticeGuide,
  catchWrap(controller.deleteArchivePracticeGuide)
);

router.get(
  "/:practiceGuideId",
  canDo("read", "practiceGuide"),
  practiceGuideSchems.getPracticeGuideById,
  catchWrap(controller.getpracticeGuideById)
);

router.get(
  "/",
  canDo("read", "practiceGuide"),
  practiceGuideSchems.getPracticeGuides,
  catchWrap(controller.getPracticeGuides)
);

export default router;
