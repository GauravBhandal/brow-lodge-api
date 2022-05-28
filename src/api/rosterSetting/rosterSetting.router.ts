import express from "express";

import controller from "./rosterSetting.controller";
import rosterSettingSchems from "./rosterSetting.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.put(
  "/",
  canDo("update", "rosterSetting"),
  rosterSettingSchems.editRosterSetting,
  catchWrap(controller.updateRosterSetting)
);

router.get(
  "/",
  canDo("read", "rosterSetting"),
  catchWrap(controller.getrosterSettingById)
);

export default router;
