import express from "express";

import controller from "./incidentReport.controller";
import incidentReportSchems from "./incidentReport.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.post(
  "/",
  canDo("create", "incidentReport"),
  incidentReportSchems.createIncidentReport,
  catchWrap(controller.createIncidentReport)
);

router.put(
  "/:incidentReportId",
  canDo("update", "incidentReport"),
  incidentReportSchems.editIncidentReport,
  catchWrap(controller.updateIncidentReport)
);

router.delete(
  "/:incidentReportId",
  canDo("delete", "incidentReport"),
  incidentReportSchems.deleteIncidentReport,
  catchWrap(controller.deleteIncidentReport)
);

router.get(
  "/:incidentReportId",
  canDo("read", "incidentReport"),
  incidentReportSchems.getIncidentReportById,
  catchWrap(controller.getincidentReportById)
);

router.get(
  "/",
  canDo("read", "incidentReport"),
  incidentReportSchems.getIncidentReports,
  catchWrap(controller.getIncidentReports)
);

export default router;
