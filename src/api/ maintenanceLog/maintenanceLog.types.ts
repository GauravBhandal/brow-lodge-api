import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { StaffProfile } from "../staffProfile";
import { QueryParams } from "../../common/types";

export interface  MaintenanceLog extends DefaultSchemaConfig {
  date: Date;
  time: Date;
  subject: string;
  description: string;
  location?: string;
  staff: StaffProfile["id"];
  Staff?: StaffProfile;
  company: Company["id"];
  Company?: Company;
}

export interface Create MaintenanceLogProps {
  date:  MaintenanceLog["date"];
  time:  MaintenanceLog["time"];
  subject:  MaintenanceLog["subject"];
  description:  MaintenanceLog["description"];
  location?:  location["text"];
  staff:  MaintenanceLog["staff"];
  company:  MaintenanceLog["company"];
}

export interface Update MaintenanceLogProps extends Create MaintenanceLogProps {
  id:  MaintenanceLog["id"];
}

export interface Delete MaintenanceLogProps {
  id:  MaintenanceLog["id"];
  company:  MaintenanceLog["company"];
}

export interface Get MaintenanceLogByIdProps extends Delete MaintenanceLogProps {}

export interface Get MaintenanceLogsProps extends QueryParams {
  company:  MaintenanceLog["company"];
}
