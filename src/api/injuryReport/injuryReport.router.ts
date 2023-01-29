import express from "express";

import controller from "./injuryReport.controller";
import injuryReportSchems from "./injuryReport.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.post(
  "/",
  canDo("create", "injuryReport"),
  injuryReportSchems.createInjuryReport,
  catchWrap(controller.createInjuryReport)
);

router.put(
  "/:injuryReportId",
  canDo("update", "injuryReport"),
  injuryReportSchems.editInjuryReport,
  catchWrap(controller.updateInjuryReport)
);

router.put(
  "/archive/:injuryReportId",
  canDo("delete", "injuryReport"),
  injuryReportSchems.deleteArchiveInjuryReport,
  catchWrap(controller.deleteArchiveInjuryReport)
);

router.delete(
  "/:injuryReportId",
  canDo("delete", "injuryReport"),
  injuryReportSchems.deleteInjuryReport,
  catchWrap(controller.deleteInjuryReport)
);

router.get(
  "/:injuryReportId",
  canDo("read", "injuryReport"),
  injuryReportSchems.getInjuryReportById,
  catchWrap(controller.getinjuryReportById)
);

router.get(
  "/",
  canDo("read", "injuryReport"),
  injuryReportSchems.getInjuryReports,
  catchWrap(controller.getInjuryReports)
);

export default router;
