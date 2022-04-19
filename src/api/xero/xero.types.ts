import { Company } from "../company";

export interface XeroCallbackProps {
  url: string;
  company: Company["id"];
}
export interface GetCustomersProp {
  company: Company["id"];
}
