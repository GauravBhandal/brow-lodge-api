import { DefaultSchemaConfig } from "../../../components/sequelize/manager";
import { RestrictivePracticeLog } from "..";
import { StaffProfile } from "../../staffProfile";

export interface RestrictivePracticeLogStaffProfile
  extends DefaultSchemaConfig {
  relation: RestrictivePracticeLog["id"];
  staff: StaffProfile["id"];
}

export interface CreateBulkRestrictivePracticeLogStaffProfileProps {
  relation: RestrictivePracticeLogStaffProfile["relation"];
  staff: RestrictivePracticeLogStaffProfile["staff"][];
}

export interface UpdateBulkRestrictivePracticeLogStaffProfileProps
  extends CreateBulkRestrictivePracticeLogStaffProfileProps {}

export interface DeleteBulkRestrictivePracticeLogStaffProfileProps {
  relation: RestrictivePracticeLogStaffProfile["relation"];
}
