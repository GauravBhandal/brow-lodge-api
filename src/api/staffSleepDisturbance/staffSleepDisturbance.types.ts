import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { StaffProfile } from "../staffProfile";
import { ClientProfile } from "../clientProfile";
import { QueryParams } from "../../common/types";

export interface StaffSleepDisturbance extends DefaultSchemaConfig {
  date: Date;
  startTime: Date;
  endTime: Date;
  totalHours: number;
  description: string;
  actions: string;
  staff: StaffProfile["id"];
  Staff?: StaffProfile;
  client: ClientProfile["id"];
  Client?: ClientProfile;
  company: Company["id"];
  Company?: Company;
  archived?: boolean;
}

export interface CreateStaffSleepDisturbanceProps {
  date: StaffSleepDisturbance["date"];
  startTime: StaffSleepDisturbance["startTime"];
  endTime: StaffSleepDisturbance["endTime"];
  totalHours: StaffSleepDisturbance["totalHours"];
  description: StaffSleepDisturbance["description"];
  actions: StaffSleepDisturbance["actions"];
  staff: StaffSleepDisturbance["staff"];
  client: StaffSleepDisturbance["client"];
  company: StaffSleepDisturbance["company"];
}

export interface UpdateStaffSleepDisturbanceProps
  extends CreateStaffSleepDisturbanceProps {
  id: StaffSleepDisturbance["id"];
}

export interface DeleteStaffSleepDisturbanceProps {
  id: StaffSleepDisturbance["id"];
  company: StaffSleepDisturbance["company"];
}

export interface GetStaffSleepDisturbanceByIdProps
  extends DeleteStaffSleepDisturbanceProps {}

export interface GetStaffSleepDisturbancesProps extends QueryParams {
  company: StaffSleepDisturbance["company"];
}
