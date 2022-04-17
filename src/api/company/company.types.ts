import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Attachment } from "../attachment";

export interface Company extends DefaultSchemaConfig {
  name: string;
  phone?: string;
  address?: string;
  attachment?: Attachment["id"];
  xeroTokenSet: any;
}

export interface CreateCompanyProps {
  name: Company["name"];
}

export interface UpdateMyCompanyProps extends CreateCompanyProps {
  company: Company["id"];
  phone: string;
  address: string;
  attachment: Attachment["id"];
}

export interface UpdateCompanyXeroTokenSetProps {
  xeroTokenSet: any;
  company: Company["id"];
}

export interface GetMyCompanyProps {
  company: Company["id"];
}
