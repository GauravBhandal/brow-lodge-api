import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { QueryParams } from "../../common/types";
import { Attachment } from "../attachment";
import { ClientContact } from "./clientContact";
import { CreateClientContactProps } from "./clientContact/clientContact.types";

export interface ClientProfile extends DefaultSchemaConfig {
  firstName: string;
  lastName: string;
  preferredName: string;
  email?: string;
  gender?: "male" | "female" | "other";
  accountingCode?: string;
  dateOfBirth?: Date;
  address?: string;
  contactNumber?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactRelation?: string;
  height?: number;
  fundingType?: "ndisManaged" | "planManaged" | "selfManaged";
  ndisNumber?: string;
  medicareNumber?: string;
  privateHealthcareNumber?: string;
  ambulanceNumber?: string;
  serviceStartDate?: Date;
  serviceEndDate?: Date;
  archived?: boolean;
  company: Company["id"];
  Company?: Company;
  attachment?: Attachment["id"];
  Contacts?: ClientContact[];
}

export interface CreateClientProfileProps {
  firstName: ClientProfile["firstName"];
  lastName: ClientProfile["lastName"];
  preferredName: ClientProfile["preferredName"];
  email: ClientProfile["email"];
  gender: ClientProfile["gender"];
  accountingCode: ClientProfile["accountingCode"];
  dateOfBirth: ClientProfile["dateOfBirth"];
  address: ClientProfile["address"];
  contactNumber: ClientProfile["contactNumber"];
  emergencyContactName: ClientProfile["emergencyContactName"];
  emergencyContactPhone: ClientProfile["emergencyContactPhone"];
  emergencyContactRelation: ClientProfile["emergencyContactRelation"];
  height: ClientProfile["height"];
  fundingType: ClientProfile["fundingType"];
  ndisNumber: ClientProfile["ndisNumber"];
  medicareNumber: ClientProfile["medicareNumber"];
  privateHealthcareNumber: ClientProfile["privateHealthcareNumber"];
  ambulanceNumber: ClientProfile["ambulanceNumber"];
  serviceStartDate: ClientProfile["serviceStartDate"];
  serviceEndDate: ClientProfile["serviceEndDate"];
  company: ClientProfile["company"];
  attachment: ClientProfile["attachment"];
}

export interface UpdateClientProfileProps extends CreateClientProfileProps {
  id: ClientProfile["id"];
  contacts?: Omit<CreateClientContactProps, "client" | "company">[];
}

export interface DeleteClientProfileProps {
  id: ClientProfile["id"];
  company: ClientProfile["company"];
}

export interface GetClientProfileByIdProps extends DeleteClientProfileProps {}

export interface GetClientProfilesProps extends QueryParams {
  company: ClientProfile["company"];
}
