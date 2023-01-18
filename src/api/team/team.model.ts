import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import { Team, CreateTeamProps } from "./team.types";

class TeamModel<
    ModelAttributes = Team,
    ModelCreationAttributes = CreateTeamProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements Team
{
  name!: Team["name"];
  permissions: Team["permissions"];
  Staff: Team["Staff"];
  Client: Team["Client"];
  company!: Team["company"];
  Company: Team["Company"];
  archived: Team["archived"];
}

modelManager.init(
  "Team",
  TeamModel,
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    permissions: {
      type: Sequelize.BOOLEAN,
    },
    archived: {
      type: Sequelize.BOOLEAN,
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
    tableName: "teams",
  }
);

export default TeamModel;
