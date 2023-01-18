import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import {
  MedicationRegister,
  CreateMedicationRegisterProps,
} from "./medicationRegister.types";

class MedicationRegisterModel<
    ModelAttributes = MedicationRegister,
    ModelCreationAttributes = CreateMedicationRegisterProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements MedicationRegister
{
  startDate!: MedicationRegister["startDate"];
  endDate: MedicationRegister["endDate"];
  staff!: MedicationRegister["staff"];
  Staff: MedicationRegister["Staff"];
  client!: MedicationRegister["client"];
  Client: MedicationRegister["Client"];
  medicationName!: MedicationRegister["medicationName"];
  administrationType!: MedicationRegister["administrationType"];
  dosage!: MedicationRegister["dosage"];
  frequency!: MedicationRegister["frequency"];
  isPrescribed: MedicationRegister["isPrescribed"];
  notes: MedicationRegister["notes"];
  nextReviewDate: MedicationRegister["nextReviewDate"];
  company!: MedicationRegister["company"];
  Company: MedicationRegister["Company"];
  archived: MedicationRegister["archived"];
}

modelManager.init(
  "MedicationRegister",
  MedicationRegisterModel,
  {
    startDate: { type: Sequelize.DATE, allowNull: false },
    endDate: { type: Sequelize.DATE },
    medicationName: { type: Sequelize.STRING, allowNull: false },
    administrationType: { type: Sequelize.STRING, allowNull: false },
    dosage: { type: Sequelize.STRING, allowNull: false },
    frequency: { type: Sequelize.STRING, allowNull: false },
    isPrescribed: { type: Sequelize.STRING },
    notes: { type: Sequelize.STRING },
    nextReviewDate: { type: Sequelize.DATE },
    archived: { type: Sequelize.BOOLEAN },
  },
  {
    defaultScope: {
      attributes: {
        exclude: ["deleted"],
      },
    },
    underscored: true,
    paranoid: true,
    tableName: "medication_registers",
  }
);

export default MedicationRegisterModel;
