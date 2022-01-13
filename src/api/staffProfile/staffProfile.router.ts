import express from "express";

import controller from "./staffProfile.controller";
import staffProfileSchems from "./staffProfile.schema";
import { catchWrap } from "../../components/errors";
import authMiddleware from "../../components/auth";

const router = express.Router();

router.use(authMiddleware);

router.post(
  "/",
  staffProfileSchems.createStaffProfile,
  catchWrap(controller.createStaffProfile)
);

router.put(
  "/:staffProfileId",
  staffProfileSchems.editStaffProfile,
  catchWrap(controller.updateStaffProfile)
);

router.delete(
  "/:staffProfileId",
  staffProfileSchems.deleteStaffProfile,
  catchWrap(controller.deleteStaffProfile)
);

router.get(
  "/:staffProfileId",
  staffProfileSchems.getStaffProfileById,
  catchWrap(controller.getstaffProfileById)
);

router.get(
  "/",
  staffProfileSchems.getStaffProfiles,
  catchWrap(controller.getStaffProfiles)
);

export default router;
