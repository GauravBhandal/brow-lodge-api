import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { ClientProfile } from "../clientProfile";
import { QueryParams } from "../../common/types";

export interface RestrictivePracticeRegister extends DefaultSchemaConfig {
  startDate: Date;
  endDate?: Date;
  startTime: Date;
  endTime?: Date;
  typeOfRestrictivePractice: string;
  description: string;
  administrationType: string;
  behaviourOfConcerns: string;
  isAuthorised: string;
  reportingFrequency: string;
  nextReviewDate?: Date;
  client: ClientProfile["id"];
  Client?: ClientProfile;
  company: Company["id"];
  Company?: Company;
  archived?: boolean;
}

export interface CreateRestrictivePracticeRegisterProps {
  startDate: RestrictivePracticeRegister["startDate"];
  endDate: RestrictivePracticeRegister["endDate"];
  startTime: RestrictivePracticeRegister["startTime"];
  endTime: RestrictivePracticeRegister["endTime"];
  typeOfRestrictivePractice: RestrictivePracticeRegister["typeOfRestrictivePractice"];
  description: RestrictivePracticeRegister["description"];
  administrationType: RestrictivePracticeRegister["administrationType"];
  behaviourOfConcerns: RestrictivePracticeRegister["behaviourOfConcerns"];
  isAuthorised: RestrictivePracticeRegister["isAuthorised"];
  reportingFrequency: RestrictivePracticeRegister["reportingFrequency"];
  nextReviewDate: RestrictivePracticeRegister["nextReviewDate"];
  client: RestrictivePracticeRegister["client"];
  company: RestrictivePracticeRegister["company"];
}

export interface UpdateRestrictivePracticeRegisterProps
  extends CreateRestrictivePracticeRegisterProps {
  id: RestrictivePracticeRegister["id"];
}

export interface DeleteRestrictivePracticeRegisterProps {
  id: RestrictivePracticeRegister["id"];
  company: RestrictivePracticeRegister["company"];
}

export interface GetRestrictivePracticeRegisterByIdProps
  extends DeleteRestrictivePracticeRegisterProps {}

export interface GetRestrictivePracticeRegistersProps extends QueryParams {
  company: RestrictivePracticeRegister["company"];
}
