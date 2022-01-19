import express from "express";

import controller from "./transportBehaviour.controller";
import transportBehaviourSchems from "./transportBehaviour.schema";
import { catchWrap } from "../../components/errors";

const router = express.Router();

router.post(
  "/",
  transportBehaviourSchems.createTransportBehaviour,
  catchWrap(controller.createTransportBehaviour)
);

router.put(
  "/:transportBehaviourId",
  transportBehaviourSchems.editTransportBehaviour,
  catchWrap(controller.updateTransportBehaviour)
);

router.delete(
  "/:transportBehaviourId",
  transportBehaviourSchems.deleteTransportBehaviour,
  catchWrap(controller.deleteTransportBehaviour)
);

router.get(
  "/:transportBehaviourId",
  transportBehaviourSchems.getTransportBehaviourById,
  catchWrap(controller.gettransportBehaviourById)
);

router.get(
  "/",
  transportBehaviourSchems.getTransportBehaviours,
  catchWrap(controller.getTransportBehaviours)
);

export default router;
