import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { StaffProfile } from "../staffProfile";
import { ClientProfile } from "../clientProfile";
import { QueryParams } from "../../common/types";

export interface ProgressNote extends DefaultSchemaConfig {
  date: Date;
  shiftStartTime: Date;
  shiftEndTime: Date;
  notes: string;
  dietAndFluids: string;
  staff: StaffProfile["id"];
  Staff?: StaffProfile;
  client: ClientProfile["id"];
  Client?: ClientProfile;
  company: Company["id"];
  Company?: Company;
}

export interface CreateProgressNoteProps {
  date: ProgressNote["date"];
  shiftStartTime: ProgressNote["shiftStartTime"];
  shiftEndTime: ProgressNote["shiftEndTime"];
  notes: ProgressNote["notes"];
  dietAndFluids: ProgressNote["dietAndFluids"];
  staff: ProgressNote["staff"];
  client: ProgressNote["client"];
  company: ProgressNote["company"];
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
