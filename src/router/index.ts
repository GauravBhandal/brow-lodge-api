import express from "express";

import authMiddleware from "../components/auth";
import { provideAbility } from "../components/ability";
import { userRoutes } from "../api/user";
import { roleRoutes } from "../api/role";
import { companyRoutes } from "../api/company";
import { staffProfileRoutes } from "../api/staffProfile";
import { clientProfileRoutes } from "../api/clientProfile";

const router = express.Router();
router.use(provideAbility);

router.use("/user", userRoutes);
router.use("/role", roleRoutes);
router.use("/company", companyRoutes);
router.use("/staff-profile", staffProfileRoutes);
router.use("/client-profile", clientProfileRoutes);

export default router;
