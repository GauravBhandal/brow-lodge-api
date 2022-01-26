import express from "express";

import controller from "./whoLog.controller";
import whoLogSchems from "./whoLog.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability";

const router = express.Router();

router.post(
  "/",
  canDo("read", "whoLog"),
  whoLogSchems.createWhoLog,
  catchWrap(controller.createWhoLog)
);

router.put(
  "/:whoLogId",
  canDo("update", "whoLog"),
  whoLogSchems.editWhoLog,
  catchWrap(controller.updateWhoLog)
);

router.delete(
  "/:whoLogId",
  canDo("delete", "whoLog"),
  whoLogSchems.deleteWhoLog,
  catchWrap(controller.deleteWhoLog)
);

router.get(
  "/:whoLogId",
  canDo("read", "whoLog"),
  whoLogSchems.getWhoLogById,
  catchWrap(controller.getwhoLogById)
);

router.get(
  "/",
  canDo("read", "whoLog"),
  whoLogSchems.getWhoLogs,
  catchWrap(controller.getWhoLogs)
);

export default router;
