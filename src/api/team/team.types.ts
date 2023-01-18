import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { StaffProfile } from "../staffProfile";
import { ClientProfile } from "../clientProfile";
import { QueryParams } from "../../common/types";

export interface Team extends DefaultSchemaConfig {
  name: string;
  permissions?: boolean;
  company: Company["id"];
  Company?: Company;
  Staff?: StaffProfile["id"][];
  Client?: ClientProfile["id"][];
  archived?: boolean;
}

export interface CreateTeamProps {
  name: Team["name"];
  company: Team["company"];
  staff: Team["Staff"];
  client: Team["Client"];
}

export interface UpdateTeamProps extends CreateTeamProps {
  id: Team["id"];
}

export interface DeleteTeamProps {
  id: Team["id"];
  company: Team["company"];
}

export interface GetTeamByIdProps extends DeleteTeamProps {}

export interface GetTeamsProps extends QueryParams {
  company: Team["company"];
}
export interface UpdateTeamPermissionsProps {
  company: Team["company"];
  permissions: boolean;
}
