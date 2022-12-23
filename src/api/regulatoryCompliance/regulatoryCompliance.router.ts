import express from "express";

import controller from "./regulatoryCompliance.controller";
import regulatoryComplianceSchems from "./regulatoryCompliance.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.post(
  "/",
  canDo("create", "regulatoryCompliance"),
  regulatoryComplianceSchems.createRegulatoryCompliance,
  catchWrap(controller.createRegulatoryCompliance)
);

router.put(
  "/:regulatoryComplianceId",
  canDo("update", "regulatoryCompliance"),
  regulatoryComplianceSchems.editRegulatoryCompliance,
  catchWrap(controller.updateRegulatoryCompliance)
);

router.put(
  "/archive/:regulatoryComplianceId",
  canDo("delete", "regulatoryCompliance"),
  regulatoryComplianceSchems.deleteArchiveRegulatoryCompliance,
  catchWrap(controller.deleteArchiveRegulatoryCompliance)
);

router.delete(
  "/:regulatoryComplianceId",
  canDo("delete", "regulatoryCompliance"),
  regulatoryComplianceSchems.deleteRegulatoryCompliance,
  catchWrap(controller.deleteRegulatoryCompliance)
);

router.get(
  "/:regulatoryComplianceId",
  canDo("read", "regulatoryCompliance"),
  regulatoryComplianceSchems.getRegulatoryComplianceById,
  catchWrap(controller.getregulatoryComplianceById)
);

router.get(
  "/",
  canDo("read", "regulatoryCompliance"),
  regulatoryComplianceSchems.getRegulatoryCompliances,
  catchWrap(controller.getRegulatoryCompliances)
);

export default router;
