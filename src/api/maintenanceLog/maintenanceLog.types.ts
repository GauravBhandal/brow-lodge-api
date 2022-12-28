import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { StaffProfile } from "../staffProfile";
import { QueryParams } from "../../common/types";
import { Attachment } from "../attachment";

export interface MaintenanceLog extends DefaultSchemaConfig {
  date: Date;
  time: Date;
  subject: string;
  description: string;
  location?: string;
  staff: StaffProfile["id"];
  Staff?: StaffProfile;
  company: Company["id"];
  Company?: Company;
  Attachments?: Attachment[];
  archived?: boolean;
}

export interface CreateMaintenanceLogProps {
  date: MaintenanceLog["date"];
  time: MaintenanceLog["time"];
  subject: MaintenanceLog["subject"];
  description: MaintenanceLog["description"];
  location?: MaintenanceLog["location"];
  staff: MaintenanceLog["staff"];
  company: MaintenanceLog["company"];
  attachments?: Attachment["id"][];
}

export interface UpdateMaintenanceLogProps extends CreateMaintenanceLogProps {
  id: MaintenanceLog["id"];
}

export interface DeleteMaintenanceLogProps {
  id: MaintenanceLog["id"];
  company: MaintenanceLog["company"];
}

export interface GetMaintenanceLogByIdProps extends DeleteMaintenanceLogProps {}

export interface GetMaintenanceLogsProps extends QueryParams {
  company: MaintenanceLog["company"];
}
