import express from "express";

import controller from "./payLevel.controller";
import payLevelSchemas from "./payLevel.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.post(
  "/",
  canDo("update", "rosterSetting"),
  payLevelSchemas.createPayLevel,
  catchWrap(controller.createPayLevel)
);

router.put(
  "/:payLevelId",
  canDo("update", "rosterSetting"),
  payLevelSchemas.editPayLevel,
  catchWrap(controller.updatePayLevel)
);

router.delete(
  "/:payLevelId",
  canDo("update", "rosterSetting"),
  payLevelSchemas.deletePayLevel,
  catchWrap(controller.deletePayLevel)
);

router.get(
  "/:payLevelId",
  canDo("read", "rosterSetting"),
  payLevelSchemas.getPayLevelById,
  catchWrap(controller.getpayLevelById)
);

router.get(
  "/",
  canDo("read", "rosterSetting"),
  payLevelSchemas.getPayLevels,
  catchWrap(controller.getPayLevels)
);

export default router;
