import express from "express";

import controller from "./keyDecision.controller";
import keyDecisionSchems from "./keyDecision.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.post(
  "/",
  canDo("create", "keyDecision"),
  keyDecisionSchems.createKeyDecision,
  catchWrap(controller.createKeyDecision)
);

router.put(
  "/:keyDecisionId",
  canDo("update", "keyDecision"),
  keyDecisionSchems.editKeyDecision,
  catchWrap(controller.updateKeyDecision)
);

router.delete(
  "/:keyDecisionId",
  canDo("delete", "keyDecision"),
  keyDecisionSchems.deleteKeyDecision,
  catchWrap(controller.deleteKeyDecision)
);

router.get(
  "/:keyDecisionId",
  canDo("read", "keyDecision"),
  keyDecisionSchems.getKeyDecisionById,
  catchWrap(controller.getkeyDecisionById)
);

router.get(
  "/",
  canDo("read", "keyDecision"),
  keyDecisionSchems.getKeyDecisions,
  catchWrap(controller.getKeyDecisions)
);

export default router;
