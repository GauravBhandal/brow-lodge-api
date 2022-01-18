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
import { PrnAdminLogModel } from "../../api/prnAdminLog";

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
    initializePrnAdminLogModelAssociations();
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
}

function initializeUserModelAssociations() {
  UserModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  UserModel.belongsToMany(RoleModel, {
    through: "users_roles",
    foreignKey: "user",
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
