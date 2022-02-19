import { DefaultSchemaConfig } from "../../../components/sequelize/manager";
import { IncidentType } from "../../incidentType";
import { IncidentReport } from "..";

export interface IncidentReportIncidentType extends DefaultSchemaConfig {
  incident: IncidentReport["id"];
  type: IncidentType["id"];
}

export interface CreateBulkIncidentReportIncidentTypeProps {
  incident: IncidentReportIncidentType["incident"];
  types: IncidentReportIncidentType["type"][];
}

export interface UpdateBulkIncidentReportIncidentTypeProps
  extends CreateBulkIncidentReportIncidentTypeProps {}

export interface DeleteBulkIncidentReportIncidentTypeProps {
  incident: IncidentReportIncidentType["incident"];
}
