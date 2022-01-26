import express from "express";

import controller from "./conflictOfInterest.controller";
import conflictOfInterestSchems from "./conflictOfInterest.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.post(
  "/",
  canDo("create", "conflictOfInterest"),
  conflictOfInterestSchems.createConflictOfInterest,
  catchWrap(controller.createConflictOfInterest)
);

router.put(
  "/:conflictOfInterestId",
  canDo("update", "conflictOfInterest"),
  conflictOfInterestSchems.editConflictOfInterest,
  catchWrap(controller.updateConflictOfInterest)
);

router.delete(
  "/:conflictOfInterestId",
  canDo("delete", "conflictOfInterest"),
  conflictOfInterestSchems.deleteConflictOfInterest,
  catchWrap(controller.deleteConflictOfInterest)
);

router.get(
  "/:conflictOfInterestId",
  canDo("read", "conflictOfInterest"),
  conflictOfInterestSchems.getConflictOfInterestById,
  catchWrap(controller.getconflictOfInterestById)
);

router.get(
  "/",
  canDo("read", "conflictOfInterest"),
  conflictOfInterestSchems.getConflictOfInterests,
  catchWrap(controller.getConflictOfInterests)
);

export default router;
