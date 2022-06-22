import express from "express";

import controller from "./xero.controller";
import xeroSchemas from "./xero.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.post(
  "/connect",
  canDo("update", "rosterSetting"),
  catchWrap(controller.connectXero)
);

router.delete(
  "/disconnect",
  canDo("update", "rosterSetting"),
  catchWrap(controller.disconnectXero)
);

router.get(
  "/is-connected",
  // canDo("read", "rosterSetting"), // We need to call this on different pages
  catchWrap(controller.isConnectedToXero)
);

router.put(
  "/callback",
  canDo("update", "rosterSetting"),
  xeroSchemas.callbackXero,
  catchWrap(controller.callbackXero)
);

router.get(
  "/customers",
  canDo("read", "clientProfile"),
  catchWrap(controller.getXeroCustomers)
);

router.get(
  "/employees",
  canDo("read", "staffProfile"),
  catchWrap(controller.getXeroEmployees)
);

router.get(
  "/pay-items",
  canDo("read", "rosterSetting"),
  catchWrap(controller.getPayItems)
);

router.post(
  "/sync/employees",
  canDo("update", "staffProfile"),
  catchWrap(controller.syncXeroEmployees)
);

router.post(
  "/sync/customers",
  canDo("update", "clientProfile"),
  catchWrap(controller.syncXeroCustomers)
);

router.post(
  "/sync/pay-items",
  canDo("update", "rosterSetting"),
  catchWrap(controller.syncXeroPayItems)
);

export default router;
