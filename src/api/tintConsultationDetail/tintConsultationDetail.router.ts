import express from "express";

import controller from "./tintConsultationDetail.controller";
import tintConsultationDetailSchems from "./tintConsultationDetail.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.post(
  "/",
  canDo("create", "tintConsultationDetail"),
  tintConsultationDetailSchems.createTintConsultationDetail,
  catchWrap(controller.createTintConsultationDetail)
);

router.put(
  "/:tintConsultationDetailId",
  canDo("update", "tintConsultationDetail"),
  tintConsultationDetailSchems.editTintConsultationDetail,
  catchWrap(controller.updateTintConsultationDetail)
);

router.delete(
  "/:tintConsultationDetailId",
  canDo("delete", "tintConsultationDetail"),
  tintConsultationDetailSchems.deleteTintConsultationDetail,
  catchWrap(controller.deleteTintConsultationDetail)
);

router.get(
  "/:tintConsultationDetailId",
  canDo("read", "tintConsultationDetail"),
  tintConsultationDetailSchems.getTintConsultationDetailById,
  catchWrap(controller.gettintConsultationDetailById)
);

router.get(
  "/",
  canDo("read", "tintConsultationDetail"),
  tintConsultationDetailSchems.getTintConsultationDetails,
  catchWrap(controller.getTintConsultationDetails)
);

export default router;
