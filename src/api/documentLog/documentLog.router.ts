import express from "express";

import controller from "./documentLog.controller";
import documentLogSchems from "./documentLog.schema";
import { catchWrap } from "../../components/errors";
import uploadMiddleware from "../../components/upload";

const router = express.Router();

router.post("/", uploadMiddleware, catchWrap(controller.createDocumentLog));

router.delete(
  "/:documentLogId",
  documentLogSchems.deleteDocumentLog,
  catchWrap(controller.deleteDocumentLog)
);

router.get(
  "/:documentLogId",
  documentLogSchems.getDocumentLogById,
  catchWrap(controller.getdocumentLogById)
);

export default router;
