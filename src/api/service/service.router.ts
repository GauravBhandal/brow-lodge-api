import express from "express";

import controller from "./service.controller";
import serviceSchemas from "./service.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.post(
  "/",
  canDo("update", "rosterSetting"),
  serviceSchemas.createService,
  catchWrap(controller.createService)
);

// Leave it here (Before the next route)
router.put(
  "/pay-items",
  canDo("update", "rosterSetting"),
  serviceSchemas.updatePayItems,
  catchWrap(controller.updatePayItems)
);

router.put(
  "/:serviceId",
  canDo("update", "rosterSetting"),
  serviceSchemas.editService,
  catchWrap(controller.updateService)
);

router.delete(
  "/:serviceId",
  canDo("update", "rosterSetting"),
  serviceSchemas.deleteService,
  catchWrap(controller.deleteService)
);

router.get(
  "/pay-items",
  canDo("read", "rosterSetting"),
  catchWrap(controller.getPayItems)
);

// TODO: Delete this endpoint
router.get(
  "/effective",
  // canDo("read", "rosterSetting"), // TODO : Services in create shift
  serviceSchemas.getServices,
  catchWrap(controller.getEffectiveService)
);

router.get(
  "/:serviceId",
  canDo("read", "rosterSetting"),
  serviceSchemas.getServiceById,
  catchWrap(controller.getserviceById)
);

router.get(
  "/",
  // canDo("read", "rosterSetting"), // TODO : Services in create shift
  serviceSchemas.getServices,
  catchWrap(controller.getServices)
);

export default router;
