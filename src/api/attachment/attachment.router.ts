import express from "express";

import controller from "./attachment.controller";
import attachmentSchems from "./attachment.schema";
import { catchWrap } from "../../components/errors";
import uploadMiddleware from "../../components/upload";
import { canDo } from "../../components/ability";

const router = express.Router();

router.post(
  "/",
  canDo("create", "attachment"),
  uploadMiddleware,
  catchWrap(controller.createAttachment)
);

router.delete(
  "/:attachmentId",
  canDo("delete", "attachment"),
  attachmentSchems.deleteAttachment,
  catchWrap(controller.deleteAttachment)
);

router.get(
  "/:attachmentId",
  canDo("read", "attachment"),
  attachmentSchems.getAttachmentById,
  catchWrap(controller.getattachmentById)
);

export default router;
