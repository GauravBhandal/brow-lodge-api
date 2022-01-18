import express from "express";

import authMiddleware from "../components/auth";
import { userRoutes } from "../api/user";
import { roleRoutes } from "../api/role";
import { companyRoutes } from "../api/company";
import { clientProfileRoutes } from "../api/clientProfile";
import { staffProfileRoutes } from "../api/staffProfile";
import { progressNoteRoutes } from "../api/progressNote";
import { bloodGlucoseLogRoutes } from "../api/bloodGlucoseLog";
import { bloodPressureLogRoutes } from "../api/bloodPressureLog";
import { bowelLogRoutes } from "../api/bowelLog";
import { weightLogRoutes } from "../api/weightLog";
import { sleepLogRoutes } from "../api/sleepLog";
import { temperatureLogRoutes } from "../api/temperatureLog";
import { prnAdminLogRoutes } from "../api/prnAdminLog";
import { prnBalanceLogRoutes } from "../api/prnBalanceLog";

const router = express.Router();
router.use(authMiddleware);

router.use("/user", userRoutes);
router.use("/role", roleRoutes);
router.use("/company", companyRoutes);
router.use("/client-profile", clientProfileRoutes);
router.use("/staff-profile", staffProfileRoutes);
router.use("/progress-note", progressNoteRoutes);
router.use("/blood-glucose-log", bloodGlucoseLogRoutes);
router.use("/blood-pressure-log", bloodPressureLogRoutes);
router.use("/bowel-log", bowelLogRoutes);
router.use("/weight-log", weightLogRoutes);
router.use("/sleep-log", sleepLogRoutes);
router.use("/temperature-log", temperatureLogRoutes);
router.use("/prn-admin-log", prnAdminLogRoutes);
router.use("/prn-Balance-log", prnBalanceLogRoutes);

export default router;
