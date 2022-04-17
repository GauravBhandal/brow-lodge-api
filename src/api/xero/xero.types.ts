import { Company } from "../company";

export interface XeroCallbackProps {
  url: string;
  company: Company["id"];
}
