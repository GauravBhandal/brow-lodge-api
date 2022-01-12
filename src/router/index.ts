import express from "express";

import { userRoutes } from "../api/user";
import { companyRoutes } from "../api/company";

const router = express.Router();

router.use("/user", userRoutes);

router.use("/company", companyRoutes);

export default router;
