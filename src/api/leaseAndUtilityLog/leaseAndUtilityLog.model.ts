import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import {
  LeaseAndUtilityLog,
  CreateLeaseAndUtilityLogProps,
} from "./leaseAndUtilityLog.types";

class LeaseAndUtilityLogModel<
    ModelAttributes = LeaseAndUtilityLog,
    ModelCreationAttributes = CreateLeaseAndUtilityLogProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements LeaseAndUtilityLog
{
  date!: LeaseAndUtilityLog["date"];
  documentName!: LeaseAndUtilityLog["documentName"];
  comments: LeaseAndUtilityLog["comments"];
  staff!: LeaseAndUtilityLog["staff"];
  Staff: LeaseAndUtilityLog["Staff"];
  client!: LeaseAndUtilityLog["client"];
  Client: LeaseAndUtilityLog["Client"];
  company!: LeaseAndUtilityLog["company"];
  Company: LeaseAndUtilityLog["Company"];
  Attachments: LeaseAndUtilityLog["Attachments"];
}

modelManager.init(
  "LeaseAndUtilityLog",
  LeaseAndUtilityLogModel,
  {
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    documentName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    comments: {
      type: Sequelize.STRING,
    },
  },
  {
    underscored: true,
    paranoid: true,
    tableName: "lease_and_utility_logs",
  }
);

export default LeaseAndUtilityLogModel;
