import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { StaffProfile } from "../staffProfile";
import { QueryParams } from "../../common/types";

export interface RepairRequest extends DefaultSchemaConfig {
  problem: string;
  risk: string;
  location: string;
  repairRequestsPriority: "low" | "medium" | "high";
  repairRequestsStatus: "completed" | "pending" | "rejected" | "scheduled";
  staff: StaffProfile["id"];
  Staff?: StaffProfile;
  company: Company["id"];
  Company?: Company;
}

export interface CreateRepairRequestProps {
  problem: RepairRequest["problem"];
  risk: RepairRequest["risk"];
  location: RepairRequest["location"];
  repairRequestsPriority: RepairRequest["repairRequestsPriority"];
  repairRequestsStatus: RepairRequest["repairRequestsStatus"];
  staff: RepairRequest["staff"];
  company: RepairRequest["company"];
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
