import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { StaffProfile } from "../staffProfile";
import { QueryParams } from "../../common/types";
import { Attachment } from "../attachment";

export interface RepairRequest extends DefaultSchemaConfig {
  problem: string;
  risk: string;
  location: string;
  priority: "low" | "medium" | "high";
  status: "completed" | "pending" | "rejected" | "scheduled";
  staff: StaffProfile["id"];
  Staff?: StaffProfile;
  company: Company["id"];
  Company?: Company;
  Attachments?: Attachment[];
  archived?: boolean;
}

export interface CreateRepairRequestProps {
  problem: RepairRequest["problem"];
  risk: RepairRequest["risk"];
  location: RepairRequest["location"];
  priority: RepairRequest["priority"];
  status: RepairRequest["status"];
  staff: RepairRequest["staff"];
  company: RepairRequest["company"];
  attachments?: Attachment["id"][];
}

export interface UpdateRepairRequestProps extends CreateRepairRequestProps {
  id: RepairRequest["id"];
}

export interface DeleteRepairRequestProps {
  id: RepairRequest["id"];
  company: RepairRequest["company"];
}

export interface GetRepairRequestByIdProps extends DeleteRepairRequestProps {}

export interface GetRepairRequestsProps extends QueryParams {
  company: RepairRequest["company"];
}
