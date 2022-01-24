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
import { TransportBehaviourModel } from "../../api/transportBehaviour";
import { VehicleLogModel } from "../../api/vehicleLog";
import { InjuryReportModel } from "../../api/injuryReport";
import { ExpenseReimbursementModel } from "../../api/expenseReimbursement";
import { DoctorVisitModel } from "../../api/doctorVisit";
import { ClientAssetModel } from "../../api/clientAsset";
import { CompanyAssetModel } from "../../api/companyAsset";
import { RepairRequestModel } from "../../api/repairRequest";
import { ConflictOfInterestModel } from "../../api/conflictOfInterest";
import { CorporateRiskModel } from "../../api/corporateRisk";
import { WhoLogModel } from "../../api/whoLog";
import { MeetingLogModel } from "../../api/meetingLog";
import { ClientRiskModel } from "../../api/clientRisk";
import { StaffSleepDisturbanceModel } from "../../api/staffSleepDisturbance";
import { ResourceModel } from "../../api/resource";
import { DocumentLogModel } from "../../api/documentLog";
import { LeaseAndUtilityLogModel } from "../../api/leaseAndUtilityLog";
import { MaintenanceLogModel } from "../../api/maintenanceLog";
import { FeedbackModel } from "../../api/feedback";

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
    initializeTransportBehaviourModelAssociations();
    initializeVehicleLogModelAssociations();
    initializeInjuryReportModelAssociations();
    initializeExpenseReimbursementModelAssociations();
    initializeDoctorVisitModelAssociations();
    initializeClientAssetModelAssociations();
    initializeCompanyAssetModelAssociations();
    initializeRepairRequestModelAssociations();
    initializeConflictOfInterestModelAssociations();
    initializeCorporateRiskModelAssociations();
    initializewhoLogModelAssociations();
    initializeMeetingLogModelAssociations();
    initializeClientRiskModelAssociations();
    initializeStaffSleepDisturbanceModelAssociations();
    initializeResourceModelAssociations();
    initializeDocumentLogModelAssociations();
    initializeLeaseAndUtilityLogModelAssociations();
    initializeMaintenanceLogModelAssociations();
    initializeFeedbackModelAssociations();
  },
};

function initializeClientProfileModelAssociations() {
  ClientProfileModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
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
    foreignKey: { name: "user", allowNull: true },
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

function initializeTransportBehaviourModelAssociations() {
  TransportBehaviourModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  TransportBehaviourModel.belongsTo(StaffProfileModel, {
    foreignKey: { name: "staff", allowNull: false },
    as: "Staff",
  });
  TransportBehaviourModel.belongsTo(ClientProfileModel, {
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

function initializewhoLogModelAssociations() {
  WhoLogModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  WhoLogModel.belongsTo(StaffProfileModel, {
    foreignKey: { name: "staff", allowNull: false },
    as: "Staff",
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
    foreignKey: { name: "client", allowNull: false },
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
}

function initializeDocumentLogModelAssociations() {
  DocumentLogModel.belongsTo(CompanyModel, {
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
    foreignKey: { name: "client", allowNull: false },
    as: "Client",
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
}

function initializeFeedbackModelAssociations() {
  FeedbackModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  FeedbackModel.belongsTo(StaffProfileModel, {
    foreignKey: { name: "staff", allowNull: true },
    as: "Staff",
  });
}
