import express from "express";

import controller from "./clientProfile.controller";
import clientProfileSchems from "./clientProfile.schema";
import { catchWrap } from "../../components/errors";

const router = express.Router();

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
