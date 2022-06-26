import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { StaffProfile } from "../staffProfile";
import { QueryParams } from "../../common/types";
import { Attachment } from "../attachment";

export interface ConflictOfInterest extends DefaultSchemaConfig {
  date: Date;
  conflictDescription: string;
  mitigationStrategy: string;
  staff: StaffProfile["id"];
  Staff?: StaffProfile;
  company: Company["id"];
  Company?: Company;
  Attachments?: Attachment[];
}

export interface CreateConflictOfInterestProps {
  date: ConflictOfInterest["date"];
  conflictDescription: ConflictOfInterest["conflictDescription"];
  mitigationStrategy: ConflictOfInterest["mitigationStrategy"];
  staff: ConflictOfInterest["staff"];
  company: ConflictOfInterest["company"];
  attachments?: Attachment["id"][];
}

export interface UpdateConflictOfInterestProps
  extends CreateConflictOfInterestProps {
  id: ConflictOfInterest["id"];
}

export interface DeleteConflictOfInterestProps {
  id: ConflictOfInterest["id"];
  company: ConflictOfInterest["company"];
}

export interface GetConflictOfInterestByIdProps
  extends DeleteConflictOfInterestProps {}

export interface GetConflictOfInterestsProps extends QueryParams {
  company: ConflictOfInterest["company"];
}
