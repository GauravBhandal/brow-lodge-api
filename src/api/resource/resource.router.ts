import express from "express";

import controller from "./resource.controller";
import resourceSchems from "./resource.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";
const router = express.Router();

router.post(
  "/",
  canDo("create", "resource"),
  resourceSchems.createResource,
  catchWrap(controller.createResource)
);

router.put(
  "/:resourceId",
  canDo("update", "resource"),
  resourceSchems.editResource,
  catchWrap(controller.updateResource)
);

router.delete(
  "/:resourceId",
  canDo("delete", "resource"),
  resourceSchems.deleteResource,
  catchWrap(controller.deleteResource)
);

router.get(
  "/:resourceId",
  canDo("read", "resource"),
  resourceSchems.getResourceById,
  catchWrap(controller.getresourceById)
);

router.get(
  "/",
  canDo("read", "resource"),
  resourceSchems.getResources,
  catchWrap(controller.getResources)
);

export default router;
