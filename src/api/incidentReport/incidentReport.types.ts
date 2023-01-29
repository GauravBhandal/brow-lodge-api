import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { StaffProfile } from "../staffProfile";
import { ClientProfile } from "../clientProfile";
import { IncidentType } from "../incidentType";
import { QueryParams } from "../../common/types";
import { Attachment } from "../attachment";

export interface IncidentReport extends DefaultSchemaConfig {
  date: Date;
  time: Date;
  location: string;
  incidentDescription: string;
  eventsPriorToIncident: string;
  actionsTakenByStaff: string;
  actionsTakenByOthers: string;
  anyOtherWitness: string;
  incidentReportedTo?: string;
  assessmentAndDebriefing?: string;
  findingsAndActionsTaken?: string;
  status?: string;
  closureDate?: Date;
  manager?: StaffProfile["id"];
  client: ClientProfile["id"];
  Client?: ClientProfile;
  company: Company["id"];
  Company?: Company;
  Attachments?: Attachment[];
  Staff?: StaffProfile[];
  Types?: IncidentType[];
  archived?: boolean;
}

export interface CreateIncidentReportProps {
  date: IncidentReport["date"];
  time: IncidentReport["time"];
  location: IncidentReport["location"];
  incidentDescription: IncidentReport["incidentDescription"];
  eventsPriorToIncident: IncidentReport["eventsPriorToIncident"];
  actionsTakenByStaff: IncidentReport["actionsTakenByStaff"];
  actionsTakenByOthers: IncidentReport["actionsTakenByOthers"];
  anyOtherWitness: IncidentReport["anyOtherWitness"];
  incidentReportedTo: IncidentReport["incidentReportedTo"];
  assessmentAndDebriefing: IncidentReport["assessmentAndDebriefing"];
  findingsAndActionsTaken: IncidentReport["findingsAndActionsTaken"];
  status: IncidentReport["status"];
  closureDate: IncidentReport["closureDate"];
  manager: IncidentReport["manager"];
  client: IncidentReport["client"];
  company: IncidentReport["company"];
  attachments?: Attachment["id"][];
  staff: StaffProfile["id"][];
  types: IncidentType["id"][];
}

export interface UpdateIncidentReportProps extends CreateIncidentReportProps {
  id: IncidentReport["id"];
}

export interface DeleteIncidentReportProps {
  id: IncidentReport["id"];
  company: IncidentReport["company"];
}

export interface GetIncidentReportByIdProps extends DeleteIncidentReportProps {}

export interface GetIncidentReportsProps extends QueryParams {
  company: IncidentReport["company"];
}
