import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../../components/sequelize/manager";
import {
  TeamStaffProfile,
  CreateBulkTeamStaffProfileProps,
} from "./teamStaffProfile.types";

class TeamStaffProfileModel<
    ModelAttributes = TeamStaffProfile,
    ModelCreationAttributes = CreateBulkTeamStaffProfileProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements TeamStaffProfile
{
  team!: TeamStaffProfile["team"];
  staff!: TeamStaffProfile["staff"];
}

modelManager.init(
  "TeamStaffProfile",
  TeamStaffProfileModel,
  {
    team: {
      type: Sequelize.UUIDV4,
      allowNull: false,
    },
    staff: {
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
    tableName: "teams_staff_profiles",
  }
);

export default TeamStaffProfileModel;
