import express from "express";

import controller from "./restrictivePracticeRegister.controller";
import restrictivePracticeRegisterSchems from "./restrictivePracticeRegister.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.post(
  "/",
  canDo("create", "restrictivePracticeRegister"),
  restrictivePracticeRegisterSchems.createRestrictivePracticeRegister,
  catchWrap(controller.createRestrictivePracticeRegister)
);

router.put(
  "/:restrictivePracticeRegisterId",
  canDo("update", "restrictivePracticeRegister"),
  restrictivePracticeRegisterSchems.editRestrictivePracticeRegister,
  catchWrap(controller.updateRestrictivePracticeRegister)
);

router.delete(
  "/:restrictivePracticeRegisterId",
  canDo("delete", "restrictivePracticeRegister"),
  restrictivePracticeRegisterSchems.deleteRestrictivePracticeRegister,
  catchWrap(controller.deleteRestrictivePracticeRegister)
);

router.get(
  "/:restrictivePracticeRegisterId",
  canDo("read", "restrictivePracticeRegister"),
  restrictivePracticeRegisterSchems.getRestrictivePracticeRegisterById,
  catchWrap(controller.getrestrictivePracticeRegisterById)
);

router.get(
  "/",
  canDo("read", "restrictivePracticeRegister"),
  restrictivePracticeRegisterSchems.getRestrictivePracticeRegisters,
  catchWrap(controller.getRestrictivePracticeRegisters)
);

export default router;
