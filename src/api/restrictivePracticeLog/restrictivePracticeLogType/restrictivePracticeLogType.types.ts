import { DefaultSchemaConfig } from "../../../components/sequelize/manager";
import { RestrictivePracticeLog } from "..";

export interface RestrictivePracticeLogType
  extends DefaultSchemaConfig {
  restrictivePracticeLog: RestrictivePracticeLog["id"];
  type: string;
}

export interface CreateBulkRestrictivePracticeLogTypeProps {
  restrictivePracticeLog: RestrictivePracticeLogType["restrictivePracticeLog"];
  type: string[];
}

export interface UpdateBulkRestrictivePracticeLogTypeProps
  extends CreateBulkRestrictivePracticeLogTypeProps { }

export interface DeleteBulkRestrictivePracticeLogTypeProps {
  restrictivePracticeLog: RestrictivePracticeLogType["restrictivePracticeLog"];
}
