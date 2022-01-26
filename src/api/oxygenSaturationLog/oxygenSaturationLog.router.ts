import express from "express";

import controller from "./oxygenSaturationLog.controller";
import oxygenSaturationLogSchems from "./oxygenSaturationLog.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability";

const router = express.Router();

router.post(
  "/",
  canDo("create", "oxygenSaturationLog"),
  oxygenSaturationLogSchems.createOxygenSaturationLog,
  catchWrap(controller.createOxygenSaturationLog)
);

router.put(
  "/:oxygenSaturationLogId",
  canDo("update", "oxygenSaturationLog"),
  oxygenSaturationLogSchems.editOxygenSaturationLog,
  catchWrap(controller.updateOxygenSaturationLog)
);

router.delete(
  "/:oxygenSaturationLogId",
  canDo("delete", "oxygenSaturationLog"),
  oxygenSaturationLogSchems.deleteOxygenSaturationLog,
  catchWrap(controller.deleteOxygenSaturationLog)
);

router.get(
  "/:oxygenSaturationLogId",
  canDo("read", "oxygenSaturationLog"),
  oxygenSaturationLogSchems.getOxygenSaturationLogById,
  catchWrap(controller.getoxygenSaturationLogById)
);

router.get(
  "/",
  canDo("read", "oxygenSaturationLog"),
  oxygenSaturationLogSchems.getOxygenSaturationLogs,
  catchWrap(controller.getOxygenSaturationLogs)
);

export default router;
