import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { StaffProfile } from "../staffProfile";
import { ClientProfile } from "../clientProfile";
import { QueryParams } from "../../common/types";

export interface OxygenSaturationLog extends DefaultSchemaConfig {
  date: Date;
  time: Date;
  reading: Number;
  probePlacement: string;
  suctioningRequired: boolean;
  typeOfSuctioning?: string;
  suctionAmount?: string;
  secretionDescription?: string;
  readingPostSuctioning?: Number;
  staff: StaffProfile["id"];
  Staff?: StaffProfile;
  client: ClientProfile["id"];
  Client?: ClientProfile;
  company: Company["id"];
  Company?: Company;
}

export interface CreateOxygenSaturationLogProps {
  date: OxygenSaturationLog["date"];
  time: OxygenSaturationLog["time"];
  reading: OxygenSaturationLog["reading"];
  probePlacement: OxygenSaturationLog["probePlacement"];
  suctioningRequired: OxygenSaturationLog["suctioningRequired"];
  typeOfSuctioning: OxygenSaturationLog["typeOfSuctioning"];
  suctionAmount: OxygenSaturationLog["suctionAmount"];
  secretionDescription: OxygenSaturationLog["secretionDescription"];
  readingPostSuctioning: OxygenSaturationLog["readingPostSuctioning"];
  staff: OxygenSaturationLog["staff"];
  client: OxygenSaturationLog["client"];
  company: OxygenSaturationLog["company"];
}

export interface UpdateOxygenSaturationLogProps
  extends CreateOxygenSaturationLogProps {
  id: OxygenSaturationLog["id"];
}

export interface DeleteOxygenSaturationLogProps {
  id: OxygenSaturationLog["id"];
  company: OxygenSaturationLog["company"];
}

export interface GetOxygenSaturationLogByIdProps
  extends DeleteOxygenSaturationLogProps {}

export interface GetOxygenSaturationLogsProps extends QueryParams {
  company: OxygenSaturationLog["company"];
}
