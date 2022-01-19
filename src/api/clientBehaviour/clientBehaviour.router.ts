import express from "express";

import controller from "./clientBehaviour.controller";
import clientBehaviourSchems from "./clientBehaviour.schema";
import { catchWrap } from "../../components/errors";

const router = express.Router();

router.post(
  "/",
  clientBehaviourSchems.createClientBehaviour,
  catchWrap(controller.createClientBehaviour)
);

router.put(
  "/:clientBehaviourId",
  clientBehaviourSchems.editClientBehaviour,
  catchWrap(controller.updateClientBehaviour)
);

router.delete(
  "/:clientBehaviourId",
  clientBehaviourSchems.deleteClientBehaviour,
  catchWrap(controller.deleteClientBehaviour)
);

router.get(
  "/:clientBehaviourId",
  clientBehaviourSchems.getClientBehaviourById,
  catchWrap(controller.getclientBehaviourById)
);

router.get(
  "/",
  clientBehaviourSchems.getClientBehaviours,
  catchWrap(controller.getClientBehaviours)
);

export default router;
