import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { StaffProfile } from "../staffProfile";
import { ClientProfile } from "../clientProfile";
import { QueryParams } from "../../common/types";
import { Attachment } from "../attachment";

export interface ParticipantMedicationChart extends DefaultSchemaConfig {
  date: Date;
  nextReviewDate?: Date;
  levelOfSupportRequired: string;
  notes: string;
  staff: StaffProfile["id"];
  Staff?: StaffProfile;
  client: ClientProfile["id"];
  Client?: ClientProfile;
  company: Company["id"];
  Company?: Company;
  Attachments?: Attachment[];
}

export interface CreateParticipantMedicationChartProps {
  date: ParticipantMedicationChart["date"];
  nextReviewDate?: ParticipantMedicationChart["nextReviewDate"];
  levelOfSupportRequired: ParticipantMedicationChart["levelOfSupportRequired"];
  notes: ParticipantMedicationChart["notes"];
  staff: ParticipantMedicationChart["staff"];
  client: ParticipantMedicationChart["client"];
  company: ParticipantMedicationChart["company"];
  attachments: Attachment["id"][];
}

export interface UpdateParticipantMedicationChartProps
  extends CreateParticipantMedicationChartProps {
  id: ParticipantMedicationChart["id"];
}

export interface DeleteParticipantMedicationChartProps {
  id: ParticipantMedicationChart["id"];
  company: ParticipantMedicationChart["company"];
}

export interface GetParticipantMedicationChartByIdProps
  extends DeleteParticipantMedicationChartProps {}

export interface GetParticipantMedicationChartsProps extends QueryParams {
  company: ParticipantMedicationChart["company"];
}
