import express from "express";

import controller from "./attachment.controller";
import attachmentSchems from "./attachment.schema";
import { catchWrap } from "../../components/errors";
import uploadMiddleware from "../../components/upload";

const router = express.Router();

router.post("/", uploadMiddleware, catchWrap(controller.createAttachment));

router.delete(
  "/:attachmentId",
  attachmentSchems.deleteAttachment,
  catchWrap(controller.deleteAttachment)
);

router.get(
  "/:attachmentId",
  attachmentSchems.getAttachmentById,
  catchWrap(controller.getattachmentById)
);

export default router;
