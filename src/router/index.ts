import express from "express";

import authMiddleware from "../components/auth";
import { provideAbility } from "../components/ability";
import { userRoutes } from "../api/user";
import { roleRoutes } from "../api/role";
import { companyRoutes } from "../api/company";
import { staffProfileRoutes } from "../api/staffProfile";
import { clientProfileRoutes } from "../api/clientProfile";
import { eyelashExtensionRoutes } from "../api/eyelashExtension";
import { eyelashExtensionDetailRoutes } from "../api/eyelashExtensionDetail";
import { waxConsultationRoutes } from "../api/waxConsultation";
import { waxConsultationDetailRoutes } from "../api/waxConsultationDetail";
import { tintConsultationRoutes } from "../api/tintConsultation";
import { tintConsultationDetailRoutes } from "../api/tintConsultationDetail";

const router = express.Router();
router.use(provideAbility);

router.use("/user", userRoutes);
router.use("/role", roleRoutes);
router.use("/company", companyRoutes);
router.use("/staff-profile", staffProfileRoutes);
router.use("/client-profile", clientProfileRoutes);
router.use("/eyelash-extension", eyelashExtensionRoutes);
router.use("/eyelash-extension-details", eyelashExtensionDetailRoutes);
router.use("/wax-consultation", waxConsultationRoutes);
router.use("/wax-consultation-details", waxConsultationDetailRoutes);
router.use("/tint-consultation", tintConsultationRoutes);
router.use("/tint-consultation-details", tintConsultationDetailRoutes);

export default router;
