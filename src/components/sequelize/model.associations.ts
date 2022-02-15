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
// import { SleepLogModel } from "../../api/sleepLog";
import { TemperatureLogModel } from "../../api/temperatureLog";
import { OxygenSaturationLogModel } from "../../api/oxygenSaturationLog";
import { SeizureLogModel } from "../../api/seizureLog";
import { PrnAdminLogModel } from "../../api/prnAdminLog";
import { PrnBalanceLogModel } from "../../api/prnBalanceLog";
import { ClientBehaviourModel } from "../../api/clientBehaviour";
import { VehicleLogModel } from "../../api/vehicleLog";
import { InjuryReportModel } from "../../api/injuryReport";
import { ExpenseReimbursementModel } from "../../api/expenseReimbursement";
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
// import { IncidentModel } from "../../api/incident";
import { TeamModel } from "../../api/team";
import { ShiftTypeModel } from "../../api/shiftType";

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
    // initializeSleepLogModelAssociations();
    initializeTemperatureLogModelAssociations();
    initializeOxygenSaturationLogModelAssociations();
    initializeSeizureLogModelAssociations();
    initializePrnAdminLogModelAssociations();
    initializePrnBalanceLogModelAssociations();
    initializeClientBehaviourModelAssociations();
    initializeVehicleLogModelAssociations();
    initializeInjuryReportModelAssociations();
    initializeExpenseReimbursementModelAssociations();
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
    // initializeIncidentModelAssociations();
    initializeTeamModelAssociations();
    initializeShiftTypeModelAssociations();
  },
};

function initializeClientProfileModelAssociations() {
  ClientProfileModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  ClientProfileModel.belongsTo(AttachmentModel, {
    foreignKey: "attachment",
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
  ProgressNoteModel.belongsTo(StaffProfileModel, {
    foreignKey: { name: "staff", allowNull: false },
    as: "Staff",
  });
  ProgressNoteModel.belongsTo(ClientProfileModel, {
    foreignKey: { name: "client", allowNull: false },
    as: "Client",
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

// function initializeSleepLogModelAssociations() {
//   SleepLogModel.belongsTo(CompanyModel, {
//     foreignKey: { name: "company", allowNull: false },
//   });
//   SleepLogModel.belongsTo(StaffProfileModel, {
//     foreignKey: { name: "staff", allowNull: false },
//     as: "Staff",
//   });
//   SleepLogModel.belongsTo(ClientProfileModel, {
//     foreignKey: { name: "client", allowNull: false },
//     as: "Client",
//   });
// }

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

function initializeExpenseReimbursementModelAssociations() {
  ExpenseReimbursementModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  ExpenseReimbursementModel.belongsTo(StaffProfileModel, {
    foreignKey: { name: "staff", allowNull: false },
    as: "Staff",
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
}

function initializeCompanyAssetModelAssociations() {
  CompanyAssetModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  CompanyAssetModel.belongsTo(StaffProfileModel, {
    foreignKey: { name: "staff", allowNull: false },
    as: "Staff",
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
  WhsLogModel.belongsTo(StaffProfileModel, {
    foreignKey: { name: "staff", allowNull: false },
    as: "Staff",
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

// function initializeIncidentModelAssociations() {
//   IncidentModel.belongsTo(CompanyModel, {
//     foreignKey: { name: "company", allowNull: false },
//   });
//   IncidentModel.belongsTo(ClientProfileModel, {
//     foreignKey: { name: "client", allowNull: false },
//     as: "Client",
//   });
//   IncidentModel.belongsToMany(AttachmentModel, {
//     through: "incident_attachments",
//     foreignKey: "relation",
//     otherKey: "attachment",
//   });
// }

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

function initializeShiftTypeModelAssociations() {
  ShiftTypeModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
}
