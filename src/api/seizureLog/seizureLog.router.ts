import express from "express";

import controller from "./seizureLog.controller";
import seizureLogSchems from "./seizureLog.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.post(
  "/",
  canDo("create", "seizureLog"),
  seizureLogSchems.createSeizureLog,
  catchWrap(controller.createSeizureLog)
);

router.put(
  "/:seizureLogId",
  canDo("update", "seizureLog"),
  seizureLogSchems.editSeizureLog,
  catchWrap(controller.updateSeizureLog)
);

router.put(
  "/archive/:seizureLogId",
  canDo("delete", "seizureLog"),
  seizureLogSchems.deleteArchiveSeizureLog,
  catchWrap(controller.deleteArchiveSeizureLog)
);

router.delete(
  "/:seizureLogId",
  canDo("delete", "seizureLog"),
  seizureLogSchems.deleteSeizureLog,
  catchWrap(controller.deleteSeizureLog)
);

router.get(
  "/:seizureLogId",
  canDo("read", "seizureLog"),
  seizureLogSchems.getSeizureLogById,
  catchWrap(controller.getseizureLogById)
);

router.get(
  "/",
  canDo("read", "seizureLog"),
  seizureLogSchems.getSeizureLogs,
  catchWrap(controller.getSeizureLogs)
);

export default router;
