import express from "express";

import controller from "./waxConsultationDetail.controller";
import waxConsultationDetailSchems from "./waxConsultationDetail.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.post(
  "/",
  canDo("create", "waxConsultationDetail"),
  waxConsultationDetailSchems.createWaxConsultationDetail,
  catchWrap(controller.createWaxConsultationDetail)
);

router.put(
  "/:waxConsultationDetailId",
  canDo("update", "waxConsultationDetail"),
  waxConsultationDetailSchems.editWaxConsultationDetail,
  catchWrap(controller.updateWaxConsultationDetail)
);

router.delete(
  "/:waxConsultationDetailId",
  canDo("delete", "waxConsultationDetail"),
  waxConsultationDetailSchems.deleteWaxConsultationDetail,
  catchWrap(controller.deleteWaxConsultationDetail)
);

router.get(
  "/:waxConsultationDetailId",
  canDo("read", "waxConsultationDetail"),
  waxConsultationDetailSchems.getWaxConsultationDetailById,
  catchWrap(controller.getwaxConsultationDetailById)
);

router.get(
  "/",
  canDo("read", "waxConsultationDetail"),
  waxConsultationDetailSchems.getWaxConsultationDetails,
  catchWrap(controller.getWaxConsultationDetails)
);

export default router;
