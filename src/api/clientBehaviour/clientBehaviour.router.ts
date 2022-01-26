import express from "express";

import controller from "./clientBehaviour.controller";
import clientBehaviourSchems from "./clientBehaviour.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability";

const router = express.Router();

router.post(
  "/",
  canDo("create", "clientBehaviour"),
  clientBehaviourSchems.createClientBehaviour,
  catchWrap(controller.createClientBehaviour)
);

router.put(
  "/:clientBehaviourId",
  canDo("update", "clientBehaviour"),
  clientBehaviourSchems.editClientBehaviour,
  catchWrap(controller.updateClientBehaviour)
);

router.delete(
  "/:clientBehaviourId",
  canDo("delete", "clientBehaviour"),
  clientBehaviourSchems.deleteClientBehaviour,
  catchWrap(controller.deleteClientBehaviour)
);

router.get(
  "/:clientBehaviourId",
  canDo("read", "clientBehaviour"),
  clientBehaviourSchems.getClientBehaviourById,
  catchWrap(controller.getclientBehaviourById)
);

router.get(
  "/",
  canDo("read", "clientBehaviour"),
  clientBehaviourSchems.getClientBehaviours,
  catchWrap(controller.getClientBehaviours)
);

export default router;
