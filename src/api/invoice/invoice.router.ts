import express from "express";

import controller from "./invoice.controller";
import invoiceSchems from "./invoice.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.post(
  "/",
  canDo("update", "invoice"),
  invoiceSchems.generateInvoices,
  catchWrap(controller.generateInvoices)
);

router.put(
  "/publish",
  canDo("update", "invoice"),
  invoiceSchems.publishGenerateInvoices,
  catchWrap(controller.publishGenerateInvoices)
);

router.put(
  "/status",
  canDo("update", "invoice"),
  invoiceSchems.updateInvoiceStatus,
  catchWrap(controller.updateInvoiceStatus)
);

router.put(
  "/:invoiceId",
  canDo("update", "invoice"),
  invoiceSchems.editInvoice,
  catchWrap(controller.updateInvoice)
);

router.get(
  "/:invoiceId",
  canDo("read", "invoice"),
  invoiceSchems.getInvoiceById,
  catchWrap(controller.getInvoiceById)
);

router.get(
  "/",
  canDo("read", "invoice"),
  invoiceSchems.getInvoices,
  catchWrap(controller.getInvoices)
);

export default router;
