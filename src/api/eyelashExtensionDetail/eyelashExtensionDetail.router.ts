import express from "express";

import controller from "./eyelashExtensionDetail.controller";
import eyelashExtensionDetailSchems from "./eyelashExtensionDetail.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.post(
  "/",
  canDo("create", "eyelashExtensionDetail"),
  eyelashExtensionDetailSchems.createEyelashExtensionDetail,
  catchWrap(controller.createEyelashExtensionDetail)
);

router.put(
  "/:eyelashExtensionDetailId",
  canDo("update", "eyelashExtensionDetail"),
  eyelashExtensionDetailSchems.editEyelashExtensionDetail,
  catchWrap(controller.updateEyelashExtensionDetail)
);

router.delete(
  "/:eyelashExtensionDetailId",
  canDo("delete", "eyelashExtensionDetail"),
  eyelashExtensionDetailSchems.deleteEyelashExtensionDetail,
  catchWrap(controller.deleteEyelashExtensionDetail)
);

router.get(
  "/:eyelashExtensionDetailId",
  canDo("read", "eyelashExtensionDetail"),
  eyelashExtensionDetailSchems.getEyelashExtensionDetailById,
  catchWrap(controller.geteyelashExtensionDetailById)
);

router.get(
  "/",
  canDo("read", "eyelashExtensionDetail"),
  eyelashExtensionDetailSchems.getEyelashExtensionDetails,
  catchWrap(controller.getEyelashExtensionDetails)
);

export default router;
