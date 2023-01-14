import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { StaffProfile } from "../staffProfile";
import { ClientProfile } from "../clientProfile";
import { QueryParams } from "../../common/types";
import { Attachment } from "../attachment";

export interface ProgressReport extends DefaultSchemaConfig {
  startDate: Date;
  endDate: Date;
  documentedOn: Date;
  progressNotes: string;
  behaviourOfConcerns: string;
  diet: string;
  fluids: string;
  activities: string;
  chokingObservations?: string;
  appointmentsOrFamilyVisits?: string;
  staffAdministeredMedication?: string;
  ndisGoalSetting?: string;
  independentSkills?: string;
  communityAccess?: string;
  staff: StaffProfile["id"];
  Staff?: StaffProfile;
  client: ClientProfile["id"];
  Client?: ClientProfile;
  company: Company["id"];
  Company?: Company;
  Attachments?: Attachment[];
  archived?: boolean;
}

export interface CreateProgressReportProps {
  startDate: ProgressReport["startDate"];
  endDate: ProgressReport["endDate"];
  documentedOn: ProgressReport["documentedOn"];
  progressNotes: ProgressReport["progressNotes"];
  behaviourOfConcerns: ProgressReport["behaviourOfConcerns"];
  diet: ProgressReport["diet"];
  fluids: ProgressReport["fluids"];
  activities: ProgressReport["activities"];
  chokingObservations: ProgressReport["chokingObservations"];
  appointmentsOrFamilyVisits: ProgressReport["appointmentsOrFamilyVisits"];
  staffAdministeredMedication: ProgressReport["staffAdministeredMedication"];
  ndisGoalSetting: ProgressReport["ndisGoalSetting"];
  independentSkills: ProgressReport["independentSkills"];
  communityAccess: ProgressReport["communityAccess"];
  staff: ProgressReport["staff"];
  client: ProgressReport["client"];
  company: ProgressReport["company"];
  attachments?: Attachment["id"][];
}

export interface UpdateProgressReportProps extends CreateProgressReportProps {
  id: ProgressReport["id"];
}

export interface DeleteProgressReportProps {
  id: ProgressReport["id"];
  company: ProgressReport["company"];
}

export interface GetProgressReportByIdProps extends DeleteProgressReportProps {}

export interface GetProgressReportsProps extends QueryParams {
  company: ProgressReport["company"];
}
