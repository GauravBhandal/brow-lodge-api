import express from "express";

import controller from "./externalContract.controller";
import externalContractSchems from "./externalContract.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.post(
  "/",
  canDo("create", "externalContract"),
  externalContractSchems.createExternalContract,
  catchWrap(controller.createExternalContract)
);

router.put(
  "/:externalContractId",
  canDo("update", "externalContract"),
  externalContractSchems.editExternalContract,
  catchWrap(controller.updateExternalContract)
);

router.put(
  "/archive/:externalContractId",
  canDo("delete", "externalContract"),
  externalContractSchems.deleteArchiveExternalContract,
  catchWrap(controller.deleteArchiveExternalContract)
);

router.delete(
  "/:externalContractId",
  canDo("delete", "externalContract"),
  externalContractSchems.deleteExternalContract,
  catchWrap(controller.deleteExternalContract)
);

router.get(
  "/:externalContractId",
  canDo("read", "externalContract"),
  externalContractSchems.getExternalContractById,
  catchWrap(controller.getexternalContractById)
);

router.get(
  "/",
  canDo("read", "externalContract"),
  externalContractSchems.getExternalContracts,
  catchWrap(controller.getExternalContracts)
);

export default router;
