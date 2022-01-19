import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { StaffProfile } from "../staffProfile";
import { ClientProfile } from "../clientProfile";
import { QueryParams } from "../../common/types";

export interface VehicleLog extends DefaultSchemaConfig {
  date: Date;
  start_time: Date;
  end_time: Date;
  odometer_reading_start: Number;
  odometer_reading_end: Number;
  purpose_of_the_journey: string;
  total_km: Number;
  vehicle: "private" | "company" | "other";
  staff: StaffProfile["id"];
  Staff?: StaffProfile;
  client: ClientProfile["id"];
  Client?: ClientProfile;
  company: Company["id"];
  Company?: Company;
}

export interface CreateVehicleLogProps {
  date: VehicleLog["date"];
  start_time: VehicleLog["start_time"];
  end_time: VehicleLog["end_time"];
  odometer_reading_start: VehicleLog["odometer_reading_start"];
  odometer_reading_end: VehicleLog["odometer_reading_end"];
  purpose_of_the_journey: VehicleLog["purpose_of_the_journey"];
  total_km: VehicleLog["total_km"];
  vehicle: VehicleLog["vehicle"];
  staff: VehicleLog["staff"];
  client: VehicleLog["client"];
  company: VehicleLog["company"];
}

export interface UpdateVehicleLogProps extends CreateVehicleLogProps {
  id: VehicleLog["id"];
}

export interface DeleteVehicleLogProps {
  id: VehicleLog["id"];
  company: VehicleLog["company"];
}

export interface GetVehicleLogByIdProps extends DeleteVehicleLogProps {}

export interface GetVehicleLogsProps extends QueryParams {
  company: VehicleLog["company"];
}
