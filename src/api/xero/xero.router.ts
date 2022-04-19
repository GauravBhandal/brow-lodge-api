import express from "express";

import controller from "./xero.controller";
import xeroSchemas from "./xero.schema";
import { catchWrap } from "../../components/errors";

const router = express.Router();

router.post("/connect", catchWrap(controller.connectXero));

router.put(
  "/callback",
  xeroSchemas.callbackXero,
  catchWrap(controller.callbackXero)
);

router.get("/customers", catchWrap(controller.getCustomers));
export default router;
