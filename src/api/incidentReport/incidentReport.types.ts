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
  incidentReportDescription: string;
  eventsPriorToIncidentReport: string;
  actionsTakenByStaff: string;
  actionsTakenByOthers: string;
  anyOtherWitness: string;
  incidentReportReportedTo?: string;
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
}

export interface CreateIncidentReportProps {
  date: IncidentReport["date"];
  time: IncidentReport["time"];
  location: IncidentReport["location"];
  incidentReportDescription: IncidentReport["incidentReportDescription"];
  eventsPriorToIncidentReport: IncidentReport["eventsPriorToIncidentReport"];
  actionsTakenByStaff: IncidentReport["actionsTakenByStaff"];
  actionsTakenByOthers: IncidentReport["actionsTakenByOthers"];
  anyOtherWitness: IncidentReport["anyOtherWitness"];
  incidentReportReportedTo: IncidentReport["incidentReportReportedTo"];
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
