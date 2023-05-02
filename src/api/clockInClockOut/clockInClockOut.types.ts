import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { QueryParams } from "../../common/types";
import { Attachment } from "../attachment";
import { ShiftRecord } from "../shiftRecord";

export interface ClockInClockOut extends DefaultSchemaConfig {
  startDateTime: Date;
  endDateTime?: Date;
  checkInLocation: string;
  checkOutLocation?: string;
  checkInAttachment?: Attachment["id"];
  checkOutAttachment?: Attachment["id"];
  shiftId: ShiftRecord["id"];
  ShiftId?: ShiftRecord;
  company: Company["id"];
  Company?: Company;
}

export interface CreateClockInClockOutProps {
  startDateTime: ClockInClockOut["startDateTime"];
  endDateTime: ClockInClockOut["endDateTime"];
  checkInLocation: ClockInClockOut["checkInLocation"];
  checkOutLocation: ClockInClockOut["checkOutLocation"];
  checkInAttachment: ClockInClockOut["checkInAttachment"];
  checkOutAttachment: ClockInClockOut["checkOutAttachment"];
  shiftId: ClockInClockOut["shiftId"];
  company: ClockInClockOut["company"];
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
