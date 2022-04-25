import { Company } from "../company";

export interface XeroCallbackProps {
  url: string;
  company: Company["id"];
}

export interface IsConnectedToXeroProps {
  company: Company["id"];
}

export interface DisconnectXeroProps extends IsConnectedToXeroProps {}

export interface GetCustomersProp {
  company: Company["id"];
}
