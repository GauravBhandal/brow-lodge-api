import express from "express";

import controller from "./prnAdminLog.controller";
import prnAdminLogSchems from "./prnAdminLog.schema";
import { catchWrap } from "../../components/errors";

const router = express.Router();

router.post(
  "/",
  prnAdminLogSchems.createPrnAdminLog,
  catchWrap(controller.createPrnAdminLog)
);

router.put(
  "/:prnAdminLogId",
  prnAdminLogSchems.editPrnAdminLog,
  catchWrap(controller.updatePrnAdminLog)
);

router.delete(
  "/:prnAdminLogId",
  prnAdminLogSchems.deletePrnAdminLog,
  catchWrap(controller.deletePrnAdminLog)
);

router.get(
  "/:prnAdminLogId",
  prnAdminLogSchems.getPrnAdminLogById,
  catchWrap(controller.getprnAdminLogById)
);

router.get(
  "/",
  prnAdminLogSchems.getPrnAdminLogs,
  catchWrap(controller.getPrnAdminLogs)
);

export default router;
