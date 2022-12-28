import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { StaffProfile } from "../staffProfile";
import { ClientProfile } from "../clientProfile";
import { QueryParams } from "../../common/types";
import { RestrictivePracticeLogType } from "./restrictivePracticeLogType";

export interface RestrictivePracticeLog extends DefaultSchemaConfig {
  isAuthorised: string;
  impactOnAnyPerson: string;
  injuryToAnyPerson: string;
  wasReportableIncident: string;
  reasonBehindUse: string;
  describeBehaviour: string;
  startDate: Date;
  startTime: Date;
  startLocation: string;
  endDate: Date;
  endTime: Date;
  endLocation: string;
  anyWitness: string;
  actionTakenInResponse: string;
  alternativesConsidered: string;
  actionTakenLeadingUpTo: string;
  Staff?: StaffProfile[];
  client: ClientProfile["id"];
  Client?: ClientProfile;
  company: Company["id"];
  Company?: Company;
  Type?: RestrictivePracticeLogType[];
}

export interface CreateRestrictivePracticeLogProps {
  isAuthorised: RestrictivePracticeLog["isAuthorised"];
  type: string[];
  impactOnAnyPerson: RestrictivePracticeLog["impactOnAnyPerson"];
  injuryToAnyPerson: RestrictivePracticeLog["injuryToAnyPerson"];
  wasReportableIncident: RestrictivePracticeLog["wasReportableIncident"];
  reasonBehindUse: RestrictivePracticeLog["reasonBehindUse"];
  describeBehaviour: RestrictivePracticeLog["describeBehaviour"];
  startDate: RestrictivePracticeLog["startDate"];
  startTime: RestrictivePracticeLog["startTime"];
  startLocation: RestrictivePracticeLog["startLocation"];
  endDate: RestrictivePracticeLog["endDate"];
  endTime: RestrictivePracticeLog["endTime"];
  endLocation: RestrictivePracticeLog["endLocation"];
  anyWitness: RestrictivePracticeLog["anyWitness"];
  actionTakenInResponse: RestrictivePracticeLog["actionTakenInResponse"];
  alternativesConsidered: RestrictivePracticeLog["alternativesConsidered"];
  actionTakenLeadingUpTo: RestrictivePracticeLog["actionTakenLeadingUpTo"];
  staff: StaffProfile["id"][];
  client: RestrictivePracticeLog["client"];
  company: RestrictivePracticeLog["company"];
}

export interface UpdateRestrictivePracticeLogProps
  extends CreateRestrictivePracticeLogProps {
  id: RestrictivePracticeLog["id"];
}

export interface DeleteRestrictivePracticeLogProps {
  id: RestrictivePracticeLog["id"];
  company: RestrictivePracticeLog["company"];
}

export interface GetRestrictivePracticeLogByIdProps
  extends DeleteRestrictivePracticeLogProps { }

export interface GetRestrictivePracticeLogsProps extends QueryParams {
  company: RestrictivePracticeLog["company"];
}
