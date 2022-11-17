import express from "express";

import controller from "./template.controller";
import templateSchems from "./template.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.post(
  "/",
  canDo("create", "template"),
  templateSchems.createTemplate,
  catchWrap(controller.createTemplate)
);

router.put(
  "/:templateId",
  canDo("update", "template"),
  templateSchems.editTemplate,
  catchWrap(controller.updateTemplate)
);

router.put(
  "/archive/:templateId",
  canDo("delete", "template"),
  templateSchems.deleteTemplate,
  catchWrap(controller.deleteTemplate)
);

router.get(
  "/:templateId",
  canDo("read", "template"),
  templateSchems.getTemplateById,
  catchWrap(controller.gettemplateById)
);

router.get(
  "/",
  canDo("read", "template"),
  templateSchems.getTemplates,
  catchWrap(controller.getTemplates)
);

export default router;
