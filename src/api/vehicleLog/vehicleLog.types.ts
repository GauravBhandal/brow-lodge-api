import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { StaffProfile } from "../staffProfile";
import { ClientProfile } from "../clientProfile";
import { QueryParams } from "../../common/types";

export interface VehicleLog extends DefaultSchemaConfig {
  date: Date;
  startTime: Date;
  endTime: Date;
  odometerReadingStart: Number;
  odometerReadingEnd: Number;
  purposeOfTheJourney: string;
  totalKm: Number;
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
  startTime: VehicleLog["startTime"];
  endTime: VehicleLog["endTime"];
  odometerReadingStart: VehicleLog["odometerReadingStart"];
  odometerReadingEnd: VehicleLog["odometerReadingEnd"];
  purposeOfTheJourney: VehicleLog["purposeOfTheJourney"];
  totalKm: VehicleLog["totalKm"];
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
