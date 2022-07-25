import express from "express";

import controller from "./alertConfiguration.controller";
import alertConfigurationSchems from "./alertConfiguration.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.post(
  "/",
  canDo("create", "alertConfiguration"),
  alertConfigurationSchems.createAlertConfiguration,
  catchWrap(controller.createAlertConfiguration)
);

router.put(
  "/:alertConfigurationId",
  canDo("update", "alertConfiguration"),
  alertConfigurationSchems.editAlertConfiguration,
  catchWrap(controller.updateAlertConfiguration)
);

router.delete(
  "/:alertConfigurationId",
  canDo("delete", "alertConfiguration"),
  alertConfigurationSchems.deleteAlertConfiguration,
  catchWrap(controller.deleteAlertConfiguration)
);

router.get(
  "/:alertConfigurationId",
  canDo("read", "alertConfiguration"),
  alertConfigurationSchems.getAlertConfigurationById,
  catchWrap(controller.getalertConfigurationById)
);

router.get(
  "/",
  canDo("read", "alertConfiguration"),
  alertConfigurationSchems.getAlertConfigurations,
  catchWrap(controller.getAlertConfigurations)
);

export default router;
