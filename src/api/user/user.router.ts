import express from "express";

import controller from "./user.controller";

const router = express.Router();

router.get("/", controller.getUser);

router.post("/", controller.createUser);

export default router;
