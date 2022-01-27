import express from "express";

import controller from "./staffDocument.controller";
import staffDocumentSchems from "./staffDocument.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.post(
  "/",
  canDo("create", "staffDocument"),
  staffDocumentSchems.createStaffDocument,
  catchWrap(controller.createStaffDocument)
);

router.put(
  "/:staffDocumentId",
  canDo("update", "staffDocument"),
  staffDocumentSchems.editStaffDocument,
  catchWrap(controller.updateStaffDocument)
);

router.delete(
  "/:staffDocumentId",
  canDo("delete", "staffDocument"),
  staffDocumentSchems.deleteStaffDocument,
  catchWrap(controller.deleteStaffDocument)
);

router.get(
  "/:staffDocumentId",
  canDo("read", "staffDocument"),
  staffDocumentSchems.getStaffDocumentById,
  catchWrap(controller.getstaffDocumentById)
);

router.get(
  "/",
  canDo("read", "staffDocument"),
  staffDocumentSchems.getStaffDocuments,
  catchWrap(controller.getStaffDocuments)
);

export default router;
