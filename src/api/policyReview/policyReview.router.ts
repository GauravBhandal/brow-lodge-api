import express from "express";

import controller from "./policyReview.controller";
import policyReviewSchems from "./policyReview.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.post(
  "/",
  canDo("create", "policyReview"),
  policyReviewSchems.createPolicyReview,
  catchWrap(controller.createPolicyReview)
);

router.put(
  "/:policyReviewId",
  canDo("update", "policyReview"),
  policyReviewSchems.editPolicyReview,
  catchWrap(controller.updatePolicyReview)
);

router.delete(
  "/:policyReviewId",
  canDo("delete", "policyReview"),
  policyReviewSchems.deletePolicyReview,
  catchWrap(controller.deletePolicyReview)
);

router.get(
  "/:policyReviewId",
  canDo("read", "policyReview"),
  policyReviewSchems.getPolicyReviewById,
  catchWrap(controller.getpolicyReviewById)
);

router.get(
  "/",
  canDo("read", "policyReview"),
  policyReviewSchems.getPolicyReviews,
  catchWrap(controller.getPolicyReviews)
);

export default router;
