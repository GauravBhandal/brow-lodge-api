import express from "express";

import controller from "./clientProfile.controller";
import clientProfileSchems from "./clientProfile.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.post(
  "/",
  canDo("create", "clientProfile"),
  clientProfileSchems.createClientProfile,
  catchWrap(controller.createClientProfile)
);

router.put(
  "/:clientProfileId",
  canDo("update", "clientProfile"),
  clientProfileSchems.editClientProfile,
  catchWrap(controller.updateClientProfile)
);

router.delete(
  "/:clientProfileId",
  canDo("delete", "clientProfile"),
  clientProfileSchems.deleteClientProfile,
  catchWrap(controller.deleteClientProfile)
);

router.get(
  "/:clientProfileId",
  canDo("read", "clientProfile"),
  clientProfileSchems.getClientProfileById,
  catchWrap(controller.getclientProfileById)
);

router.get(
  "/",
  canDo("read", "clientProfile"),
  clientProfileSchems.getClientProfiles,
  catchWrap(controller.getClientProfiles)
);

export default router;
