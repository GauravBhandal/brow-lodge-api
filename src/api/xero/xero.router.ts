import express from "express";

import controller from "./xero.controller";
import xeroSchemas from "./xero.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.post(
  "/connect",
  canDo("update", "integration"),
  catchWrap(controller.connectXero)
);

router.delete(
  "/disconnect",
  canDo("update", "integration"),
  catchWrap(controller.disconnectXero)
);

router.get(
  "/is-connected",
  canDo("read", "integration"),
  catchWrap(controller.isConnectedToXero)
);

router.put(
  "/callback",
  canDo("update", "integration"),
  xeroSchemas.callbackXero,
  catchWrap(controller.callbackXero)
);

router.get(
  "/customers",
  canDo("read", "integration"), // TODO: Fix permissions in this file
  catchWrap(controller.getXeroCustomers)
);

router.get(
  "/employees",
  canDo("read", "integration"),
  catchWrap(controller.getXeroEmployees)
);

router.get(
  "/pay-items",
  canDo("read", "integration"),
  catchWrap(controller.getPayItems)
);

export default router;
