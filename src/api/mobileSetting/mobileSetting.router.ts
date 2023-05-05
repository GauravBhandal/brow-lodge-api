import express from "express";

import controller from "./mobileSetting.controller";
import mobileSettingSchems from "./mobileSetting.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.put(
  "/",
  canDo("update", "mobileSetting"),
  mobileSettingSchems.editMobileSetting,
  catchWrap(controller.updateMobileSetting)
);

router.get(
  "/",
  canDo("read", "mobileSetting"),
  catchWrap(controller.getMobileSettings)
);

export default router;
