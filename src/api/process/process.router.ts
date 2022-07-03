import express from "express";

import controller from "./process.controller";
import processSchems from "./process.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.post(
  "/",
  canDo("create", "process"),
  processSchems.createProcess,
  catchWrap(controller.createProcess)
);

router.put(
  "/:processId",
  canDo("update", "process"),
  processSchems.editProcess,
  catchWrap(controller.updateProcess)
);

router.delete(
  "/:processId",
  canDo("delete", "process"),
  processSchems.deleteProcess,
  catchWrap(controller.deleteProcess)
);

router.get(
  "/:processId",
  canDo("read", "process"),
  processSchems.getProcessById,
  catchWrap(controller.getprocessById)
);

router.get(
  "/",
  canDo("read", "process"),
  processSchems.getProcesses,
  catchWrap(controller.getProcesses)
);

export default router;
