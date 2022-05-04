import { Company } from "../company";

export interface XeroCallbackProps {
  url: string;
  company: Company["id"];
}

export interface IsConnectedToXeroProps {
  company: Company["id"];
}

export interface DisconnectXeroProps extends IsConnectedToXeroProps {}

export interface RefreshXeroInstanceProps extends IsConnectedToXeroProps {}

export interface GetXeroCustomersProp extends IsConnectedToXeroProps {}

export interface GetXeroEmployeesProp extends IsConnectedToXeroProps {}

export interface SyncXeroEmployees extends IsConnectedToXeroProps {}

export interface ExportInvoicesToXeroProps {
  company: Company["id"];
  invoices: any;
}
