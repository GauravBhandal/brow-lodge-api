import { Company } from "../company";

export enum XERO_EXTERNAL_DATA_TYPE {
  Employees = "xero-employees",
  Customers = "xero-customers",
  Payitems = "xero-payitems",
}

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
export interface ExportTimesheetsToXeroProps {
  company: Company["id"];
  timesheets: any;
}

export interface GetXeroIntegrationDataProps {
  company: Company["id"];
  type: XERO_EXTERNAL_DATA_TYPE;
}
