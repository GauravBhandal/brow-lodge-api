import { DefaultSchemaConfig } from "../../../components/sequelize/manager";
import { StaffProfile } from "../../staffProfile";
import { PayLevel } from "../../payLevel";

export interface StaffProfilePayLevel extends DefaultSchemaConfig {
  staff: StaffProfile["id"];
  paylevel: PayLevel["id"];
}

export interface CreateBulkStaffProfilePayLevelProps {
  staff: StaffProfile["id"];
  paylevel: PayLevel["id"][];
}

export interface UpdateBulkStaffProfilePayLevelProps
  extends CreateBulkStaffProfilePayLevelProps {}

export interface DeleteBulkStaffProfilePayLevelProps {
  staff: StaffProfilePayLevel["staff"];
}
