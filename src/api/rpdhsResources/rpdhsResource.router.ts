import express from "express";

import controller from "./rpdhsResource.controller";
import rpdhsResourceSchems from "./rpdhsResource.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.post(
  "/",
  canDo("create", "rpdhsResource"),
  rpdhsResourceSchems.createRpdhsResource,
  catchWrap(controller.createRpdhsResource)
);

router.put(
  "/:rpdhsResourceId",
  canDo("update", "rpdhsResource"),
  rpdhsResourceSchems.editRpdhsResource,
  catchWrap(controller.updateRpdhsResource)
);

router.put(
  "/archive/:rpdhsResourceId",
  canDo("delete", "rpdhsResource"),
  rpdhsResourceSchems.deleteRpdhsResource,
  catchWrap(controller.deleteRpdhsResource)
);

router.delete(
  "/:rpdhsResourceId",
  canDo("delete", "rpdhsResource"),
  rpdhsResourceSchems.deleteArchiveRpdhsResource,
  catchWrap(controller.deleteArchiveRpdhsResource)
);

router.get(
  "/:rpdhsResourceId",
  canDo("read", "rpdhsResource"),
  rpdhsResourceSchems.getRpdhsResourceById,
  catchWrap(controller.getrpdhsResourceById)
);

router.get(
  "/",
  canDo("read", "rpdhsResource"),
  rpdhsResourceSchems.getRpdhsResources,
  catchWrap(controller.getRpdhsResources)
);

export default router;
