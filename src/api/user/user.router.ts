import express from "express";

import controller from "./user.controller";
import userSchems from "./user.schema";
import { catchWrap } from "../../components/errors";

const router = express.Router();

router.get("/me", catchWrap(controller.me));

router.post(
  "/forgot-password",
  userSchems.forgotPassword,
  catchWrap(controller.forgotPassword)
);

router.post(
  "/reset-password",
  userSchems.resetPassword,
  catchWrap(controller.resetPassword)
);

router.post(
  "/register",
  userSchems.registerUser,
  catchWrap(controller.registerUser)
);

router.post("/login", userSchems.loginUser, catchWrap(controller.loginUser));

router.post("/", userSchems.createUser, catchWrap(controller.createUser));

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
