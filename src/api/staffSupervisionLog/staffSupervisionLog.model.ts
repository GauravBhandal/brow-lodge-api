import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import {
  StaffSupervisionLog,
  CreateStaffSupervisionLogProps,
} from "./staffSupervisionLog.types";

class StaffSupervisionLogModel<
    ModelAttributes = StaffSupervisionLog,
    ModelCreationAttributes = CreateStaffSupervisionLogProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements StaffSupervisionLog
{
  date!: StaffSupervisionLog["date"];
  nextDueOn!: StaffSupervisionLog["nextDueOn"];
  type!: StaffSupervisionLog["type"];
  notes: StaffSupervisionLog["notes"];
  staff!: StaffSupervisionLog["staff"];
  Staff: StaffSupervisionLog["Staff"];
  company!: StaffSupervisionLog["company"];
  Company: StaffSupervisionLog["Company"];
  Attachments: StaffSupervisionLog["Attachments"];
  archived: StaffSupervisionLog["archived"];
}

modelManager.init(
  "StaffSupervisionLog",
  StaffSupervisionLogModel,
  {
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    nextDueOn: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    notes: { type: Sequelize.STRING },
    type: { type: Sequelize.STRING, allowNull: false },
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
    tableName: "staff_supervision_logs",
  }
);

export default StaffSupervisionLogModel;
