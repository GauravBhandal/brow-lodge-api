import express from "express";

import controller from "./service.controller";
import serviceSchemas from "./service.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.post(
  "/",
  canDo("create", "service"),
  serviceSchemas.createService,
  catchWrap(controller.createService)
);

router.put(
  "/:serviceId",
  canDo("update", "service"),
  serviceSchemas.editService,
  catchWrap(controller.updateService)
);

router.delete(
  "/:serviceId",
  canDo("delete", "service"),
  serviceSchemas.deleteService,
  catchWrap(controller.deleteService)
);

router.get(
  "/effective",
  canDo("read", "service"),
  serviceSchemas.getServices,
  catchWrap(controller.getEffectiveService)
);

router.get(
  "/:serviceId",
  canDo("read", "service"),
  serviceSchemas.getServiceById,
  catchWrap(controller.getserviceById)
);

router.get(
  "/",
  canDo("read", "service"),
  serviceSchemas.getServices,
  catchWrap(controller.getServices)
);

export default router;
