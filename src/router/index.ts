import express from "express";

import authMiddleware from "../components/auth";
import { provideAbility } from "../components/ability";
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
import { oxygenSaturationLogRoutes } from "../api/oxygenSaturationLog";
import { seizureLogRoutes } from "../api/seizureLog";
import { clientBehaviourRoutes } from "../api/clientBehaviour";
import { vehicleLogRoutes } from "../api/vehicleLog";
import { injuryReportRoutes } from "../api/injuryReport";
import { expenseReimbursementRoutes } from "../api/expenseReimbursement";
import { doctorVisitRoutes } from "../api/doctorVisit";
import { clientAssetRoutes } from "../api/clientAsset";
import { companyAssetRoutes } from "../api/companyAsset";
import { repairRequestRoutes } from "../api/repairRequest";
import { conflictOfInterestRoutes } from "../api/conflictOfInterest";
import { corporateRiskRoutes } from "../api/corporateRisk";
// import { whsLogRoutes } from "../api/whsLog";
import { meetingLogRoutes } from "../api/meetingLog";
import { clientRiskRoutes } from "../api/clientRisk";
import { staffSleepDisturbanceRoutes } from "../api/staffSleepDisturbance";
import { resourceRoutes } from "../api/resource";
import { attachmentRoutes } from "../api/attachment";
import { leaseAndUtilityLogRoutes } from "../api/leaseAndUtilityLog";
import { maintenanceLogRoutes } from "../api/maintenanceLog";
import { feedbackRoutes } from "../api/feedback";
import { clientDocumentCategoryRoutes } from "../api/clientDocumentCategory";
import { clientDocumentTypeRoutes } from "../api/clientDocumentType";
import { clientDocumentRoutes } from "../api/clientDocument";
import { staffDocumentCategoryRoutes } from "../api/staffDocumentCategory";
import { staffDocumentTypeRoutes } from "../api/staffDocumentType";
import { staffDocumentRoutes } from "../api/staffDocument";
import { incidentReportRoutes } from "../api/incidentReport";
import { incidentTypeRoutes } from "../api/incidentType";
import { keyDecisionRoutes } from "../api/keyDecision";
import { restrictivePracticeLogRoutes } from "../api/restrictivePracticeLog";
import { teamRoutes } from "../api/team";
import { companyExpenseRoutes } from "../api/companyExpense";
import { policyRoutes } from "../api/policy";
import { progressReportRoutes } from "../api/progressReport";
import { policyReviewRoutes } from "../api/policyReview";
import { shiftTypeRoutes } from "../api/shiftType";
import { shiftRecordRoutes } from "../api/shiftRecord";

const router = express.Router();
router.use(authMiddleware); // TODO: may be we can move this to express config file
router.use(provideAbility);

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
router.use("/prn-balance-log", prnBalanceLogRoutes);
router.use("/oxygen-saturation-log", oxygenSaturationLogRoutes);
router.use("/seizure-log", seizureLogRoutes);
router.use("/client-behaviour", clientBehaviourRoutes);
router.use("/vehicle-log", vehicleLogRoutes);
router.use("/injury-report", injuryReportRoutes);
router.use("/expense-reimbursement", expenseReimbursementRoutes);
router.use("/doctor-visit", doctorVisitRoutes);
router.use("/client-asset", clientAssetRoutes);
router.use("/company-asset", companyAssetRoutes);
router.use("/repair-request", repairRequestRoutes);
router.use("/conflict-of-interest", conflictOfInterestRoutes);
router.use("/corporate-risk", corporateRiskRoutes);
// router.use("/whs-log", whsLogRoutes);
router.use("/meeting-log", meetingLogRoutes);
router.use("/client-risk", clientRiskRoutes);
router.use("/staff-sleep-disturbance", staffSleepDisturbanceRoutes);
router.use("/resource", resourceRoutes);
router.use("/attachment", attachmentRoutes);
router.use("/lease-and-utility-log", leaseAndUtilityLogRoutes);
router.use("/maintenance-log", maintenanceLogRoutes);
router.use("/feedback", feedbackRoutes);
router.use("/client-document-category", clientDocumentCategoryRoutes);
router.use("/client-document-type", clientDocumentTypeRoutes);
router.use("/client-document", clientDocumentRoutes);
router.use("/staff-document-category", staffDocumentCategoryRoutes);
router.use("/staff-document-type", staffDocumentTypeRoutes);
router.use("/staff-document", staffDocumentRoutes);
router.use("/incident-report", incidentReportRoutes);
router.use("/incident-type", incidentTypeRoutes);
router.use("/key-decision", keyDecisionRoutes);
router.use("/restrictive-practice-log", restrictivePracticeLogRoutes);
router.use("/team", teamRoutes);
router.use("/policy", policyRoutes);
router.use("/company-expense", companyExpenseRoutes);
router.use("/progress-report", progressReportRoutes);
router.use("/policy-review", policyReviewRoutes);
router.use("/shift-type", shiftTypeRoutes);
router.use("/shift-record", shiftRecordRoutes);

export default router;
