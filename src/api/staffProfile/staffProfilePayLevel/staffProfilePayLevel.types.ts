import { DefaultSchemaConfig } from "../../../components/sequelize/manager";
import { StaffProfile } from "../../staffProfile";
import { PayLevel } from "../../payLevel";

export interface StaffProfilePayLevel extends DefaultSchemaConfig {
  relation: StaffProfile["id"];
  paylevel: PayLevel["id"];
}

export interface CreateBulkStaffProfilePayLevelProps {
  relation: StaffProfile["id"];
  paylevel: PayLevel["id"][];
}

export interface UpdateBulkStaffProfilePayLevelProps
  extends CreateBulkStaffProfilePayLevelProps {}

export interface DeleteBulkStaffProfilePayLevelProps {
  relation: StaffProfilePayLevel["relation"];
}
