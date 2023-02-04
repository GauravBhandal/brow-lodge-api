import express from "express";

import controller from "./site.controller";
import siteSchems from "./site.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.get(
  "/clientProfiles",
  canDo("create", "site"),
  siteSchems.getSiteClientProfiles,
  catchWrap(controller.getSiteClientProfiles)
);

router.post(
  "/",
  canDo("create", "site"),
  siteSchems.createSite,
  catchWrap(controller.createSite)
);

router.put(
  "/:siteId",
  canDo("update", "site"),
  siteSchems.editSite,
  catchWrap(controller.updateSite)
);

router.delete(
  "/:siteId",
  canDo("delete", "site"),
  siteSchems.deleteSite,
  catchWrap(controller.deleteSite)
);

router.get(
  "/:siteId",
  canDo("read", "site"),
  siteSchems.getSiteById,
  catchWrap(controller.getsiteById)
);

router.get(
  "/",
  // canDo("read", "site"), TODO: Every user need to make a GET request
  siteSchems.getSites,
  catchWrap(controller.getSites)
);

export default router;
