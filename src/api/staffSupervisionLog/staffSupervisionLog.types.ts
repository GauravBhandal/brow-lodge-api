import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { StaffProfile } from "../staffProfile";
import { ClientProfile } from "../clientProfile";
import { QueryParams } from "../../common/types";
import { Attachment } from "../attachment";

export interface StaffSupervisionLog extends DefaultSchemaConfig {
  date: Date;
  nextDueOn: Date;
  type: string;
  notes?: string;
  staff: StaffProfile["id"];
  Staff?: StaffProfile;
  company: Company["id"];
  Company?: Company;
  Attachments?: Attachment[];
  archived?: boolean;
}

export interface CreateStaffSupervisionLogProps {
  date: StaffSupervisionLog["date"];
  nextDueOn: StaffSupervisionLog["nextDueOn"];
  type: StaffSupervisionLog["type"];
  notes: StaffSupervisionLog["notes"];
  staff: StaffSupervisionLog["staff"];
  company: StaffSupervisionLog["company"];
  attachments?: Attachment["id"][];
}

export interface UpdateStaffSupervisionLogProps
  extends CreateStaffSupervisionLogProps {
  id: StaffSupervisionLog["id"];
}

export interface DeleteStaffSupervisionLogProps {
  id: StaffSupervisionLog["id"];
  company: StaffSupervisionLog["company"];
}

export interface GetStaffSupervisionLogByIdProps
  extends DeleteStaffSupervisionLogProps {}

export interface GetStaffSupervisionLogsProps extends QueryParams {
  company: StaffSupervisionLog["company"];
}
