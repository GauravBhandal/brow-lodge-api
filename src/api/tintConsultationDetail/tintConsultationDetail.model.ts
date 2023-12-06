import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import {
  TintConsultationDetail,
  CreateTintConsultationDetailProps,
} from "./tintConsultationDetail.types";

class TintConsultationDetailModel<
    ModelAttributes = TintConsultationDetail,
    ModelCreationAttributes = CreateTintConsultationDetailProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements TintConsultationDetail
{
  date!: TintConsultationDetail["date"];
  therapist!: TintConsultationDetail["therapist"];
  browColour: TintConsultationDetail["browColour"];
  lashColour: TintConsultationDetail["lashColour"];
  overleafCondition: TintConsultationDetail["overleafCondition"];
  careGiven: TintConsultationDetail["careGiven"];
  clientSign: TintConsultationDetail["clientSign"];
  tint!: TintConsultationDetail["tint"];
  Tint: TintConsultationDetail["Tint"];
  company!: TintConsultationDetail["company"];
  Company: TintConsultationDetail["Company"];
}

modelManager.init(
  "TintConsultationDetail",
  TintConsultationDetailModel,
  {
    date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    therapist: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    browColour: {
      type: Sequelize.STRING,
    },
    lashColour: {
      type: Sequelize.STRING,
    },
    overleafCondition: {
      type: Sequelize.STRING,
    },
    careGiven: {
      type: Sequelize.BOOLEAN,
    },
    clientSign: {
      type: Sequelize.STRING,
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
    tableName: "eyelash_extension_details",
  }
);

export default TintConsultationDetailModel;
