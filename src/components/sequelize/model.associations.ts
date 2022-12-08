import { ClientProfileModel } from "../../api/clientProfile";
import { RoleModel } from "../../api/role";
import { StaffProfileModel } from "../../api/staffProfile";
import { UserModel } from "../../api/user";
import { CompanyModel } from "../../api/company";
import { ProgressNoteModel } from "../../api/progressNote";
import { BloodGlucoseLogModel } from "../../api/bloodGlucoseLog";
import { BloodPressureLogModel } from "../../api/bloodPressureLog";
import { BowelLogModel } from "../../api/bowelLog";
import { WeightLogModel } from "../../api/weightLog";
import { SleepLogModel } from "../../api/sleepLog";
import { TemperatureLogModel } from "../../api/temperatureLog";
import { OxygenSaturationLogModel } from "../../api/oxygenSaturationLog";
import { SeizureLogModel } from "../../api/seizureLog";
import { PrnAdminLogModel } from "../../api/prnAdminLog";
import { PrnBalanceLogModel } from "../../api/prnBalanceLog";
import { ClientBehaviourModel } from "../../api/clientBehaviour";
import { VehicleLogModel } from "../../api/vehicleLog";
import { InjuryReportModel } from "../../api/injuryReport";
import { DoctorVisitModel } from "../../api/doctorVisit";
import { ClientAssetModel } from "../../api/clientAsset";
import { CompanyAssetModel } from "../../api/companyAsset";
import { RepairRequestModel } from "../../api/repairRequest";
import { ConflictOfInterestModel } from "../../api/conflictOfInterest";
import { CorporateRiskModel } from "../../api/corporateRisk";
import { WhsLogModel } from "../../api/whsLog";
import { MeetingLogModel } from "../../api/meetingLog";
import { ClientRiskModel } from "../../api/clientRisk";
import { StaffSleepDisturbanceModel } from "../../api/staffSleepDisturbance";
import { ResourceModel } from "../../api/resource";
import { AttachmentModel } from "../../api/attachment";
import { LeaseAndUtilityLogModel } from "../../api/leaseAndUtilityLog";
import { MaintenanceLogModel } from "../../api/maintenanceLog";
import { FeedbackModel } from "../../api/feedback";
import { ClientDocumentCategoryModel } from "../../api/clientDocumentCategory";
import { ClientDocumentTypeModel } from "../../api/clientDocumentType";
import { ClientDocumentModel } from "../../api/clientDocument";
import { StaffDocumentCategoryModel } from "../../api/staffDocumentCategory";
import { StaffDocumentTypeModel } from "../../api/staffDocumentType";
import { StaffDocumentModel } from "../../api/staffDocument";
import { IncidentReportModel } from "../../api/incidentReport";
import { IncidentTypeModel } from "../../api/incidentType";
import { KeyDecisionModel } from "../../api/keyDecision";
import { RestrictivePracticeLogModel } from "../../api/restrictivePracticeLog";
import { TeamModel } from "../../api/team";
import { ShiftRecordModel } from "../../api/shiftRecord";
import { ShiftRepeatModel } from "../../api/shiftRepeat";
import { ProgressReportModel } from "../../api/progressReport";
import { PolicyModel } from "../../api/policy";
import { PolicyReviewModel } from "../../api/policyReview";
import { ServiceModel } from "../../api/service";
import { TimesheetModel } from "../../api/timesheet";
import { PayLevelModel } from "../../api/payLevel";
import { InvoiceModel } from "../../api/invoice";
import { IntegrationModel } from "../../api/integration";
import IntegrationExternalDataModel from "../../api/integration/integrationExternalData/integrationExternalData.model";
import { LegislationRegisterModel } from "../../api/legislationRegister";
import { TemplateModel } from "../../api/template";
import { InternalRegisterModel } from "../../api/internalRegister";
import { RestrictivePracticeRegisterModel } from "../../api/restrictivePracticeRegister";
import { ClientContactModel } from "../../api/clientProfile/clientContact";
import { OnCallLogModel } from "../../api/onCallLogs";
import { ParticipantCommunicationLogModel } from "../../api/participantCommunicationLog";
import { StaffSupervisionLogModel } from "../../api/staffSupervisionLog";
import { ParticipantMedicationChartModel } from "../../api/participantMedicationChart";
import { RosterSettingModel } from "../../api/rosterSetting";
import { ProgressNoteSettingsModel } from "../../api/progressNoteSettings";
import { ProcessModel } from "../../api/process";
import { RpdhsResourceModel } from "../../api/rpdhsResources";
import { PracticeGuideModel } from "../../api/practiceGuide";
import { ServiceDeliveryModel } from "../../api/serviceDelivery";
import { ExpenseModel } from "../../api/expense";
import { ParticipantGoalModel } from "../../api/participantGoal";
import { AlertConfigurationModel } from "../../api/alertConfiguration";
import { ExternalContractModel } from "../../api/externalContract";
import { RegulatoryComplianceModel } from "../../api/regulatoryCompliance";
import { MedicationRegisterModel } from "../../api/medicationRegister";
import { ContinuousImprovementModel } from "../../api/continuousImprovement";
import { RestrictivePracticeLogTypeModel } from "../../api/restrictivePracticeLog/restrictivePracticeLogType";

export default {
  initialize() {
    initializeClientProfileModelAssociations();
    initializeRoleModelAssociations();
    initializeStaffProfileModelAssociations();
    initializeUserModelAssociations();
    initializeCompanyModelAssociations();
    initializeProgressNoteModelAssociations();
    initializeBloodGlucoseLogModelAssociations();
    initializeBloodPressureLogModelAssociations();
    initializeBowelLogModelAssociations();
    initializeWeightLogModelAssociations();
    initializeSleepLogModelAssociations();
    initializeTemperatureLogModelAssociations();
    initializeOxygenSaturationLogModelAssociations();
    initializeSeizureLogModelAssociations();
    initializePrnAdminLogModelAssociations();
    initializePrnBalanceLogModelAssociations();
    initializeClientBehaviourModelAssociations();
    initializeVehicleLogModelAssociations();
    initializeInjuryReportModelAssociations();
    initializeDoctorVisitModelAssociations();
    initializeClientAssetModelAssociations();
    initializeCompanyAssetModelAssociations();
    initializeRepairRequestModelAssociations();
    initializeConflictOfInterestModelAssociations();
    initializeCorporateRiskModelAssociations();
    initializeWhsLogModelAssociations();
    initializeMeetingLogModelAssociations();
    initializeClientRiskModelAssociations();
    initializeStaffSleepDisturbanceModelAssociations();
    initializeResourceModelAssociations();
    initializeAttachmentModelAssociations();
    initializeLeaseAndUtilityLogModelAssociations();
    initializeMaintenanceLogModelAssociations();
    initializeFeedbackModelAssociations();
    initializeClientDocumentCategoryModelAssociations();
    initializeClientDocumentTypeModelAssociations();
    initializeClientDocumentModelAssociations();
    initializeStaffDocumentCategoryModelAssociations();
    initializeStaffDocumentTypeModelAssociations();
    initializeStaffDocumentModelAssociations();
    initializeIncidentReportModelAssociations();
    initializeKeyDecisionModelAssociations();
    initializeRestrictivePracticeLogModelAssociations();
    initializeTeamModelAssociations();
    initializePayLevelModelAssociations();
    initializeShiftRepeatModelAssociations();
    initializeShiftRecordModelAssociations();
    initializePolicyModelAssociations();
    initializeProgressReportModelAssociations();
    initializePolicyReviewModelAssociations();
    initializeServiceModelAssociations();
    initializeTimesheetModelAssociations();
    initializeInvoiceModelAssociations();
    initializeIntegrationModelAssociations();
    initializeIntegrationExternalDataModelAssociations();
    initializeLegislationRegisterModelAssociations();
    initializeTemplateModelAssociations();
    initializeInternalRegisterModelAssociations();
    initializeRestrictivePracticeRegisterModelAssociations();
    initializeClientContactModelAssociations();
    initializeOnCallLogModelAssociations();
    initializeParticipantCommunicationLogModelAssociations();
    initializeStaffSupervisionLogModelAssociations();
    initializeParticipantMedicationChartModelAssociations();
    initializeRosterSettingModelAssociations();
    initializeProgressNoteSettingsModelAssociations();
    initializeProcessModelAssociations();
    initializeRpdhsResourceModelAssociations();
    initializePracticeGuideModelAssociations();
    initializeServiceDeliveryModelAssociations();
    initializeExpenseModelAssociations();
    initializeParticipantGoalModelAssociations();
    initializeAlertConfigurationAssociations();
    initializeExternalContractModelAssociations();
    initializeRegulatoryComplianceModelAssociations();
    initializeMedicationRegisterModelAssociations();
    initializeContinuousImprovementModelAssociations();
  },
};

function initializeClientProfileModelAssociations() {
  ClientProfileModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  ClientProfileModel.belongsTo(AttachmentModel, {
    foreignKey: "attachment",
  });
  ClientProfileModel.hasMany(ClientContactModel, {
    foreignKey: "client",
    sourceKey: "id",
    as: "Contacts",
  });
}

function initializeRoleModelAssociations() {
  RoleModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  RoleModel.belongsToMany(UserModel, {
    through: "users_roles",
    foreignKey: "role",
  });
}

function initializeStaffProfileModelAssociations() {
  StaffProfileModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  StaffProfileModel.belongsTo(UserModel, {
    foreignKey: { name: "user" },
  });
  StaffProfileModel.belongsTo(AttachmentModel, {
    foreignKey: "attachment",
  });
  StaffProfileModel.belongsTo(StaffProfileModel, {
    foreignKey: {
      name: "manager",
    },
    as: "Manager",
  });
  StaffProfileModel.belongsTo(PayLevelModel, {
    foreignKey: { name: "paylevel" },
    as: "Paylevel",
  });
}

function initializeUserModelAssociations() {
  UserModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  UserModel.belongsToMany(RoleModel, {
    through: "users_roles",
    foreignKey: "user",
  });
  UserModel.hasOne(StaffProfileModel, {
    foreignKey: {
      name: "user",
    },
    as: "Staff",
  });
}

function initializeCompanyModelAssociations() {
  // TODO: I don't think we need add these associations because we never need to access stuff through company table
  CompanyModel.hasMany(ProgressNoteModel, {
    foreignKey: "company",
    sourceKey: "id",
  });

  CompanyModel.belongsTo(AttachmentModel, {
    foreignKey: "attachment",
  });
}

function initializeProgressNoteModelAssociations() {
  ProgressNoteModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  ProgressNoteModel.belongsToMany(StaffProfileModel, {
    through: "progress_notes_staff_profiles",
    foreignKey: "progress_note",
    otherKey: "staff",
    as: "Staff",
  });
  ProgressNoteModel.belongsTo(ClientProfileModel, {
    foreignKey: { name: "client", allowNull: false },
    as: "Client",
  });
  ProgressNoteModel.belongsToMany(AttachmentModel, {
    through: "progress_notes_attachments",
    foreignKey: "relation",
    otherKey: "attachment",
  });
}

function initializeBloodGlucoseLogModelAssociations() {
  BloodGlucoseLogModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  BloodGlucoseLogModel.belongsTo(StaffProfileModel, {
    foreignKey: { name: "staff", allowNull: false },
    as: "Staff",
  });
  BloodGlucoseLogModel.belongsTo(ClientProfileModel, {
    foreignKey: { name: "client", allowNull: false },
    as: "Client",
  });
}

function initializeBowelLogModelAssociations() {
  BowelLogModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  BowelLogModel.belongsTo(StaffProfileModel, {
    foreignKey: { name: "staff", allowNull: false },
    as: "Staff",
  });
  BowelLogModel.belongsTo(ClientProfileModel, {
    foreignKey: { name: "client", allowNull: false },
    as: "Client",
  });
}

function initializeBloodPressureLogModelAssociations() {
  BloodPressureLogModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  BloodPressureLogModel.belongsTo(StaffProfileModel, {
    foreignKey: { name: "staff", allowNull: false },
    as: "Staff",
  });
  BloodPressureLogModel.belongsTo(ClientProfileModel, {
    foreignKey: { name: "client", allowNull: false },
    as: "Client",
  });
}

function initializeSleepLogModelAssociations() {
  SleepLogModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  SleepLogModel.belongsTo(StaffProfileModel, {
    foreignKey: { name: "staff", allowNull: false },
    as: "Staff",
  });
  SleepLogModel.belongsTo(ClientProfileModel, {
    foreignKey: { name: "client", allowNull: false },
    as: "Client",
  });
}

function initializeTemperatureLogModelAssociations() {
  TemperatureLogModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  TemperatureLogModel.belongsTo(StaffProfileModel, {
    foreignKey: { name: "staff", allowNull: false },
    as: "Staff",
  });
  TemperatureLogModel.belongsTo(ClientProfileModel, {
    foreignKey: { name: "client", allowNull: false },
    as: "Client",
  });
}

function initializeWeightLogModelAssociations() {
  WeightLogModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  WeightLogModel.belongsTo(StaffProfileModel, {
    foreignKey: { name: "staff", allowNull: false },
    as: "Staff",
  });
  WeightLogModel.belongsTo(ClientProfileModel, {
    foreignKey: { name: "client", allowNull: false },
    as: "Client",
  });
}

function initializeOxygenSaturationLogModelAssociations() {
  OxygenSaturationLogModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  OxygenSaturationLogModel.belongsTo(StaffProfileModel, {
    foreignKey: { name: "staff", allowNull: false },
    as: "Staff",
  });
  OxygenSaturationLogModel.belongsTo(ClientProfileModel, {
    foreignKey: { name: "client", allowNull: false },
    as: "Client",
  });
}

function initializeSeizureLogModelAssociations() {
  SeizureLogModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  SeizureLogModel.belongsTo(StaffProfileModel, {
    foreignKey: { name: "staff", allowNull: false },
    as: "Staff",
  });
  SeizureLogModel.belongsTo(ClientProfileModel, {
    foreignKey: { name: "client", allowNull: false },
    as: "Client",
  });
}

function initializePrnAdminLogModelAssociations() {
  PrnAdminLogModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  PrnAdminLogModel.belongsTo(StaffProfileModel, {
    foreignKey: { name: "staff", allowNull: false },
    as: "Staff",
  });
  PrnAdminLogModel.belongsTo(ClientProfileModel, {
    foreignKey: { name: "client", allowNull: false },
    as: "Client",
  });
}

function initializePrnBalanceLogModelAssociations() {
  PrnBalanceLogModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  PrnBalanceLogModel.belongsTo(StaffProfileModel, {
    foreignKey: { name: "staff", allowNull: false },
    as: "Staff",
  });
  PrnBalanceLogModel.belongsTo(ClientProfileModel, {
    foreignKey: { name: "client", allowNull: false },
    as: "Client",
  });
}

function initializeClientBehaviourModelAssociations() {
  ClientBehaviourModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  ClientBehaviourModel.belongsTo(StaffProfileModel, {
    foreignKey: { name: "staff", allowNull: false },
    as: "Staff",
  });
  ClientBehaviourModel.belongsTo(ClientProfileModel, {
    foreignKey: { name: "client", allowNull: false },
    as: "Client",
  });
}

function initializeVehicleLogModelAssociations() {
  VehicleLogModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  VehicleLogModel.belongsTo(StaffProfileModel, {
    foreignKey: { name: "staff", allowNull: false },
    as: "Staff",
  });
  VehicleLogModel.belongsTo(ClientProfileModel, {
    foreignKey: { name: "client", allowNull: false },
    as: "Client",
  });
}

function initializeInjuryReportModelAssociations() {
  InjuryReportModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  InjuryReportModel.belongsTo(StaffProfileModel, {
    foreignKey: { name: "staff", allowNull: false },
    as: "Staff",
  });
  InjuryReportModel.belongsTo(ClientProfileModel, {
    foreignKey: { name: "client", allowNull: false },
    as: "Client",
  });
  InjuryReportModel.belongsToMany(AttachmentModel, {
    through: "injury_reports_attachments",
    foreignKey: "relation",
    otherKey: "attachment",
  });
}

function initializeDoctorVisitModelAssociations() {
  DoctorVisitModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  DoctorVisitModel.belongsTo(StaffProfileModel, {
    foreignKey: { name: "staff", allowNull: false },
    as: "Staff",
  });
  DoctorVisitModel.belongsTo(ClientProfileModel, {
    foreignKey: { name: "client", allowNull: false },
    as: "Client",
  });
  DoctorVisitModel.belongsToMany(AttachmentModel, {
    through: "doctor_visit_attachments",
    foreignKey: "relation",
    otherKey: "attachment",
  });
}

function initializeClientAssetModelAssociations() {
  ClientAssetModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  ClientAssetModel.belongsTo(StaffProfileModel, {
    foreignKey: { name: "staff", allowNull: false },
    as: "Staff",
  });
  ClientAssetModel.belongsTo(ClientProfileModel, {
    foreignKey: { name: "client", allowNull: false },
    as: "Client",
  });
  ClientAssetModel.belongsToMany(AttachmentModel, {
    through: "client_assets_attachments",
    foreignKey: "relation",
    otherKey: "attachment",
  });
}

function initializeCompanyAssetModelAssociations() {
  CompanyAssetModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  CompanyAssetModel.belongsTo(StaffProfileModel, {
    foreignKey: { name: "staff", allowNull: false },
    as: "Staff",
  });
  CompanyAssetModel.belongsToMany(AttachmentModel, {
    through: "company_assets_attachments",
    foreignKey: "relation",
    otherKey: "attachment",
  });
}

function initializeRepairRequestModelAssociations() {
  RepairRequestModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  RepairRequestModel.belongsTo(StaffProfileModel, {
    foreignKey: { name: "staff", allowNull: false },
    as: "Staff",
  });
  RepairRequestModel.belongsToMany(AttachmentModel, {
    through: "repair_requests_attachments",
    foreignKey: "relation",
    otherKey: "attachment",
  });
}

function initializeConflictOfInterestModelAssociations() {
  ConflictOfInterestModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  ConflictOfInterestModel.belongsTo(StaffProfileModel, {
    foreignKey: { name: "staff", allowNull: false },
    as: "Staff",
  });
  ConflictOfInterestModel.belongsToMany(AttachmentModel, {
    through: "conflict_of_interests_attachments",
    foreignKey: "relation",
    otherKey: "attachment",
  });
}

function initializeCorporateRiskModelAssociations() {
  CorporateRiskModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  CorporateRiskModel.belongsTo(StaffProfileModel, {
    foreignKey: { name: "staff", allowNull: false },
    as: "Staff",
  });
}

function initializeWhsLogModelAssociations() {
  WhsLogModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  WhsLogModel.belongsToMany(AttachmentModel, {
    through: "whs_logs_attachments",
    foreignKey: "relation",
    otherKey: "attachment",
  });
}

function initializeMeetingLogModelAssociations() {
  MeetingLogModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  MeetingLogModel.belongsTo(StaffProfileModel, {
    foreignKey: { name: "staff", allowNull: false },
    as: "Staff",
  });
  MeetingLogModel.belongsTo(ClientProfileModel, {
    foreignKey: { name: "client", allowNull: true },
    as: "Client",
  });
  MeetingLogModel.belongsToMany(AttachmentModel, {
    through: "meeting_logs_attachments",
    foreignKey: "relation",
    otherKey: "attachment",
  });
}

function initializeClientRiskModelAssociations() {
  ClientRiskModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  ClientRiskModel.belongsTo(StaffProfileModel, {
    foreignKey: { name: "staff", allowNull: false },
    as: "Staff",
  });
  ClientRiskModel.belongsTo(ClientProfileModel, {
    foreignKey: { name: "client", allowNull: false },
    as: "Client",
  });
  ClientRiskModel.belongsToMany(AttachmentModel, {
    through: "client_risk_attachments",
    foreignKey: "relation",
    otherKey: "attachment",
  });
}

function initializeStaffSleepDisturbanceModelAssociations() {
  StaffSleepDisturbanceModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  StaffSleepDisturbanceModel.belongsTo(StaffProfileModel, {
    foreignKey: { name: "staff", allowNull: false },
    as: "Staff",
  });
  StaffSleepDisturbanceModel.belongsTo(ClientProfileModel, {
    foreignKey: { name: "client", allowNull: false },
    as: "Client",
  });
}

function initializeResourceModelAssociations() {
  ResourceModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  ResourceModel.belongsTo(StaffProfileModel, {
    foreignKey: { name: "staff", allowNull: false },
    as: "Staff",
  });
  ResourceModel.belongsTo(AttachmentModel, {
    foreignKey: "attachment",
  });
}

function initializeAttachmentModelAssociations() {
  AttachmentModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
}

function initializeLeaseAndUtilityLogModelAssociations() {
  LeaseAndUtilityLogModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  LeaseAndUtilityLogModel.belongsTo(StaffProfileModel, {
    foreignKey: { name: "staff", allowNull: false },
    as: "Staff",
  });
  LeaseAndUtilityLogModel.belongsTo(ClientProfileModel, {
    foreignKey: { name: "client" },
    as: "Client",
  });
  LeaseAndUtilityLogModel.belongsToMany(AttachmentModel, {
    through: "lease_and_utility_logs_attachments",
    foreignKey: "relation",
    otherKey: "attachment",
  });
}

function initializeMaintenanceLogModelAssociations() {
  MaintenanceLogModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  MaintenanceLogModel.belongsTo(StaffProfileModel, {
    foreignKey: { name: "staff", allowNull: false },
    as: "Staff",
  });
  MaintenanceLogModel.belongsToMany(AttachmentModel, {
    through: "maintenance_logs_attachments",
    foreignKey: "relation",
    otherKey: "attachment",
  });
}

function initializeFeedbackModelAssociations() {
  FeedbackModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  FeedbackModel.belongsTo(StaffProfileModel, {
    foreignKey: { name: "staff" },
    as: "Staff",
  });
  FeedbackModel.belongsToMany(AttachmentModel, {
    through: "feedbacks_attachments",
    foreignKey: "relation",
    otherKey: "attachment",
  });
}

function initializeClientDocumentCategoryModelAssociations() {
  ClientDocumentCategoryModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  ClientDocumentCategoryModel.hasMany(ClientDocumentTypeModel, {
    foreignKey: "category",
    sourceKey: "id",
    as: "Types",
  });
}

function initializeClientDocumentTypeModelAssociations() {
  ClientDocumentTypeModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  ClientDocumentTypeModel.belongsTo(ClientDocumentCategoryModel, {
    foreignKey: { name: "category" },
    as: "Category",
  });
}

function initializeClientDocumentModelAssociations() {
  ClientDocumentModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  ClientDocumentModel.belongsTo(ClientProfileModel, {
    foreignKey: { name: "client" },
    as: "Client",
  });
  ClientDocumentModel.belongsTo(ClientDocumentCategoryModel, {
    foreignKey: { name: "category" },
    as: "Category",
  });
  ClientDocumentModel.belongsTo(ClientDocumentTypeModel, {
    foreignKey: { name: "type" },
    as: "Type",
  });
  ClientDocumentModel.belongsToMany(AttachmentModel, {
    through: "client_documents_attachments",
    foreignKey: "relation",
    otherKey: "attachment",
  });
}

function initializeStaffDocumentCategoryModelAssociations() {
  StaffDocumentCategoryModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  StaffDocumentCategoryModel.hasMany(StaffDocumentTypeModel, {
    foreignKey: "category",
    sourceKey: "id",
    as: "Types",
  });
}

function initializeStaffDocumentTypeModelAssociations() {
  StaffDocumentTypeModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  StaffDocumentTypeModel.belongsTo(StaffDocumentCategoryModel, {
    foreignKey: { name: "category" },
    as: "Category",
  });
}

function initializeStaffDocumentModelAssociations() {
  StaffDocumentModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  StaffDocumentModel.belongsTo(StaffProfileModel, {
    foreignKey: { name: "staff" },
    as: "Staff",
  });
  StaffDocumentModel.belongsTo(StaffDocumentCategoryModel, {
    foreignKey: { name: "category" },
    as: "Category",
  });
  StaffDocumentModel.belongsTo(StaffDocumentTypeModel, {
    foreignKey: { name: "type" },
    as: "Type",
  });
  StaffDocumentModel.belongsToMany(AttachmentModel, {
    through: "staff_documents_attachments",
    foreignKey: "relation",
    otherKey: "attachment",
  });
}

function initializeIncidentReportModelAssociations() {
  IncidentReportModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  IncidentReportModel.belongsTo(ClientProfileModel, {
    foreignKey: { name: "client", allowNull: false },
    as: "Client",
  });
  IncidentReportModel.belongsTo(StaffProfileModel, {
    foreignKey: {
      name: "manager",
    },
    as: "Manager",
  });
  IncidentReportModel.belongsToMany(AttachmentModel, {
    through: "incident_reports_attachments",
    foreignKey: "relation",
    otherKey: "attachment",
  });
  IncidentReportModel.belongsToMany(StaffProfileModel, {
    through: "incident_reports_staff_profiles",
    foreignKey: "incident",
    otherKey: "staff",
    as: "Staff",
  });
  IncidentReportModel.belongsToMany(IncidentTypeModel, {
    through: "incident_reports_incident_types",
    foreignKey: "incident",
    otherKey: "type",
    as: "Types",
  });
}

function initializeKeyDecisionModelAssociations() {
  KeyDecisionModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  KeyDecisionModel.belongsTo(StaffProfileModel, {
    foreignKey: { name: "staff", allowNull: false },
    as: "Staff",
  });
}

function initializeRestrictivePracticeLogModelAssociations() {
  RestrictivePracticeLogModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  RestrictivePracticeLogModel.belongsToMany(StaffProfileModel, {
    through: "restrictive_practice_logs_staff_profiles",
    foreignKey: "relation",
    otherKey: "staff",
    as: "Staff",
  });
  RestrictivePracticeLogModel.belongsTo(ClientProfileModel, {
    foreignKey: { name: "client", allowNull: false },
    as: "Client",
  });
  RestrictivePracticeLogModel.hasMany(RestrictivePracticeLogTypeModel, {
    foreignKey: "restrictive_practice_log",
    sourceKey: "id",
    as: 'Types',
  });
}

function initializeTeamModelAssociations() {
  TeamModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  TeamModel.belongsToMany(StaffProfileModel, {
    through: "teams_staff_profiles",
    foreignKey: "team",
    otherKey: "staff",
    as: "Staff",
  });
  TeamModel.belongsToMany(ClientProfileModel, {
    through: "teams_client_profiles",
    foreignKey: "team",
    otherKey: "client",
    as: "Client",
  });
}

function initializeShiftRecordModelAssociations() {
  ShiftRecordModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  ShiftRecordModel.belongsToMany(StaffProfileModel, {
    through: "shift_records_staff_profiles",
    foreignKey: "shift",
    otherKey: "staff",
    as: "Staff",
  });
  ShiftRecordModel.belongsToMany(ClientProfileModel, {
    through: "shift_records_client_profiles",
    foreignKey: "shift",
    otherKey: "client",
    as: "Client",
  });
  ShiftRecordModel.belongsToMany(ServiceModel, {
    through: "shift_records_services",
    foreignKey: "shift",
    otherKey: "service",
  });
  ShiftRecordModel.belongsTo(ShiftRepeatModel, {
    foreignKey: {
      name: "repeat",
    },
    as: "Repeat",
  });
}

function initializeShiftRepeatModelAssociations() {
  ShiftRepeatModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
}

function initializePolicyModelAssociations() {
  PolicyModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  PolicyModel.belongsToMany(AttachmentModel, {
    through: "policies_attachments",
    foreignKey: "relation",
    otherKey: "attachment",
  });
}

function initializeProgressReportModelAssociations() {
  ProgressReportModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  ProgressReportModel.belongsTo(StaffProfileModel, {
    foreignKey: { name: "staff", allowNull: false },
    as: "Staff",
  });
  ProgressReportModel.belongsTo(ClientProfileModel, {
    foreignKey: { name: "client", allowNull: false },
    as: "Client",
  });
  ProgressReportModel.belongsToMany(AttachmentModel, {
    through: "progress_reports_attachments",
    foreignKey: "relation",
    otherKey: "attachment",
  });
}

function initializePolicyReviewModelAssociations() {
  PolicyReviewModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  PolicyReviewModel.belongsTo(StaffProfileModel, {
    foreignKey: { name: "staff" },
    as: "Staff",
  });
  PolicyReviewModel.belongsTo(PolicyModel, {
    foreignKey: { name: "policy" },
    as: "Policy",
  });
  PolicyReviewModel.belongsToMany(AttachmentModel, {
    through: "policy_reviews_attachments",
    foreignKey: "relation",
    otherKey: "attachment",
  });
}

function initializeTimesheetModelAssociations() {
  TimesheetModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  TimesheetModel.belongsTo(StaffProfileModel, {
    foreignKey: { name: "staff", allowNull: false },
    as: "Staff",
  });
  TimesheetModel.belongsTo(ShiftRecordModel, {
    foreignKey: { name: "shift", allowNull: false },
    as: "Shift",
  });
}

function initializeInvoiceModelAssociations() {
  InvoiceModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  InvoiceModel.belongsTo(ClientProfileModel, {
    foreignKey: { name: "client", allowNull: false },
    as: "Client",
  });
  InvoiceModel.belongsTo(ShiftRecordModel, {
    foreignKey: { name: "shift", allowNull: false },
    as: "Shift",
  });
}

function initializePayLevelModelAssociations() {
  PayLevelModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
}

function initializeServiceModelAssociations() {
  ServiceModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  ServiceModel.belongsToMany(PayLevelModel, {
    through: "services_pay_levels",
    foreignKey: "service",
    otherKey: "paylevel",
  });
}

function initializeIntegrationModelAssociations() {
  IntegrationModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  IntegrationModel.hasMany(IntegrationExternalDataModel, {
    foreignKey: "integration",
    sourceKey: "id",
  });
}

function initializeIntegrationExternalDataModelAssociations() {
  IntegrationExternalDataModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  IntegrationExternalDataModel.belongsTo(IntegrationModel, {
    foreignKey: { name: "integration", allowNull: false },
  });
}

function initializeLegislationRegisterModelAssociations() {
  LegislationRegisterModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  LegislationRegisterModel.belongsToMany(AttachmentModel, {
    through: "legislation_registers_attachments",
    foreignKey: "relation",
    otherKey: "attachment",
  });
}

function initializeTemplateModelAssociations() {
  TemplateModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  TemplateModel.belongsToMany(AttachmentModel, {
    through: "templates_attachments",
    foreignKey: "relation",
    otherKey: "attachment",
  });
}

function initializeProcessModelAssociations() {
  ProcessModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  ProcessModel.belongsToMany(AttachmentModel, {
    through: "processes_attachments",
    foreignKey: "relation",
    otherKey: "attachment",
  });
}

function initializeRpdhsResourceModelAssociations() {
  RpdhsResourceModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  RpdhsResourceModel.belongsToMany(AttachmentModel, {
    through: "rpdhs_resources_attachments",
    foreignKey: "relation",
    otherKey: "attachment",
  });
}

function initializePracticeGuideModelAssociations() {
  PracticeGuideModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  PracticeGuideModel.belongsToMany(AttachmentModel, {
    through: "practice_guides_attachments",
    foreignKey: "relation",
    otherKey: "attachment",
  });
}

function initializeInternalRegisterModelAssociations() {
  InternalRegisterModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  InternalRegisterModel.belongsToMany(AttachmentModel, {
    through: "internal_registers_attachments",
    foreignKey: "relation",
    otherKey: "attachment",
  });
}

function initializeRestrictivePracticeRegisterModelAssociations() {
  RestrictivePracticeRegisterModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  RestrictivePracticeRegisterModel.belongsTo(ClientProfileModel, {
    foreignKey: { name: "client", allowNull: true },
    as: "Client",
  });
}

function initializeClientContactModelAssociations() {
  ClientContactModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  ClientContactModel.belongsTo(ClientProfileModel, {
    foreignKey: { name: "client", allowNull: false },
    as: "Client",
  });
}

function initializeOnCallLogModelAssociations() {
  OnCallLogModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  OnCallLogModel.belongsTo(StaffProfileModel, {
    foreignKey: { name: "staff", allowNull: false },
    as: "Staff",
  });
  OnCallLogModel.belongsTo(ClientProfileModel, {
    foreignKey: { name: "client" },
    as: "Client",
  });
}

function initializeParticipantCommunicationLogModelAssociations() {
  ParticipantCommunicationLogModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  ParticipantCommunicationLogModel.belongsTo(StaffProfileModel, {
    foreignKey: { name: "staff", allowNull: false },
    as: "Staff",
  });
  ParticipantCommunicationLogModel.belongsTo(ClientProfileModel, {
    foreignKey: { name: "client", allowNull: false },
    as: "Client",
  });
  ParticipantCommunicationLogModel.belongsToMany(AttachmentModel, {
    through: "participant_communication_logs_attachments",
    foreignKey: "relation",
    otherKey: "attachment",
  });
}

function initializeStaffSupervisionLogModelAssociations() {
  StaffSupervisionLogModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  StaffSupervisionLogModel.belongsTo(StaffProfileModel, {
    foreignKey: { name: "staff", allowNull: false },
    as: "Staff",
  });
  StaffSupervisionLogModel.belongsToMany(AttachmentModel, {
    through: "staff_supervision_logs_attachments",
    foreignKey: "relation",
    otherKey: "attachment",
  });
}

function initializeParticipantMedicationChartModelAssociations() {
  ParticipantMedicationChartModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  ParticipantMedicationChartModel.belongsTo(StaffProfileModel, {
    foreignKey: { name: "staff", allowNull: false },
    as: "Staff",
  });
  ParticipantMedicationChartModel.belongsTo(ClientProfileModel, {
    foreignKey: { name: "client", allowNull: false },
    as: "Client",
  });
  ParticipantMedicationChartModel.belongsToMany(AttachmentModel, {
    through: "participant_medication_charts_attachments",
    foreignKey: "relation",
    otherKey: "attachment",
  });
}

function initializeRosterSettingModelAssociations() {
  RosterSettingModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
}
function initializeProgressNoteSettingsModelAssociations() {
  ProgressNoteSettingsModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
}

function initializeServiceDeliveryModelAssociations() {
  ServiceDeliveryModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  ServiceDeliveryModel.belongsTo(StaffProfileModel, {
    foreignKey: { name: "staff", allowNull: false },
    as: "Staff",
  });
  ServiceDeliveryModel.belongsTo(ClientProfileModel, {
    foreignKey: { name: "client", allowNull: false },
    as: "Client",
  });
  ServiceDeliveryModel.belongsTo(ServiceModel, {
    foreignKey: { name: "service", allowNull: false },
    as: "Service",
  });
  ServiceDeliveryModel.belongsTo(ProgressNoteModel, {
    foreignKey: { name: "progressnote", allowNull: false },
    as: "Progressnote",
  });
  ServiceDeliveryModel.belongsTo(ShiftRecordModel, {
    foreignKey: { name: "shift", allowNull: false },
    as: "Shift",
  });
  ServiceDeliveryModel.belongsToMany(AttachmentModel, {
    through: "service_delivery_attachments",
    foreignKey: "relation",
    otherKey: "attachment",
  });
}

function initializeExpenseModelAssociations() {
  ExpenseModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  ExpenseModel.belongsTo(StaffProfileModel, {
    foreignKey: { name: "staff", allowNull: false },
    as: "Staff",
  });
  ExpenseModel.belongsTo(ClientProfileModel, {
    foreignKey: { name: "client" },
    as: "Client",
  });
  ExpenseModel.belongsToMany(AttachmentModel, {
    through: "expenses_attachments",
    foreignKey: "relation",
    otherKey: "attachment",
  });
}

function initializeParticipantGoalModelAssociations() {
  ParticipantGoalModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  ParticipantGoalModel.belongsTo(StaffProfileModel, {
    foreignKey: { name: "staff", allowNull: false },
    as: "Staff",
  });
  ParticipantGoalModel.belongsTo(ClientProfileModel, {
    foreignKey: { name: "client", allowNull: false },
    as: "Client",
  });
}

function initializeAlertConfigurationAssociations() {
  AlertConfigurationModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
}

function initializeExternalContractModelAssociations() {
  ExternalContractModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  ExternalContractModel.belongsTo(StaffProfileModel, {
    foreignKey: { name: "staff", allowNull: false },
    as: "Staff",
  });
  ExternalContractModel.belongsToMany(AttachmentModel, {
    through: "external_contracts_attachments",
    foreignKey: "relation",
    otherKey: "attachment",
  });
}

function initializeRegulatoryComplianceModelAssociations() {
  RegulatoryComplianceModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  RegulatoryComplianceModel.belongsTo(StaffProfileModel, {
    foreignKey: { name: "staff", allowNull: false },
    as: "Staff",
  });
  RegulatoryComplianceModel.belongsToMany(AttachmentModel, {
    through: "regulatory_compliances_attachments",
    foreignKey: "relation",
    otherKey: "attachment",
  });
}

function initializeMedicationRegisterModelAssociations() {
  MedicationRegisterModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  MedicationRegisterModel.belongsTo(StaffProfileModel, {
    foreignKey: { name: "staff", allowNull: false },
    as: "Staff",
  });
  MedicationRegisterModel.belongsTo(ClientProfileModel, {
    foreignKey: { name: "client", allowNull: false },
    as: "Client",
  });
}

function initializeContinuousImprovementModelAssociations() {
  ContinuousImprovementModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  ContinuousImprovementModel.belongsTo(StaffProfileModel, {
    foreignKey: { name: "staff", allowNull: false },
    as: "Staff",
  });
}
