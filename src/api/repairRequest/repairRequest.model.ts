import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import { RepairRequest, CreateRepairRequestProps } from "./repairRequest.types";

class RepairRequestModel<
    ModelAttributes = RepairRequest,
    ModelCreationAttributes = CreateRepairRequestProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements RepairRequest
{
  problem!: RepairRequest["problem"];
  risk!: RepairRequest["risk"];
  location!: RepairRequest["location"];
  priority!: RepairRequest["priority"];
  status!: RepairRequest["status"];
  staff!: RepairRequest["staff"];
  Staff: RepairRequest["Staff"];
  company!: RepairRequest["company"];
  Company: RepairRequest["Company"];
  Attachments: RepairRequest["Attachments"];
  archived: RepairRequest["archived"];
  closureDate: RepairRequest["closureDate"];
  closedBy: RepairRequest["closedBy"];
}

modelManager.init(
  "RepairRequest",
  RepairRequestModel,
  {
    problem: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    risk: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    location: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    priority: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    archived: {
      type: Sequelize.BOOLEAN,
    },
    closureDate: {
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
    tableName: "repair_requests",
  }
);

export default RepairRequestModel;
