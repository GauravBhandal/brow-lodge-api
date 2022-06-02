import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import { ClientRisk, CreateClientRiskProps } from "./clientRisk.types";

class ClientRiskModel<
    ModelAttributes = ClientRisk,
    ModelCreationAttributes = CreateClientRiskProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements ClientRisk
{
  date!: ClientRisk["date"];
  levelOfRisk!: ClientRisk["levelOfRisk"];
  likelihood!: ClientRisk["likelihood"];
  consequences!: ClientRisk["consequences"];
  riskDescription!: ClientRisk["riskDescription"];
  mitigationStrategy!: ClientRisk["mitigationStrategy"];
  monitoringStrategy!: ClientRisk["monitoringStrategy"];
  assessmentType: ClientRisk["assessmentType"];
  staff!: ClientRisk["staff"];
  Staff: ClientRisk["Staff"];
  client!: ClientRisk["client"];
  Client: ClientRisk["Client"];
  company!: ClientRisk["company"];
  Company: ClientRisk["Company"];
  Attachments: ClientRisk["Attachments"];
}

modelManager.init(
  "ClientRisk",
  ClientRiskModel,
  {
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    levelOfRisk: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    likelihood: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    consequences: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    riskDescription: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    mitigationStrategy: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    monitoringStrategy: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    assessmentType: {
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
    paranoid: true,
    tableName: "client_risks",
  }
);

export default ClientRiskModel;
