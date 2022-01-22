import express from "express";

import controller from "./resource.controller";
import resourceSchems from "./resource.schema";
import { catchWrap } from "../../components/errors";

const router = express.Router();

router.post(
  "/",
  resourceSchems.createResource,
  catchWrap(controller.createResource)
);

router.put(
  "/:resourceId",
  resourceSchems.editResource,
  catchWrap(controller.updateResource)
);

router.delete(
  "/:resourceId",
  resourceSchems.deleteResource,
  catchWrap(controller.deleteResource)
);

router.get(
  "/:resourceId",
  resourceSchems.getResourceById,
  catchWrap(controller.getresourceById)
);

router.get(
  "/",
  resourceSchems.getResources,
  catchWrap(controller.getResources)
);

export default router;
