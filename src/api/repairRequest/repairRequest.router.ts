import express from "express";

import controller from "./repairRequest.controller";
import repairRequestSchems from "./repairRequest.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.post(
  "/",
  canDo("create", "repairRequest"),
  repairRequestSchems.createRepairRequest,
  catchWrap(controller.createRepairRequest)
);

router.put(
  "/:repairRequestId",
  canDo("update", "repairRequest"),
  repairRequestSchems.editRepairRequest,
  catchWrap(controller.updateRepairRequest)
);

router.put(
  "/archive/:repairRequestId",
  canDo("delete", "repairRequest"),
  repairRequestSchems.deleteArchiveRepairRequest,
  catchWrap(controller.deleteArchiveRepairRequest)
);

router.delete(
  "/:repairRequestId",
  canDo("delete", "repairRequest"),
  repairRequestSchems.deleteRepairRequest,
  catchWrap(controller.deleteRepairRequest)
);

router.get(
  "/:repairRequestId",
  canDo("read", "repairRequest"),
  repairRequestSchems.getRepairRequestById,
  catchWrap(controller.getrepairRequestById)
);

router.get(
  "/",
  canDo("read", "repairRequest"),
  repairRequestSchems.getRepairRequests,
  catchWrap(controller.getRepairRequests)
);

export default router;
