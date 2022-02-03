import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { StaffProfile } from "../staffProfile";
import { ClientProfile } from "../clientProfile";
import { QueryParams } from "../../common/types";
import { Attachment } from "../attachment";

export interface Incident extends DefaultSchemaConfig {
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
  manager?: string;
  client: ClientProfile["id"];
  Client?: ClientProfile;
  company: Company["id"];
  Company?: Company;
  Attachments?: Attachment[];
}

export interface CreateIncidentProps {
  date: Incident["date"];
  time: Incident["time"];
  location: Incident["location"];
  incidentDescription: Incident["incidentDescription"];
  eventsPriorToIncident: Incident["eventsPriorToIncident"];
  actionsTakenByStaff: Incident["actionsTakenByStaff"];
  actionsTakenByOthers: Incident["actionsTakenByOthers"];
  anyOtherWitness: Incident["anyOtherWitness"];
  incidentReportedTo: Incident["incidentReportedTo"];
  assessmentAndDebriefing: Incident["assessmentAndDebriefing"];
  findingsAndActionsTaken: Incident["findingsAndActionsTaken"];
  status: Incident["status"];
  closureDate: Incident["closureDate"];
  manager: Incident["manager"];
  client: Incident["client"];
  company: Incident["company"];
  attachments?: Attachment["id"][];
}

export interface UpdateIncidentProps extends CreateIncidentProps {
  id: Incident["id"];
}

export interface DeleteIncidentProps {
  id: Incident["id"];
  company: Incident["company"];
}

export interface GetIncidentByIdProps extends DeleteIncidentProps {}

export interface GetIncidentsProps extends QueryParams {
  company: Incident["company"];
}
