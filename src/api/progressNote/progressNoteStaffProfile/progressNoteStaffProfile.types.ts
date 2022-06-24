import { DefaultSchemaConfig } from "../../../components/sequelize/manager";
import { ProgressNote } from "..";
import { StaffProfile } from "../../staffProfile";

export interface ProgressNoteStaffProfile extends DefaultSchemaConfig {
  progressNote: ProgressNote["id"];
  staff: StaffProfile["id"];
}

export interface CreateBulkProgressNoteStaffProfileProps {
  progressNote: ProgressNoteStaffProfile["progressNote"];
  staff: ProgressNoteStaffProfile["staff"][];
}

export interface UpdateBulkProgressNoteStaffProfileProps
  extends CreateBulkProgressNoteStaffProfileProps {}

export interface DeleteBulkProgressNoteStaffProfileProps {
  progressNote: ProgressNoteStaffProfile["progressNote"];
}
