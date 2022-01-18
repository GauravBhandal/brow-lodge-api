import express from "express";

import controller from "./seizureLog.controller";
import seizureLogSchems from "./seizureLog.schema";
import { catchWrap } from "../../components/errors";

const router = express.Router();

router.post(
  "/",
  seizureLogSchems.createSeizureLog,
  catchWrap(controller.createSeizureLog)
);

router.put(
  "/:seizureLogId",
  seizureLogSchems.editSeizureLog,
  catchWrap(controller.updateSeizureLog)
);

router.delete(
  "/:seizureLogId",
  seizureLogSchems.deleteSeizureLog,
  catchWrap(controller.deleteSeizureLog)
);

router.get(
  "/:seizureLogId",
  seizureLogSchems.getSeizureLogById,
  catchWrap(controller.getseizureLogById)
);

router.get(
  "/",
  seizureLogSchems.getSeizureLogs,
  catchWrap(controller.getSeizureLogs)
);

export default router;
