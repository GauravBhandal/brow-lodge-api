import { RoleModel } from "../../api/role";
import { StaffProfileModel } from "../../api/staffProfile";
import { UserModel } from "../../api/user";
import { CompanyModel } from "../../api/company";

import { AttachmentModel } from "../../api/attachment";
import { ClientProfileModel } from "../../api/clientProfile";

export default {
  initialize() {
    initializeRoleModelAssociations();
    initializeStaffProfileModelAssociations();
    initializeClientProfileModelAssociations();
    initializeUserModelAssociations();
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
