import express from "express";

import controller from "./serviceDelivery.controller";
import serviceDeliverySchems from "./serviceDelivery.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.post(
  "/",
  canDo("create", "serviceDelivery"),
  serviceDeliverySchems.createServiceDelivery,
  catchWrap(controller.createServiceDelivery)
);

router.put(
  "/:serviceDeliveryId",
  canDo("update", "serviceDelivery"),
  serviceDeliverySchems.editServiceDelivery,
  catchWrap(controller.updateServiceDelivery)
);

router.delete(
  "/:serviceDeliveryId",
  canDo("delete", "serviceDelivery"),
  serviceDeliverySchems.deleteServiceDelivery,
  catchWrap(controller.deleteServiceDelivery)
);

router.get(
  "/:serviceDeliveryId",
  canDo("read", "serviceDelivery"),
  serviceDeliverySchems.getServiceDeliveryById,
  catchWrap(controller.getserviceDeliveryById)
);

router.get(
  "/",
  canDo("read", "serviceDelivery"),
  serviceDeliverySchems.getServiceDeliveries,
  catchWrap(controller.getServiceDeliveries)
);

export default router;
