import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Attachment } from "../attachment";

export interface Company extends DefaultSchemaConfig {
  name: string;
  phone?: string;
  address?: string;
  website?: string;
  email?: string;
  ndisRegistrationNumber?: string;
  timezone?: string;
  attachment?: Attachment["id"];
}

export interface CreateCompanyProps {
  name: Company["name"];
}

export interface UpdateMyCompanyProps extends CreateCompanyProps {
  company: Company["id"];
  phone: string;
  address: string;
  website: string;
  email: string;
  ndisRegistrationNumber: string;
  timezone: string;
  attachment: Attachment["id"];
}

export interface GetMyCompanyProps {
  company: Company["id"];
}
