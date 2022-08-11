import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { ClientProfile } from "../clientProfile";
import { StaffProfile } from "../staffProfile";
import { QueryParams } from "../../common/types";

export interface ParticipantGoal extends DefaultSchemaConfig {
  title: string;
  description: string;
  strategy: string;
  support: string;
  type: string;
  status: string;
  comments?: string;
  startDate: Date;
  reviewDate?: Date;
  dueDate?: Date;
  company: Company["id"];
  Company?: Company;
  staff: StaffProfile["id"];
  Staff?: StaffProfile;
  client: ClientProfile["id"];
  Client?: ClientProfile;
}

export interface CreateParticipantGoalProps {
  title: ParticipantGoal["title"];
  description: ParticipantGoal["description"];
  strategy: ParticipantGoal["strategy"];
  support: ParticipantGoal["support"];
  type: ParticipantGoal["type"];
  status: ParticipantGoal["status"];
  comments: ParticipantGoal["comments"];
  startDate: ParticipantGoal["startDate"];
  reviewDate: ParticipantGoal["reviewDate"];
  dueDate: ParticipantGoal["dueDate"];
  client: ParticipantGoal["client"];
  staff: ParticipantGoal["staff"];
  company: ParticipantGoal["company"];
}

export interface UpdateParticipantGoalProps extends CreateParticipantGoalProps {
  id: ParticipantGoal["id"];
}

export interface DeleteParticipantGoalProps {
  id: ParticipantGoal["id"];
  company: ParticipantGoal["company"];
}

export interface GetParticipantGoalByIdProps
  extends DeleteParticipantGoalProps {}

export interface GetParticipantGoalsProps extends QueryParams {
  company: ParticipantGoal["company"];
}
