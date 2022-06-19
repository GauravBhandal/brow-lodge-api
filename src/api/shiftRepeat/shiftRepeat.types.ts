import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";

export interface ShiftRepeat extends DefaultSchemaConfig {
  meta: any;
  company: Company["id"];
  Company?: Company;
}

export interface CreateShiftRepeatProps {
  meta: ShiftRepeat["meta"];
  company: ShiftRepeat["company"];
}
