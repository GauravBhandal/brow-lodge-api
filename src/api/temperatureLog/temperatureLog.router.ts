import express from "express";

import controller from "./temperatureLog.controller";
import temperatureLogSchems from "./temperatureLog.schema";
import { catchWrap } from "../../components/errors";

const router = express.Router();

router.post(
  "/",
  temperatureLogSchems.createTemperatureLog,
  catchWrap(controller.createTemperatureLog)
);

router.put(
  "/:temperatureLogId",
  temperatureLogSchems.editTemperatureLog,
  catchWrap(controller.updateTemperatureLog)
);

router.delete(
  "/:temperatureLogId",
  temperatureLogSchems.deleteTemperatureLog,
  catchWrap(controller.deleteTemperatureLog)
);

router.get(
  "/:temperatureLogId",
  temperatureLogSchems.getTemperatureLogById,
  catchWrap(controller.gettemperatureLogById)
);

router.get(
  "/",
  temperatureLogSchems.getTemperatureLogs,
  catchWrap(controller.getTemperatureLogs)
);

export default router;
