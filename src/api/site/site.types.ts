import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { ClientProfile } from "../clientProfile";
import { QueryParams } from "../../common/types";

export interface Site extends DefaultSchemaConfig {
  name: string;
  location: string;
  company: Company["id"];
  Company?: Company;
  Client?: ClientProfile["id"][];
}

export interface CreateSiteProps {
  name: Site["name"];
  location: Site["location"];
  company: Site["company"];
  client: Site["Client"];
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
