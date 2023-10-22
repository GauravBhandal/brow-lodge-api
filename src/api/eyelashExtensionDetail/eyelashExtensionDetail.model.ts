import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import {
  EyelashExtensionDetail,
  CreateEyelashExtensionDetailProps,
} from "./eyelashExtensionDetail.types";

class EyelashExtensionDetailModel<
    ModelAttributes = EyelashExtensionDetail,
    ModelCreationAttributes = CreateEyelashExtensionDetailProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements EyelashExtensionDetail
{
  date!: EyelashExtensionDetail["date"];
  therapist!: EyelashExtensionDetail["therapist"];
  feedback: EyelashExtensionDetail["feedback"];
  eyeFeedback: EyelashExtensionDetail["eyeFeedback"];
  careFeedback: EyelashExtensionDetail["careFeedback"];
  eyelash!: EyelashExtensionDetail["eyelash"];
  Eyelash: EyelashExtensionDetail["Eyelash"];
  company!: EyelashExtensionDetail["company"];
  Company: EyelashExtensionDetail["Company"];
}

modelManager.init(
  "EyelashExtensionDetail",
  EyelashExtensionDetailModel,
  {
    date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    therapist: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    feedback: {
      type: Sequelize.STRING,
    },
    eyeFeedback: {
      type: Sequelize.STRING,
    },
    careFeedback: {
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

export default EyelashExtensionDetailModel;
