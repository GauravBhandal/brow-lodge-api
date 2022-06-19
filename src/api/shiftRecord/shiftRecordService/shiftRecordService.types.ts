import { DefaultSchemaConfig } from "../../../components/sequelize/manager";
import { ShiftRecord } from "..";
import { Service } from "../../service";

export interface ServiceProp {
  service: Service["id"];
  startTime: Date;
}

export interface ShiftRecordService extends DefaultSchemaConfig {
  shift: ShiftRecord["id"];
  service: Service["id"];
  startTime: Date;
}

export interface CreateBulkShiftRecordServiceProps {
  shift: ShiftRecordService["shift"];
  services: ServiceProp[];
}

export interface UpdateBulkShiftRecordServiceProps
  extends CreateBulkShiftRecordServiceProps {}

export interface DeleteBulkShiftRecordServiceProps {
  shift: ShiftRecordService["shift"];
}
