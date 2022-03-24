import express from "express";

import controller from "./progressReport.controller";
import progressReportSchems from "./progressReport.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.post(
  "/",
  canDo("create", "progressReport"),
  progressReportSchems.createProgressReport,
  catchWrap(controller.createProgressReport)
);

router.put(
  "/:progressReportId",
  canDo("update", "progressReport"),
  progressReportSchems.editProgressReport,
  catchWrap(controller.updateProgressReport)
);

router.delete(
  "/:progressReportId",
  canDo("delete", "progressReport"),
  progressReportSchems.deleteProgressReport,
  catchWrap(controller.deleteProgressReport)
);

router.get(
  "/:progressReportId",
  canDo("read", "progressReport"),
  progressReportSchems.getProgressReportById,
  catchWrap(controller.getprogressReportById)
);

router.get(
  "/",
  canDo("read", "progressReport"),
  progressReportSchems.getProgressReports,
  catchWrap(controller.getProgressReports)
);

export default router;
