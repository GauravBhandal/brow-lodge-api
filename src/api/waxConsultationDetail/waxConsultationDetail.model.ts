import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import {
  WaxConsultationDetail,
  CreateWaxConsultationDetailProps,
} from "./waxConsultationDetail.types";

class WaxConsultationDetailModel<
    ModelAttributes = WaxConsultationDetail,
    ModelCreationAttributes = CreateWaxConsultationDetailProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements WaxConsultationDetail
{
  date!: WaxConsultationDetail["date"];
  therapist!: WaxConsultationDetail["therapist"];
  skinBefore: WaxConsultationDetail["skinBefore"];
  treatment: WaxConsultationDetail["treatment"];
  skinAfter: WaxConsultationDetail["skinAfter"];
  careGiven: WaxConsultationDetail["careGiven"];
  clientSign: WaxConsultationDetail["clientSign"];
  wax!: WaxConsultationDetail["wax"];
  Wax: WaxConsultationDetail["Wax"];
  company!: WaxConsultationDetail["company"];
  Company: WaxConsultationDetail["Company"];
}

modelManager.init(
  "WaxConsultationDetail",
  WaxConsultationDetailModel,
  {
    date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    therapist: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    skinBefore: {
      type: Sequelize.STRING,
    },
    treatment: {
      type: Sequelize.STRING,
    },
    skinAfter: {
      type: Sequelize.STRING,
    },
    careGiven: {
      type: Sequelize.STRING,
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
    tableName: "wax_consultation_details",
  }
);

export default WaxConsultationDetailModel;
