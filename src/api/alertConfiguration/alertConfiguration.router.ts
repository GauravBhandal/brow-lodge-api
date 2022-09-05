import express from "express";

import controller from "./alertConfiguration.controller";
import alertConfigurationSchems from "./alertConfiguration.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.put(
  "/",
  canDo("update", "alertConfiguration"),
  alertConfigurationSchems.editAlertConfiguration,
  catchWrap(controller.updateAlertConfiguration)
);

router.get(
  "/",
  canDo("read", "alertConfiguration"),
  catchWrap(controller.getAlertConfigurations)
);

export default router;
