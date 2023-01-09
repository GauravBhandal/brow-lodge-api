import { DefaultSchemaConfig } from "../../../components/sequelize/manager";
import { Site } from "..";
import { ClientProfile } from "../../clientProfile";

export interface SiteClientProfile extends DefaultSchemaConfig {
  site: Site["id"];
  client: ClientProfile["id"];
}

export interface CreateBulkSiteClientProfileProps {
  site: SiteClientProfile["site"];
  client: SiteClientProfile["client"][];
}

export interface UpdateBulkSiteClientProfileProps
  extends CreateBulkSiteClientProfileProps {}

export interface DeleteBulkSiteClientProfileProps {
  site: SiteClientProfile["site"];
}
