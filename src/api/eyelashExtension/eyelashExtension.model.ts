import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import {
  EyelashExtension,
  CreateEyelashExtensionProps,
} from "./eyelashExtension.types";

class EyelashExtensionModel<
    ModelAttributes = EyelashExtension,
    ModelCreationAttributes = CreateEyelashExtensionProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements EyelashExtension
{
  technicianName!: EyelashExtension["technicianName"];
  doctorName!: EyelashExtension["doctorName"];
  doctorAddress!: EyelashExtension["doctorAddress"];
  isPregnant!: EyelashExtension["isPregnant"];
  eyeSyndrome!: EyelashExtension["eyeSyndrome"];
  hrt!: EyelashExtension["hrt"];
  eyeComplaint!: EyelashExtension["eyeComplaint"];
  skinPatchTest!: EyelashExtension["skinPatchTest"];
  date!: EyelashExtension["date"];
  skinPatchTestDate: EyelashExtension["skinPatchTestDate"];
  client!: EyelashExtension["client"];
  Client: EyelashExtension["Client"];
  company!: EyelashExtension["company"];
  Company: EyelashExtension["Company"];
}

modelManager.init(
  "EyelashExtension",
  EyelashExtensionModel,
  {
    technicianName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    doctorName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    doctorAddress: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    isPregnant: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    eyeSyndrome: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    hrt: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    eyeComplaint: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    skinPatchTest: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
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
    tableName: "eyelash_extension",
  }
);

export default EyelashExtensionModel;
