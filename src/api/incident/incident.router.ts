import express from "express";

import controller from "./incident.controller";
import incidentSchems from "./incident.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.post(
  "/",
  canDo("create", "incident"),
  incidentSchems.createIncident,
  catchWrap(controller.createIncident)
);

router.put(
  "/:incidentId",
  canDo("update", "incident"),
  incidentSchems.editIncident,
  catchWrap(controller.updateIncident)
);

router.delete(
  "/:incidentId",
  canDo("delete", "incident"),
  incidentSchems.deleteIncident,
  catchWrap(controller.deleteIncident)
);

router.get(
  "/:incidentId",
  canDo("read", "incident"),
  incidentSchems.getIncidentById,
  catchWrap(controller.getincidentById)
);

router.get(
  "/",
  canDo("read", "incident"),
  incidentSchems.getIncidents,
  catchWrap(controller.getIncidents)
);

export default router;
