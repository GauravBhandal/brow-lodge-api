import { RoleModel } from "../../api/role";
import { StaffProfileModel } from "../../api/staffProfile";
import { UserModel } from "../../api/user";
import { CompanyModel } from "../../api/company";

import { AttachmentModel } from "../../api/attachment";
import { ClientProfileModel } from "../../api/clientProfile";
import { EyelashExtensionModel } from "../../api/eyelashExtension";
import { EyelashExtensionDetailModel } from "../../api/eyelashExtensionDetail";

export default {
  initialize() {
    initializeRoleModelAssociations();
    initializeStaffProfileModelAssociations();
    initializeClientProfileModelAssociations();
    initializeUserModelAssociations();
    initializeEyelashExtensionModelAssociations();
    initializeEyelashExtentionDetailModelAssociations();
  },
};

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

function initializeClientProfileModelAssociations() {
  ClientProfileModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  ClientProfileModel.belongsTo(AttachmentModel, {
    foreignKey: "attachment",
  });
}

function initializeEyelashExtensionModelAssociations() {
  EyelashExtensionModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  EyelashExtensionModel.belongsTo(ClientProfileModel, {
    foreignKey: { name: "client" },
    as: "Client",
  });
  EyelashExtensionModel.hasMany(EyelashExtensionDetailModel, {
    foreignKey: "eyelash",
    sourceKey: "id",
    as: "Details",
  });
}

function initializeEyelashExtentionDetailModelAssociations() {
  EyelashExtensionDetailModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  EyelashExtensionDetailModel.belongsTo(EyelashExtensionModel, {
    foreignKey: { name: "eyelash" },
    as: "Eyelash",
  });
}
