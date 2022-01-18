import express from "express";

import controller from "./oxygenSaturationLog.controller";
import oxygenSaturationLogSchems from "./oxygenSaturationLog.schema";
import { catchWrap } from "../../components/errors";

const router = express.Router();

router.post(
  "/",
  oxygenSaturationLogSchems.createOxygenSaturationLog,
  catchWrap(controller.createOxygenSaturationLog)
);

router.put(
  "/:oxygenSaturationLogId",
  oxygenSaturationLogSchems.editOxygenSaturationLog,
  catchWrap(controller.updateOxygenSaturationLog)
);

router.delete(
  "/:oxygenSaturationLogId",
  oxygenSaturationLogSchems.deleteOxygenSaturationLog,
  catchWrap(controller.deleteOxygenSaturationLog)
);

router.get(
  "/:oxygenSaturationLogId",
  oxygenSaturationLogSchems.getOxygenSaturationLogById,
  catchWrap(controller.getoxygenSaturationLogById)
);

router.get(
  "/",
  oxygenSaturationLogSchems.getOxygenSaturationLogs,
  catchWrap(controller.getOxygenSaturationLogs)
);

export default router;
