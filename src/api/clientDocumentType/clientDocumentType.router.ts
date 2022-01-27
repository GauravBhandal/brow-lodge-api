import express from "express";

import controller from "./clientDocumentType.controller";
import clientDocumentTypeSchems from "./clientDocumentType.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.post(
  "/",
  canDo("create", "clientDocumentType"),
  clientDocumentTypeSchems.createClientDocumentType,
  catchWrap(controller.createClientDocumentType)
);

router.put(
  "/:clientDocumentTypeId",
  canDo("update", "clientDocumentType"),
  clientDocumentTypeSchems.editClientDocumentType,
  catchWrap(controller.updateClientDocumentType)
);

router.delete(
  "/:clientDocumentTypeId",
  canDo("delete", "clientDocumentType"),
  clientDocumentTypeSchems.deleteClientDocumentType,
  catchWrap(controller.deleteClientDocumentType)
);

router.get(
  "/:clientDocumentTypeId",
  canDo("read", "clientDocumentType"),
  clientDocumentTypeSchems.getClientDocumentTypeById,
  catchWrap(controller.getclientDocumentTypeById)
);

router.get(
  "/",
  canDo("read", "clientDocumentType"),
  clientDocumentTypeSchems.getClientDocumentTypes,
  catchWrap(controller.getClientDocumentTypes)
);

export default router;
