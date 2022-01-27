import express from "express";

import controller from "./staffProfile.controller";
import staffProfileSchems from "./staffProfile.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.post(
  "/",
  canDo("create", "staffProfile"),
  staffProfileSchems.createStaffProfile,
  catchWrap(controller.createStaffProfile)
);

router.put(
  "/:staffProfileId",
  canDo("update", "staffProfile"),
  staffProfileSchems.editStaffProfile,
  catchWrap(controller.updateStaffProfile)
);

router.delete(
  "/:staffProfileId",
  canDo("delete", "staffProfile"),
  staffProfileSchems.deleteStaffProfile,
  catchWrap(controller.deleteStaffProfile)
);

router.get(
  "/:staffProfileId",
  canDo("read", "staffProfile"),
  staffProfileSchems.getStaffProfileById,
  catchWrap(controller.getstaffProfileById)
);

router.get(
  "/",
  // canDo("read", "staffProfile"), TODO: Every user need to make a GET request
  staffProfileSchems.getStaffProfiles,
  catchWrap(controller.getStaffProfiles)
);

export default router;
