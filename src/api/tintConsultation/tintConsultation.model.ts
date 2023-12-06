import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import {
  TintConsultation,
  CreateTintConsultationProps,
} from "./tintConsultation.types";

class TintConsultationModel<
    ModelAttributes = TintConsultation,
    ModelCreationAttributes = CreateTintConsultationProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements TintConsultation
{
  doctorName!: TintConsultation["doctorName"];
  doctorAddress!: TintConsultation["doctorAddress"];
  colourEyebrow!: TintConsultation["colourEyebrow"];
  colourEyelash!: TintConsultation["colourEyelash"];
  skinPatchTest!: TintConsultation["skinPatchTest"];
  skinPatchTestDate: TintConsultation["skinPatchTestDate"];
  disease: TintConsultation["disease"];
  clientSign: TintConsultation["clientSign"];
  date!: TintConsultation["date"];
  client!: TintConsultation["client"];
  Client: TintConsultation["Client"];
  company!: TintConsultation["company"];
  Company: TintConsultation["Company"];
}

modelManager.init(
  "TintConsultation",
  TintConsultationModel,
  {
    doctorName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    doctorAddress: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    colourEyebrow: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    colourEyelash: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    clientSign: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    skinPatchTest: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    disease: {
      type: Sequelize.ARRAY(Sequelize.STRING),
    },
    date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    skinPatchTestDate: {
      type: Sequelize.DATEONLY,
    },
  },
  {
    defaultScope: {
      attributes: {
        exclude: ["deleted"],
      },
    },
    underscored: true,
    paranoid: false,
    tableName: "tint_consultation",
  }
);

export default TintConsultationModel;
