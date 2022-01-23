import express from "express";

import controller from "./feedback.controller";
import feedbackSchems from "./feedback.schema";
import { catchWrap } from "../../components/errors";

const router = express.Router();

router.post(
  "/",
  feedbackSchems.createFeedback,
  catchWrap(controller.createFeedback)
);

router.put(
  "/:feedbackId",
  feedbackSchems.editFeedback,
  catchWrap(controller.updateFeedback)
);

router.delete(
  "/:feedbackId",
  feedbackSchems.deleteFeedback,
  catchWrap(controller.deleteFeedback)
);

router.get(
  "/:feedbackId",
  feedbackSchems.getFeedbackById,
  catchWrap(controller.getfeedbackById)
);

router.get(
  "/",
  feedbackSchems.getFeedbacks,
  catchWrap(controller.getFeedbacks)
);

export default router;
