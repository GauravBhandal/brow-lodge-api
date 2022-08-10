import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { ClientProfile } from "../clientProfile";
import { QueryParams } from "../../common/types";
import { ShiftRecord } from "../shiftRecord";

export interface Invoice extends DefaultSchemaConfig {
  lastExportedOn: Date;
  startDateTime: Date;
  endDateTime: Date;
  status: string;
  shift: ShiftRecord["id"];
  Shift?: ShiftRecord;
  client: ClientProfile["id"];
  Client?: ClientProfile;
  company: Company["id"];
  Company?: Company;
}

export interface CreateInvoiceProps {
  startDateTime: Invoice["startDateTime"];
  endDateTime: Invoice["endDateTime"];
  status: Invoice["status"];
  shift: Invoice["shift"];
  client: Invoice["client"][];
  company: Invoice["company"];
}

export interface UpdateInvoiceProps {
  id: Invoice["id"];
  startDateTime: Invoice["startDateTime"];
  endDateTime: Invoice["endDateTime"];
  status: Invoice["status"];
  shift: Invoice["shift"];
  client: Invoice["client"];
  company: Invoice["company"];
}
export interface UpdateInvoiceStatusProps {
  ids: Invoice["id"][];
  status: Invoice["status"];
  lastExportedOn: Invoice["lastExportedOn"];
  company: Invoice["company"];
}

export interface GenerateInvoicesProps {
  ids: Invoice["id"][];
  company: Invoice["company"];
}

export interface SetExportedOnInvoicesProps {
  ids: Invoice["id"][];
  company: Invoice["company"];
}

export interface UpdateInvoiceOnShiftUpdateProps {
  startDateTime: Invoice["startDateTime"];
  endDateTime: Invoice["endDateTime"];
  shift: Invoice["shift"];
  client: Invoice["client"][];
  company: Invoice["company"];
}

export interface DeleteInvoiceProps {
  shift: Invoice["shift"];
  company: Invoice["company"];
}

export interface GetInvoiceByIdProps {
  id: Invoice["id"];
  company: Invoice["company"];
}

export interface GetInvoiceByIdsProps extends GenerateInvoicesProps {}

export interface GetInvoicesProps extends QueryParams {
  company: Invoice["company"];
}
