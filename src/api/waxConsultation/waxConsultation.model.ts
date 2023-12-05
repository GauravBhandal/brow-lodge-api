import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import {
  WaxConsultation,
  CreateWaxConsultationProps,
} from "./waxConsultation.types";

class WaxConsultationModel<
    ModelAttributes = WaxConsultation,
    ModelCreationAttributes = CreateWaxConsultationProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements WaxConsultation
{
  doctorName!: WaxConsultation["doctorName"];
  doctorAddress!: WaxConsultation["doctorAddress"];
  waxTreatment!: WaxConsultation["waxTreatment"];
  containProducts: WaxConsultation["containProducts"];
  disease: WaxConsultation["disease"];
  clientSign: WaxConsultation["clientSign"];
  date!: WaxConsultation["date"];
  client!: WaxConsultation["client"];
  Client: WaxConsultation["Client"];
  company!: WaxConsultation["company"];
  Company: WaxConsultation["Company"];
}

modelManager.init(
  "WaxConsultation",
  WaxConsultationModel,
  {
    doctorName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    doctorAddress: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    clientSign: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    waxTreatment: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    containProducts: {
      type: Sequelize.ARRAY(Sequelize.STRING),
    },
    disease: {
      type: Sequelize.ARRAY(Sequelize.STRING),
    },
    date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
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
    tableName: "eyelash_extension",
  }
);

export default WaxConsultationModel;
