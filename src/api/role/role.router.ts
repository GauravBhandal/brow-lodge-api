import express from "express";

import controller from "./role.controller";
import roleSchems from "./role.schema";
import { catchWrap } from "../../components/errors";
import authMiddleware from "../../components/auth";

const router = express.Router();

router.use(authMiddleware);

router.post("/", roleSchems.createRole, catchWrap(controller.createRole));

router.put("/:roleId", roleSchems.editRole, catchWrap(controller.updateRole));

router.delete(
  "/:roleId",
  roleSchems.deleteRole,
  catchWrap(controller.deleteRole)
);

router.get(
  "/:roleId",
  roleSchems.getRoleById,
  catchWrap(controller.getroleById)
);

router.get("/", roleSchems.getRoles, catchWrap(controller.getRoles));

export default router;
