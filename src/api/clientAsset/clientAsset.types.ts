import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { StaffProfile } from "../staffProfile";
import { ClientProfile } from "../clientProfile";
import { QueryParams } from "../../common/types";
import { Attachment } from "../attachment";

export interface ClientAsset extends DefaultSchemaConfig {
  date: Date;
  assetName: string;
  location: string;
  description?: string;
  staff: StaffProfile["id"];
  Staff?: StaffProfile;
  client: ClientProfile["id"];
  Client?: ClientProfile;
  company: Company["id"];
  Company?: Company;
  Attachments?: Attachment[];
}

export interface CreateClientAssetProps {
  date: ClientAsset["date"];
  assetName: ClientAsset["assetName"];
  location: ClientAsset["location"];
  description: ClientAsset["description"];
  staff: ClientAsset["staff"];
  client: ClientAsset["client"];
  company: ClientAsset["company"];
  attachments?: Attachment["id"][];
}

export interface UpdateClientAssetProps extends CreateClientAssetProps {
  id: ClientAsset["id"];
}

export interface DeleteClientAssetProps {
  id: ClientAsset["id"];
  company: ClientAsset["company"];
}

export interface GetClientAssetByIdProps extends DeleteClientAssetProps {}

export interface GetClientAssetsProps extends QueryParams {
  company: ClientAsset["company"];
}
