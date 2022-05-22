import express from "express";

import controller from "./temperatureLog.controller";
import temperatureLogSchems from "./temperatureLog.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.post(
  "/",
  canDo("create", "temperatureLog"),
  temperatureLogSchems.createTemperatureLog,
  catchWrap(controller.createTemperatureLog)
);

router.put(
  "/:temperatureLogId",
  canDo("update", "temperatureLog"),
  temperatureLogSchems.editTemperatureLog,
  catchWrap(controller.updateTemperatureLog)
);

router.delete(
  "/:temperatureLogId",
  canDo("delete", "temperatureLog"),
  temperatureLogSchems.deleteTemperatureLog,
  catchWrap(controller.deleteTemperatureLog)
);

router.get(
  "/:temperatureLogId",
  canDo("read", "temperatureLog"),
  temperatureLogSchems.getTemperatureLogById,
  catchWrap(controller.gettemperatureLogById)
);

router.get(
  "/",
  canDo("read", "temperatureLog"),
  temperatureLogSchems.getTemperatureLogs,
  catchWrap(controller.getTemperatureLogs)
);

export default router;
