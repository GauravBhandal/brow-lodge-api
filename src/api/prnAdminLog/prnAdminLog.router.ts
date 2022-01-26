import express from "express";

import controller from "./prnAdminLog.controller";
import prnAdminLogSchems from "./prnAdminLog.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability";

const router = express.Router();

router.post(
  "/",
  canDo("create", "prnAdminLog"),
  prnAdminLogSchems.createPrnAdminLog,
  catchWrap(controller.createPrnAdminLog)
);

router.put(
  "/:prnAdminLogId",
  canDo("update", "prnAdminLog"),
  prnAdminLogSchems.editPrnAdminLog,
  catchWrap(controller.updatePrnAdminLog)
);

router.delete(
  "/:prnAdminLogId",
  canDo("delete", "prnAdminLog"),
  prnAdminLogSchems.deletePrnAdminLog,
  catchWrap(controller.deletePrnAdminLog)
);

router.get(
  "/:prnAdminLogId",
  canDo("read", "prnAdminLog"),
  prnAdminLogSchems.getPrnAdminLogById,
  catchWrap(controller.getprnAdminLogById)
);

router.get(
  "/",
  canDo("read", "prnAdminLog"),
  prnAdminLogSchems.getPrnAdminLogs,
  catchWrap(controller.getPrnAdminLogs)
);

export default router;
