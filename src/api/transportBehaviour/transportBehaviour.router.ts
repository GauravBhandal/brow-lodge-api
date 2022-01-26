import express from "express";

import controller from "./transportBehaviour.controller";
import transportBehaviourSchems from "./transportBehaviour.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability";

const router = express.Router();

router.post(
  "/",
  canDo("create", "transportBehaviour"),
  transportBehaviourSchems.createTransportBehaviour,
  catchWrap(controller.createTransportBehaviour)
);

router.put(
  "/:transportBehaviourId",
  canDo("update", "transportBehaviour"),
  transportBehaviourSchems.editTransportBehaviour,
  catchWrap(controller.updateTransportBehaviour)
);

router.delete(
  "/:transportBehaviourId",
  canDo("delete", "transportBehaviour"),
  transportBehaviourSchems.deleteTransportBehaviour,
  catchWrap(controller.deleteTransportBehaviour)
);

router.get(
  "/:transportBehaviourId",
  canDo("read", "transportBehaviour"),
  transportBehaviourSchems.getTransportBehaviourById,
  catchWrap(controller.gettransportBehaviourById)
);

router.get(
  "/",
  canDo("read", "sleepLog"),
  transportBehaviourSchems.getTransportBehaviours,
  catchWrap(controller.getTransportBehaviours)
);

export default router;
