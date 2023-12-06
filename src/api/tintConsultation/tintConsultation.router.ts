import express from "express";

import controller from "./tintConsultation.controller";
import tintConsultationSchems from "./tintConsultation.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.post(
  "/",
  canDo("create", "tintConsultation"),
  tintConsultationSchems.createTintConsultation,
  catchWrap(controller.createTintConsultation)
);

router.put(
  "/:tintConsultationId",
  canDo("update", "tintConsultation"),
  tintConsultationSchems.editTintConsultation,
  catchWrap(controller.updateTintConsultation)
);

router.delete(
  "/:tintConsultationId",
  canDo("delete", "tintConsultation"),
  tintConsultationSchems.deleteTintConsultation,
  catchWrap(controller.deleteTintConsultation)
);

router.get(
  "/:tintConsultationId",
  canDo("read", "tintConsultation"),
  tintConsultationSchems.getTintConsultationById,
  catchWrap(controller.gettintConsultationById)
);

router.get(
  "/",
  // canDo("read", "tintConsultation"), TODO: Need to allow user to create document
  tintConsultationSchems.getTintConsultations,
  catchWrap(controller.getTintConsultations)
);

export default router;
