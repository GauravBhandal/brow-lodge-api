import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";

export interface StaffUnavailabilityRepeat extends DefaultSchemaConfig {
  meta: any;
  company: Company["id"];
  Company?: Company;
}

export interface CreateStaffUnavailabilityRepeatProps {
  meta: StaffUnavailabilityRepeat["meta"];
  company: StaffUnavailabilityRepeat["company"];
}
