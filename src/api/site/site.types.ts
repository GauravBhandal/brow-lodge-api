import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { QueryParams } from "../../common/types";
import { StaffProfile } from "../staffProfile";

export interface Site extends DefaultSchemaConfig {
  name: string;
  address: string;
  numberOfEmployee: Number;
  company: Company["id"];
  Company?: Company;
}

export interface CreateSiteProps {
  name: Site["name"];
  address: Site["address"];
  numberOfEmployee: Site["numberOfEmployee"];
  company: Site["company"];
}

export interface UpdateSiteProps extends CreateSiteProps {
  id: Site["id"];
}

export interface DeleteSiteProps {
  id: Site["id"];
  company: Site["company"];
}

export interface GetSiteByIdProps extends DeleteSiteProps {}

export interface GetSitesProps extends QueryParams {
  company: Site["company"];
}

export interface GetSitesByIdsProps {
  company: Site["company"];
  staff: StaffProfile["id"];
  alreadyAssignedSiteIds: Site["id"][];
}
