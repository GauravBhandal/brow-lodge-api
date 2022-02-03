import express from "express";

import controller from "./staffDocumentCategory.controller";
import staffDocumentCategorySchems from "./staffDocumentCategory.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.post(
  "/",
  canDo("create", "staffDocumentCategory"),
  staffDocumentCategorySchems.createStaffDocumentCategory,
  catchWrap(controller.createStaffDocumentCategory)
);

router.put(
  "/:staffDocumentCategoryId",
  canDo("update", "staffDocumentCategory"),
  staffDocumentCategorySchems.editStaffDocumentCategory,
  catchWrap(controller.updateStaffDocumentCategory)
);

router.delete(
  "/:staffDocumentCategoryId",
  canDo("delete", "staffDocumentCategory"),
  staffDocumentCategorySchems.deleteStaffDocumentCategory,
  catchWrap(controller.deleteStaffDocumentCategory)
);

router.get(
  "/:staffDocumentCategoryId",
  canDo("read", "staffDocumentCategory"),
  staffDocumentCategorySchems.getStaffDocumentCategoryById,
  catchWrap(controller.getstaffDocumentCategoryById)
);

router.get(
  "/",
  // canDo("read", "staffDocumentCategory"), TODO: Need to allow user to create document
  staffDocumentCategorySchems.getStaffDocumentCategorys,
  catchWrap(controller.getStaffDocumentCategorys)
);

export default router;
