import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { StaffProfile } from "../staffProfile";
import { ClientProfile } from "../clientProfile";
import { QueryParams } from "../../common/types";
import { Attachment } from "../attachment";

export interface MeetingLog extends DefaultSchemaConfig {
  date: Date;
  startTime: Date;
  endTime: Date;
  meetingType: string;
  location: string;
  purpose: string;
  attendees: string;
  apologies: string;
  agenda: string;
  discussion: string;
  action: string;
  staff: StaffProfile["id"];
  Staff?: StaffProfile;
  client?: ClientProfile["id"];
  Client?: ClientProfile;
  company: Company["id"];
  Company?: Company;
  Attachments?: Attachment[];
}

export interface CreateMeetingLogProps {
  date: MeetingLog["date"];
  startTime: MeetingLog["startTime"];
  endTime: MeetingLog["endTime"];
  meetingType: MeetingLog["meetingType"];
  location: MeetingLog["location"];
  purpose: MeetingLog["purpose"];
  attendees: MeetingLog["attendees"];
  apologies: MeetingLog["apologies"];
  agenda: MeetingLog["agenda"];
  discussion: MeetingLog["discussion"];
  action: MeetingLog["action"];
  staff: MeetingLog["staff"];
  client: MeetingLog["client"];
  company: MeetingLog["company"];
  attachments?: Attachment["id"][];
}

export interface UpdateMeetingLogProps extends CreateMeetingLogProps {
  id: MeetingLog["id"];
}

export interface DeleteMeetingLogProps {
  id: MeetingLog["id"];
  company: MeetingLog["company"];
}

export interface GetMeetingLogByIdProps extends DeleteMeetingLogProps {}

export interface GetMeetingLogsProps extends QueryParams {
  company: MeetingLog["company"];
  canAccessAdminMeetings: boolean;
}
