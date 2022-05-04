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

export interface GetXeroEmployeesProps extends IsConnectedToXeroProps {}

export interface GetXeroCustomersProps extends IsConnectedToXeroProps {}

export interface GetXeroPayItemsProps extends IsConnectedToXeroProps {}

export interface SyncXeroEmployeesProps extends IsConnectedToXeroProps {}

export interface SyncXeroCustomersProps extends IsConnectedToXeroProps {}

export interface SyncXeroPayItemsProps extends IsConnectedToXeroProps {}

export interface ExportInvoicesToXeroProps {
  company: Company["id"];
  invoices: any;
}
