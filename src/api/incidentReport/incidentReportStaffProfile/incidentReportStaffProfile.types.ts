import { DefaultSchemaConfig } from "../../../components/sequelize/manager";
import { IncidentReport } from "..";
import { StaffProfile } from "../../staffProfile";

export interface IncidentReportStaffProfile extends DefaultSchemaConfig {
  incident: IncidentReport["id"];
  staff: StaffProfile["id"];
}

export interface CreateBulkIncidentReportStaffProfileProps {
  incident: IncidentReportStaffProfile["incident"];
  staff: IncidentReportStaffProfile["staff"][];
}

export interface UpdateBulkIncidentReportStaffProfileProps
  extends CreateBulkIncidentReportStaffProfileProps {}

export interface DeleteBulkIncidentReportStaffProfileProps {
  incident: IncidentReportStaffProfile["incident"];
}
