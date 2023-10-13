import express from "express";

import authMiddleware from "../components/auth";
import { provideAbility } from "../components/ability";
import { userRoutes } from "../api/user";
import { roleRoutes } from "../api/role";
import { companyRoutes } from "../api/company";
import { staffProfileRoutes } from "../api/staffProfile";
import { siteRoutes } from "../api/site";
import { shiftRecordRoutes } from "../api/shiftRecord";

const router = express.Router();
router.use(provideAbility);

router.use("/user", userRoutes);
router.use("/role", roleRoutes);
router.use("/company", companyRoutes);
router.use("/staff-profile", staffProfileRoutes);
router.use("/site", siteRoutes);
router.use("/shift-record", shiftRecordRoutes);

export default router;
