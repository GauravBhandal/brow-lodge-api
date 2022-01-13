import express from "express";

import { userRoutes } from "../api/user";
import { roleRoutes } from "../api/role";
import { companyRoutes } from "../api/company";
import { clientProfileRoutes } from "../api/clientProfile";
import { staffProfileRoutes } from "../api/staffProfile";
import { progressNoteRoutes } from "../api/progressNote";

const router = express.Router();

router.use("/user", userRoutes);
router.use("/role", roleRoutes);
router.use("/company", companyRoutes);
router.use("/client-profile", clientProfileRoutes);
router.use("/staff-profile", staffProfileRoutes);
router.use("/progress-note", progressNoteRoutes);

export default router;
