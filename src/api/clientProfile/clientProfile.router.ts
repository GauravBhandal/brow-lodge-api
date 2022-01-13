import express from "express";

import controller from "./clientProfile.controller";
import clientProfileSchems from "./clientProfile.schema";
import { catchWrap } from "../../components/errors";
import authMiddleware from "../../components/auth";

const router = express.Router();

router.use(authMiddleware);

router.post(
  "/",
  clientProfileSchems.createClientProfile,
  catchWrap(controller.createClientProfile)
);

router.put(
  "/:clientProfileId",
  clientProfileSchems.editClientProfile,
  catchWrap(controller.updateClientProfile)
);

router.delete(
  "/:clientProfileId",
  clientProfileSchems.deleteClientProfile,
  catchWrap(controller.deleteClientProfile)
);

router.get(
  "/:clientProfileId",
  clientProfileSchems.getClientProfileById,
  catchWrap(controller.getclientProfileById)
);

router.get(
  "/",
  clientProfileSchems.getClientProfiles,
  catchWrap(controller.getClientProfiles)
);

export default router;
