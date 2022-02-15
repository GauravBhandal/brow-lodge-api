import { DefaultSchemaConfig } from "../../../components/sequelize/manager";
import { Team } from "..";
import { ClientProfile } from "../../clientProfile";

export interface TeamClientProfile extends DefaultSchemaConfig {
  team: Team["id"];
  client: ClientProfile["id"];
}

export interface CreateBulkTeamClientProfileProps {
  team: TeamClientProfile["team"];
  client: TeamClientProfile["client"][];
}

export interface UpdateBulkTeamClientProfileProps
  extends CreateBulkTeamClientProfileProps {}

export interface DeleteBulkTeamClientProfileProps {
  team: TeamClientProfile["team"];
}
