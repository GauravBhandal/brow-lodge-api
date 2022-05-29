import express from "express";

import controller from "./clientDocument.controller";
import clientDocumentSchems from "./clientDocument.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.post(
  "/",
  canDo("create", "clientDocument"),
  clientDocumentSchems.createClientDocument,
  catchWrap(controller.createClientDocument)
);

router.put(
  "/:clientDocumentId",
  canDo("update", "clientDocument"),
  clientDocumentSchems.editClientDocument,
  catchWrap(controller.updateClientDocument)
);

router.put(
  "/archive/:clientDocumentId",
  canDo("delete", "clientDocument"),
  clientDocumentSchems.deleteClientDocument,
  catchWrap(controller.deleteClientDocument)
);

router.get(
  "/:clientDocumentId",
  canDo("read", "clientDocument"),
  clientDocumentSchems.getClientDocumentById,
  catchWrap(controller.getclientDocumentById)
);

router.get(
  "/",
  canDo("read", "clientDocument"),
  clientDocumentSchems.getClientDocuments,
  catchWrap(controller.getClientDocuments)
);

export default router;
