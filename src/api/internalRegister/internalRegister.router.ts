import express from "express";

import controller from "./internalRegister.controller";
import internalRegisterSchems from "./internalRegister.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.post(
  "/",
  canDo("create", "internalRegister"),
  internalRegisterSchems.createInternalRegister,
  catchWrap(controller.createInternalRegister)
);

router.put(
  "/:internalRegisterId",
  canDo("update", "internalRegister"),
  internalRegisterSchems.editInternalRegister,
  catchWrap(controller.updateInternalRegister)
);

router.put(
  "/archive/:internalRegisterId",
  canDo("delete", "internalRegister"),
  internalRegisterSchems.deleteArchiveInternalRegister,
  catchWrap(controller.deleteArchiveInternalRegister)
);

router.delete(
  "/:internalRegisterId",
  canDo("delete", "internalRegister"),
  internalRegisterSchems.deleteInternalRegister,
  catchWrap(controller.deleteInternalRegister)
);

router.get(
  "/:internalRegisterId",
  canDo("read", "internalRegister"),
  internalRegisterSchems.getInternalRegisterById,
  catchWrap(controller.getinternalRegisterById)
);

router.get(
  "/",
  canDo("read", "internalRegister"),
  internalRegisterSchems.getInternalRegisters,
  catchWrap(controller.getInternalRegisters)
);

export default router;
