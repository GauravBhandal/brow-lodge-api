import express from "express";

import controller from "./staffUnavailability.controller";
import staffUnavailabilitySchemas from "./staffUnavailability.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.get(
  "/staff-list",
  // canDo("read", "staffUnavailability"), //Everyone can make a call
  staffUnavailabilitySchemas.getStaffUnavailabilityList,
  catchWrap(controller.getStaffUnavailabilityList)
);

router.post(
  "/",
  canDo("update", "staffProfile"),
  staffUnavailabilitySchemas.createStaffUnavailability,
  catchWrap(controller.createStaffUnavailability)
);

router.delete(
  "/:staffUnavailabilityId",
  canDo("update", "staffProfile"),
  staffUnavailabilitySchemas.deleteStaffUnavailability,
  catchWrap(controller.deleteStaffUnavailability)
);

router.get(
  "/:staffUnavailabilityId",
  canDo("read", "staffProfile"),
  staffUnavailabilitySchemas.getStaffUnavailabilityById,
  catchWrap(controller.getstaffUnavailabilityById)
);

router.get(
  "/",
  canDo("read", "staffProfile"),
  staffUnavailabilitySchemas.getStaffUnavailabilitys,
  catchWrap(controller.getStaffUnavailabilitys)
);

export default router;
