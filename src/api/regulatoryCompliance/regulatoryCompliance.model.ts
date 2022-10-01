import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import {
  RegulatoryCompliance,
  CreateRegulatoryComplianceProps,
} from "./regulatoryCompliance.types";

class RegulatoryComplianceModel<
    ModelAttributes = RegulatoryCompliance,
    ModelCreationAttributes = CreateRegulatoryComplianceProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements RegulatoryCompliance
{
  date!: RegulatoryCompliance["date"];
  staff!: RegulatoryCompliance["staff"];
  Staff: RegulatoryCompliance["Staff"];
  title!: RegulatoryCompliance["title"];
  category!: RegulatoryCompliance["category"];
  notes: RegulatoryCompliance["notes"];
  Attachments: RegulatoryCompliance["Attachments"];
  reviewDate: RegulatoryCompliance["reviewDate"];
  company!: RegulatoryCompliance["company"];
  Company: RegulatoryCompliance["Company"];
}

modelManager.init(
  "RegulatoryCompliance",
  RegulatoryComplianceModel,
  {
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    category: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    notes: {
      type: Sequelize.STRING,
    },
    reviewDate: {
      type: Sequelize.DATE,
    },
  },
  {
    defaultScope: {
      attributes: {
        exclude: ["deleted"],
      },
    },
    underscored: true,
    paranoid: true,
    tableName: "regulatory_compliances",
  }
);

export default RegulatoryComplianceModel;
