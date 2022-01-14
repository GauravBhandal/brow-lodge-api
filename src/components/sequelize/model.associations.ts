import { CompanyModel } from "../../api/company";
import { ProgressNoteModel } from "../../api/progressNote";

export default {
  initialize() {
    initializeProgressNoteModelAssociations();
    initializeCompanyModelAssociations();
  },
};

function initializeProgressNoteModelAssociations() {
  ProgressNoteModel.belongsTo(CompanyModel, {
    foreignKey: { name: "company", allowNull: false },
  });
}

function initializeCompanyModelAssociations() {
  CompanyModel.hasMany(ProgressNoteModel, {
    foreignKey: "company",
    sourceKey: "id",
  });
}
