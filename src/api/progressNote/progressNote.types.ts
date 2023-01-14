import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { StaffProfile } from "../staffProfile";
import { ClientProfile } from "../clientProfile";
import { QueryParams } from "../../common/types";
import { Attachment } from "../attachment";

export interface ProgressNote extends DefaultSchemaConfig {
  date: Date;
  shiftStartTime: Date;
  shiftEndTime: Date;
  notes: string;
  customFieldsData?: Object;
  Staff?: StaffProfile[];
  client: ClientProfile["id"];
  Client?: ClientProfile;
  company: Company["id"];
  Company?: Company;
  Attachments?: Attachment[];
  archived?: boolean;
}

export interface CreateProgressNoteProps {
  date: ProgressNote["date"];
  shiftStartTime: ProgressNote["shiftStartTime"];
  shiftEndTime: ProgressNote["shiftEndTime"];
  notes: ProgressNote["notes"];
  staff: StaffProfile["id"][];
  client: ProgressNote["client"];
  company: ProgressNote["company"];
  attachments?: Attachment["id"][];
  customFieldsData?: ProgressNote["customFieldsData"];
}

export interface UpdateProgressNoteProps extends CreateProgressNoteProps {
  id: ProgressNote["id"];
}

export interface DeleteProgressNoteProps {
  id: ProgressNote["id"];
  company: ProgressNote["company"];
}

export interface GetProgressNoteByIdProps extends DeleteProgressNoteProps {}

export interface GetProgressNotesProps extends QueryParams {
  company: ProgressNote["company"];
}
