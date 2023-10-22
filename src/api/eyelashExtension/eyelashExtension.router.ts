import express from "express";

import controller from "./eyelashExtension.controller";
import eyelashExtensionSchems from "./eyelashExtension.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.post(
  "/",
  canDo("create", "eyelashExtension"),
  eyelashExtensionSchems.createEyelashExtension,
  catchWrap(controller.createEyelashExtension)
);

router.put(
  "/:eyelashExtensionId",
  canDo("update", "eyelashExtension"),
  eyelashExtensionSchems.editEyelashExtension,
  catchWrap(controller.updateEyelashExtension)
);

router.delete(
  "/:eyelashExtensionId",
  canDo("delete", "eyelashExtension"),
  eyelashExtensionSchems.deleteEyelashExtension,
  catchWrap(controller.deleteEyelashExtension)
);

router.get(
  "/:eyelashExtensionId",
  canDo("read", "eyelashExtension"),
  eyelashExtensionSchems.getEyelashExtensionById,
  catchWrap(controller.geteyelashExtensionById)
);

router.get(
  "/",
  // canDo("read", "eyelashExtension"), TODO: Need to allow user to create document
  eyelashExtensionSchems.getEyelashExtensions,
  catchWrap(controller.getEyelashExtensions)
);

export default router;
