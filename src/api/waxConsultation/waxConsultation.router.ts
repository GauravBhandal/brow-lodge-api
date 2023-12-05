import express from "express";

import controller from "./waxConsultation.controller";
import waxConsultationSchems from "./waxConsultation.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.post(
  "/",
  canDo("create", "waxConsultation"),
  waxConsultationSchems.createWaxConsultation,
  catchWrap(controller.createWaxConsultation)
);

router.put(
  "/:waxConsultationId",
  canDo("update", "waxConsultation"),
  waxConsultationSchems.editWaxConsultation,
  catchWrap(controller.updateWaxConsultation)
);

router.delete(
  "/:waxConsultationId",
  canDo("delete", "waxConsultation"),
  waxConsultationSchems.deleteWaxConsultation,
  catchWrap(controller.deleteWaxConsultation)
);

router.get(
  "/:waxConsultationId",
  canDo("read", "waxConsultation"),
  waxConsultationSchems.getWaxConsultationById,
  catchWrap(controller.getwaxConsultationById)
);

router.get(
  "/",
  // canDo("read", "waxConsultation"), TODO: Need to allow user to create document
  waxConsultationSchems.getWaxConsultations,
  catchWrap(controller.getWaxConsultations)
);

export default router;
