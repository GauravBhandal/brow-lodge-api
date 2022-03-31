import express from "express";

import controller from "./policy.controller";
import policySchems from "./policy.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.post(
  "/",
  canDo("create", "policy"),
  policySchems.createPolicy,
  catchWrap(controller.createPolicy)
);

router.put(
  "/:policyId",
  canDo("update", "policy"),
  policySchems.editPolicy,
  catchWrap(controller.updatePolicy)
);

router.delete(
  "/:policyId",
  canDo("delete", "policy"),
  policySchems.deletePolicy,
  catchWrap(controller.deletePolicy)
);

router.get(
  "/:policyId",
  canDo("read", "policy"),
  policySchems.getPolicyById,
  catchWrap(controller.getpolicyById)
);

router.get(
  "/",
  canDo("read", "policy"),
  policySchems.getPolicies,
  catchWrap(controller.getPolicies)
);

export default router;
