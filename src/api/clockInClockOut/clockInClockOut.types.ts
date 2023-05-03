import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { QueryParams } from "../../common/types";
import { Attachment } from "../attachment";
import { ShiftRecord } from "../shiftRecord";
import { StaffProfile } from "../staffProfile";

export interface ClockInClockOut extends DefaultSchemaConfig {
  startDateTime: Date;
  endDateTime?: Date;
  checkInLocation: string;
  checkOutLocation?: string;
  checkInAttachment?: Attachment["id"];
  checkOutAttachment?: Attachment["id"];
  shift: ShiftRecord["id"];
  Shift?: ShiftRecord;
  company: Company["id"];
  Company?: Company;
  staff: StaffProfile["id"];
  Staff?: StaffProfile;
}

export interface CreateClockInClockOutProps {
  startDateTime: ClockInClockOut["startDateTime"];
  endDateTime: ClockInClockOut["endDateTime"];
  checkInLocation: ClockInClockOut["checkInLocation"];
  checkOutLocation: ClockInClockOut["checkOutLocation"];
  checkInAttachment: ClockInClockOut["checkInAttachment"];
  checkOutAttachment: ClockInClockOut["checkOutAttachment"];
  shift: ClockInClockOut["shift"];
  company: ClockInClockOut["company"];
  staff: ClockInClockOut["staff"];
}

export interface UpdateClockInClockOutProps extends CreateClockInClockOutProps {
  id: ClockInClockOut["id"];
}

export interface DeleteClockInClockOutProps {
  id: ClockInClockOut["id"];
  company: ClockInClockOut["company"];
}

export interface GetClockInClockOutByIdProps
  extends DeleteClockInClockOutProps {}

export interface GetClockInClockOutsProps extends QueryParams {
  company: ClockInClockOut["company"];
}
