import express from "express";

import controller from "./repairRequest.controller";
import repairRequestSchems from "./repairRequest.schema";
import { catchWrap } from "../../components/errors";

const router = express.Router();

router.post(
  "/",
  repairRequestSchems.createRepairRequest,
  catchWrap(controller.createRepairRequest)
);

router.put(
  "/:repairRequestId",
  repairRequestSchems.editRepairRequest,
  catchWrap(controller.updateRepairRequest)
);

router.delete(
  "/:repairRequestId",
  repairRequestSchems.deleteRepairRequest,
  catchWrap(controller.deleteRepairRequest)
);

router.get(
  "/:repairRequestId",
  repairRequestSchems.getRepairRequestById,
  catchWrap(controller.getrepairRequestById)
);

router.get(
  "/",
  repairRequestSchems.getRepairRequests,
  catchWrap(controller.getRepairRequests)
);

export default router;
