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

router.put(
  "/callback",
  canDo("update", "integration"),
  xeroSchemas.callbackXero,
  catchWrap(controller.callbackXero)
);

router.get(
  "/customers",
  canDo("update", "clientProfile"),
  catchWrap(controller.getCustomers)
);
export default router;
