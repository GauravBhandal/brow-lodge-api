import express from "express";

import controller from "./user.controller";
import userSchems from "./user.schema";

const router = express.Router();

router.post("/", userSchems.createUser, controller.createUser);

router.put("/:userId", userSchems.editUser, controller.updateUser);

router.delete("/:userId", userSchems.deleteUser, controller.deleteUser);

router.get("/:userId", userSchems.getUserById, controller.getuserById);

router.get("/", controller.getUsers);

export default router;
