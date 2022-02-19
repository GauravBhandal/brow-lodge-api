import express from "express";

import controller from "./incidentType.controller";
import incidentTypeSchems from "./incidentType.schema";
import { catchWrap } from "../../components/errors";

const router = express.Router();

router.get(
  "/",
  // canDo("create", "incidentReport"),  TODO: User need to make a GET request when creating or editing incident report
  incidentTypeSchems.getIncidentTypes,
  catchWrap(controller.getIncidentTypes)
);

export default router;
