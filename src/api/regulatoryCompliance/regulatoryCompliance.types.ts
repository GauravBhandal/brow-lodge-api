import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { StaffProfile } from "../staffProfile";
import { ClientProfile } from "../clientProfile";
import { QueryParams } from "../../common/types";
import { Attachment } from "../attachment";

export interface RegulatoryCompliance extends DefaultSchemaConfig {
  date: Date;
  staff: StaffProfile["id"];
  Staff?: StaffProfile;
  title: string;
  category: string;
  notes?: string;
  Attachments?: Attachment[];
  reviewDate?: Date;
  company: Company["id"];
  Company?: Company;
  archived?: boolean;
}

export interface CreateRegulatoryComplianceProps {
  date: RegulatoryCompliance["date"];
  staff: RegulatoryCompliance["staff"];
  title: RegulatoryCompliance["title"];
  category: RegulatoryCompliance["category"];
  notes: RegulatoryCompliance["notes"];
  attachments: Attachment["id"][];
  reviewDate?: RegulatoryCompliance["reviewDate"];
  company: RegulatoryCompliance["company"];
}

export interface UpdateRegulatoryComplianceProps
  extends CreateRegulatoryComplianceProps {
  id: RegulatoryCompliance["id"];
}

export interface DeleteRegulatoryComplianceProps {
  id: RegulatoryCompliance["id"];
  company: RegulatoryCompliance["company"];
}

export interface GetRegulatoryComplianceByIdProps
  extends DeleteRegulatoryComplianceProps {}

export interface GetRegulatoryCompliancesProps extends QueryParams {
  company: RegulatoryCompliance["company"];
}
