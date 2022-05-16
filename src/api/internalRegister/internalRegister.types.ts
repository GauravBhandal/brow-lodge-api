import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { QueryParams } from "../../common/types";
import { Attachment } from "../attachment";

export interface InternalRegister extends DefaultSchemaConfig {
  notes?: string;
  name: string;
  version: string;
  company: Company["id"];
  Company?: Company;
  Attachments?: Attachment[];
}

export interface CreateInternalRegisterProps {
  notes: InternalRegister["notes"];
  name: InternalRegister["name"];
  version: InternalRegister["version"];
  company: InternalRegister["company"];
  attachments?: Attachment["id"][];
}

export interface UpdateInternalRegisterProps
  extends CreateInternalRegisterProps {
  id: InternalRegister["id"];
}

export interface DeleteInternalRegisterProps {
  id: InternalRegister["id"];
  company: InternalRegister["company"];
}

export interface GetInternalRegisterByIdProps
  extends DeleteInternalRegisterProps {}

export interface GetInternalRegistersProps extends QueryParams {
  company: InternalRegister["company"];
}
