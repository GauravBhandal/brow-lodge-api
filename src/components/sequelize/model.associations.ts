import { RoleModel } from "../../api/role";
import { StaffProfileModel } from "../../api/staffProfile";
import { UserModel } from "../../api/user";
import { CompanyModel } from "../../api/company";

import { AttachmentModel } from "../../api/attachment";

import { StaffDocumentCategoryModel } from "../../api/staffDocumentCategory";
import { StaffDocumentTypeModel } from "../../api/staffDocumentType";
import { StaffDocumentModel } from "../../api/staffDocument";
import { IntegrationModel } from "../../api/integration";
import IntegrationExternalDataModel from "../../api/integration/integrationExternalData/integrationExternalData.model";
import { SiteModel } from "../../api/site";
import { ShiftRecordModel } from "../../api/shiftRecord";

export default {
  initialize() {
    initializeRoleModelAssociations();
    initializeStaffProfileModelAssociations();
    initializeUserModelAssociations();
    initializeStaffDocumentCategoryModelAssociations();
    initializeStaffDocumentTypeModelAssociations();
    initializeStaffDocumentModelAssociations();
    initializeIntegrationModelAssociations();
    initializeIntegrationExternalDataModelAssociations();
    initializeSiteModelAssociations();
    initializeShiftRecordModelAssociations();
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

function initializeSiteModelAssociations() {
  SiteModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
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

function initializeShiftRecordModelAssociations() {
  ShiftRecordModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
  ShiftRecordModel.belongsTo(StaffProfileModel, {
    foreignKey: { name: "staff", allowNull: false },
    as: "Staff",
  });
  ShiftRecordModel.belongsTo(SiteModel, {
    foreignKey: { name: "site" },
    as: "Site",
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
