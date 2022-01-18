import express from "express";

import authMiddleware from "../components/auth";
import { userRoutes } from "../api/user";
import { roleRoutes } from "../api/role";
import { companyRoutes } from "../api/company";
import { clientProfileRoutes } from "../api/clientProfile";
import { staffProfileRoutes } from "../api/staffProfile";
import { progressNoteRoutes } from "../api/progressNote";
import { bloodGlucoseLogRoutes } from "../api/bloodGlucoseLog";
import { bowelLogRoutes } from "../api/bowelLog";

const router = express.Router();
router.use(authMiddleware);

router.use("/user", userRoutes);
router.use("/role", roleRoutes);
router.use("/company", companyRoutes);
router.use("/client-profile", clientProfileRoutes);
router.use("/staff-profile", staffProfileRoutes);
router.use("/progress-note", progressNoteRoutes);
router.use("/blood-glucose-log", bloodGlucoseLogRoutes);
router.use("/bowel-log", bowelLogRoutes);

export default router;
