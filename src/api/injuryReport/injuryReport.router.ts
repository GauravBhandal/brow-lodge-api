import express from "express";

import controller from "./injuryReport.controller";
import injuryReportSchems from "./injuryReport.schema";
import { catchWrap } from "../../components/errors";

const router = express.Router();

router.post(
  "/",
  injuryReportSchems.createInjuryReport,
  catchWrap(controller.createInjuryReport)
);

router.put(
  "/:injuryReportId",
  injuryReportSchems.editInjuryReport,
  catchWrap(controller.updateInjuryReport)
);

router.delete(
  "/:injuryReportId",
  injuryReportSchems.deleteInjuryReport,
  catchWrap(controller.deleteInjuryReport)
);

router.get(
  "/:injuryReportId",
  injuryReportSchems.getInjuryReportById,
  catchWrap(controller.getinjuryReportById)
);

router.get(
  "/",
  injuryReportSchems.getInjuryReports,
  catchWrap(controller.getInjuryReports)
);

export default router;
