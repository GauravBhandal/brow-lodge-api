import express from "express";

import controller from "./user.controller";
import userSchems from "./user.schema";
import { catchWrap } from "../../components/errors";
import authMiddleware from "../../components/auth";

const router = express.Router();

router.post(
  "/register",
  userSchems.registerUser,
  catchWrap(controller.registerUser)
);

router.post("/login", userSchems.loginUser, catchWrap(controller.loginUser));

// TODO: Add authMiddleware to this route once /register endpoint is ready
router.post("/", userSchems.createUser, catchWrap(controller.createUser));

router.use(authMiddleware);

router.put("/:userId", userSchems.editUser, catchWrap(controller.updateUser));

router.delete(
  "/:userId",
  userSchems.deleteUser,
  catchWrap(controller.deleteUser)
);

router.get(
  "/:userId",
  userSchems.getUserById,
  catchWrap(controller.getuserById)
);

router.get("/", userSchems.getUsers, catchWrap(controller.getUsers));

export default router;
