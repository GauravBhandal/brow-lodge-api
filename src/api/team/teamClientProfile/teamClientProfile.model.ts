import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../../components/sequelize/manager";
import {
  TeamClientProfile,
  CreateBulkTeamClientProfileProps,
} from "./teamClientProfile.types";

class TeamClientProfileModel<
    ModelAttributes = TeamClientProfile,
    ModelCreationAttributes = CreateBulkTeamClientProfileProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements TeamClientProfile
{
  team!: TeamClientProfile["team"];
  client!: TeamClientProfile["client"];
}

modelManager.init(
  "TeamClientProfile",
  TeamClientProfileModel,
  {
    team: {
      type: Sequelize.UUIDV4,
      allowNull: false,
    },
    client: {
      type: Sequelize.UUIDV4,
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
    paranoid: false, // <-- We are setting to false because of the update functionality of this Model
    tableName: "teams_client_profiles",
  }
);

export default TeamClientProfileModel;
