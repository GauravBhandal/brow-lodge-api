import express from "express";

import controller from "./whoLog.controller";
import whoLogSchems from "./whoLog.schema";
import { catchWrap } from "../../components/errors";

const router = express.Router();

router.post("/", whoLogSchems.createWhoLog, catchWrap(controller.createWhoLog));

router.put(
  "/:whoLogId",
  whoLogSchems.editWhoLog,
  catchWrap(controller.updateWhoLog)
);

router.delete(
  "/:whoLogId",
  whoLogSchems.deleteWhoLog,
  catchWrap(controller.deleteWhoLog)
);

router.get(
  "/:whoLogId",
  whoLogSchems.getWhoLogById,
  catchWrap(controller.getwhoLogById)
);

router.get("/", whoLogSchems.getWhoLogs, catchWrap(controller.getWhoLogs));

export default router;
