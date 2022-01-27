import express from "express";

import controller from "./staffDocumentType.controller";
import staffDocumentTypeSchems from "./staffDocumentType.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.post(
  "/",
  canDo("create", "staffDocumentType"),
  staffDocumentTypeSchems.createStaffDocumentType,
  catchWrap(controller.createStaffDocumentType)
);

router.put(
  "/:staffDocumentTypeId",
  canDo("update", "staffDocumentType"),
  staffDocumentTypeSchems.editStaffDocumentType,
  catchWrap(controller.updateStaffDocumentType)
);

router.delete(
  "/:staffDocumentTypeId",
  canDo("delete", "staffDocumentType"),
  staffDocumentTypeSchems.deleteStaffDocumentType,
  catchWrap(controller.deleteStaffDocumentType)
);

router.get(
  "/:staffDocumentTypeId",
  canDo("read", "staffDocumentType"),
  staffDocumentTypeSchems.getStaffDocumentTypeById,
  catchWrap(controller.getstaffDocumentTypeById)
);

router.get(
  "/",
  canDo("read", "staffDocumentType"),
  staffDocumentTypeSchems.getStaffDocumentTypes,
  catchWrap(controller.getStaffDocumentTypes)
);

export default router;
