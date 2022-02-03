import express from "express";

import controller from "./clientDocumentCategory.controller";
import clientDocumentCategorySchems from "./clientDocumentCategory.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.post(
  "/",
  canDo("create", "clientDocumentCategory"),
  clientDocumentCategorySchems.createClientDocumentCategory,
  catchWrap(controller.createClientDocumentCategory)
);

router.put(
  "/:clientDocumentCategoryId",
  canDo("update", "clientDocumentCategory"),
  clientDocumentCategorySchems.editClientDocumentCategory,
  catchWrap(controller.updateClientDocumentCategory)
);

router.delete(
  "/:clientDocumentCategoryId",
  canDo("delete", "clientDocumentCategory"),
  clientDocumentCategorySchems.deleteClientDocumentCategory,
  catchWrap(controller.deleteClientDocumentCategory)
);

router.get(
  "/:clientDocumentCategoryId",
  canDo("read", "clientDocumentCategory"),
  clientDocumentCategorySchems.getClientDocumentCategoryById,
  catchWrap(controller.getclientDocumentCategoryById)
);

router.get(
  "/",
  // canDo("read", "clientDocumentCategory"), TODO: Need to allow user to create document
  clientDocumentCategorySchems.getClientDocumentCategorys,
  catchWrap(controller.getClientDocumentCategorys)
);

export default router;
