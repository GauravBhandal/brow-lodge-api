import { DefaultSchemaConfig } from "../../../components/sequelize/manager";
import { Team } from "..";
import { StaffProfile } from "../../staffProfile";

export interface TeamStaffProfile extends DefaultSchemaConfig {
  team: Team["id"];
  staff: StaffProfile["id"];
}

export interface CreateBulkTeamStaffProfileProps {
  team: TeamStaffProfile["team"];
  staff: TeamStaffProfile["staff"][];
}

export interface UpdateBulkTeamStaffProfileProps
  extends CreateBulkTeamStaffProfileProps {}

export interface DeleteBulkTeamStaffProfileProps {
  team: TeamStaffProfile["team"];
}
