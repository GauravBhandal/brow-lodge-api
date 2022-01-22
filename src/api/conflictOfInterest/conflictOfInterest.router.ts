import express from "express";

import controller from "./conflictOfInterest.controller";
import conflictOfInterestSchems from "./conflictOfInterest.schema";
import { catchWrap } from "../../components/errors";

const router = express.Router();

router.post(
  "/",
  conflictOfInterestSchems.createConflictOfInterest,
  catchWrap(controller.createConflictOfInterest)
);

router.put(
  "/:conflictOfInterestId",
  conflictOfInterestSchems.editConflictOfInterest,
  catchWrap(controller.updateConflictOfInterest)
);

router.delete(
  "/:conflictOfInterestId",
  conflictOfInterestSchems.deleteConflictOfInterest,
  catchWrap(controller.deleteConflictOfInterest)
);

router.get(
  "/:conflictOfInterestId",
  conflictOfInterestSchems.getConflictOfInterestById,
  catchWrap(controller.getconflictOfInterestById)
);

router.get(
  "/",
  conflictOfInterestSchems.getConflictOfInterests,
  catchWrap(controller.getConflictOfInterests)
);

export default router;
