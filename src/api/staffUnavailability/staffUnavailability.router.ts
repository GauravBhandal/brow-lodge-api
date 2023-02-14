import express from "express";

import controller from "./staffUnavailability.controller";
import staffUnavailabilitySchemas from "./staffUnavailability.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.post(
  "/",
  canDo("create", "staffUnavailability"),
  staffUnavailabilitySchemas.createStaffUnavailability,
  catchWrap(controller.createStaffUnavailability)
);

router.delete(
  "/:staffUnavailabilityId",
  canDo("delete", "staffUnavailability"),
  staffUnavailabilitySchemas.deleteStaffUnavailability,
  catchWrap(controller.deleteStaffUnavailability)
);

router.get(
  "/:staffUnavailabilityId",
  canDo("read", "staffUnavailability"),
  staffUnavailabilitySchemas.getStaffUnavailabilityById,
  catchWrap(controller.getstaffUnavailabilityById)
);

router.get(
  "/",
  canDo("read", "staffUnavailability"),
  staffUnavailabilitySchemas.getStaffUnavailabilitys,
  catchWrap(controller.getStaffUnavailabilitys)
);

export default router;
