import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { EyelashExtensionDetail } from "../eyelashExtensionDetail";
import { QueryParams } from "../../common/types";
import { ClientProfile } from "../clientProfile";

export interface EyelashExtension extends DefaultSchemaConfig {
  technicianName: string;
  doctorName?: string;
  doctorAddress?: string;
  isPregnant?: boolean;
  eyeSyndrome?: boolean;
  hrt?: boolean;
  eyeComplaint?: boolean;
  skinPatchTest?: boolean;
  date: Date;
  clientSign: string;
  skinPatchTestDate?: Date;
  client: ClientProfile["id"];
  Client?: ClientProfile;
  company: Company["id"];
  Company?: Company;
}

export interface CreateEyelashExtensionProps {
  technicianName: EyelashExtension["technicianName"];
  doctorName: EyelashExtension["doctorName"];
  clientSign: EyelashExtension["clientSign"];
  doctorAddress: EyelashExtension["doctorAddress"];
  isPregnant: EyelashExtension["isPregnant"];
  eyeSyndrome: EyelashExtension["eyeSyndrome"];
  hrt: EyelashExtension["hrt"];
  eyeComplaint: EyelashExtension["eyeComplaint"];
  skinPatchTest: EyelashExtension["skinPatchTest"];
  date: EyelashExtension["date"];
  skinPatchTestDate: EyelashExtension["skinPatchTestDate"];
  client: EyelashExtension["client"];
  company: EyelashExtension["company"];
}

export interface UpdateEyelashExtensionProps
  extends CreateEyelashExtensionProps {
  id: EyelashExtension["id"];
}

export interface DeleteEyelashExtensionProps {
  id: EyelashExtension["id"];
  company: EyelashExtension["company"];
}

export interface GetEyelashExtensionByIdProps
  extends DeleteEyelashExtensionProps {}

export interface GetEyelashExtensionsProps extends QueryParams {
  company: EyelashExtension["company"];
}
