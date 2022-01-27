import express from "express";

import controller from "./feedback.controller";
import feedbackSchems from "./feedback.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.post(
  "/",
  canDo("create", "feedback"),
  feedbackSchems.createFeedback,
  catchWrap(controller.createFeedback)
);

router.put(
  "/:feedbackId",
  canDo("update", "feedback"),
  feedbackSchems.editFeedback,
  catchWrap(controller.updateFeedback)
);

router.delete(
  "/:feedbackId",
  canDo("delete", "feedback"),
  feedbackSchems.deleteFeedback,
  catchWrap(controller.deleteFeedback)
);

router.get(
  "/:feedbackId",
  canDo("read", "feedback"),
  feedbackSchems.getFeedbackById,
  catchWrap(controller.getfeedbackById)
);

router.get(
  "/",
  canDo("read", "feedback"),
  feedbackSchems.getFeedbacks,
  catchWrap(controller.getFeedbacks)
);

export default router;
