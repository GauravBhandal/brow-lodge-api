import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { StaffProfile } from "../staffProfile";
import { ClientProfile } from "../clientProfile";
import { QueryParams } from "../../common/types";

export interface SeizureLog extends DefaultSchemaConfig {
  date: Date;
  startTime: Date;
  endTime: Date;
  seizure: string;
  recovery: string;
  comments?: string;
  staff: StaffProfile["id"];
  Staff?: StaffProfile;
  client: ClientProfile["id"];
  Client?: ClientProfile;
  company: Company["id"];
  Company?: Company;
}

export interface CreateSeizureLogProps {
  date: SeizureLog["date"];
  startTime: SeizureLog["startTime"];
  endTime: SeizureLog["endTime"];
  seizure: SeizureLog["seizure"];
  recovery: SeizureLog["recovery"];
  comments: SeizureLog["comments"];
  staff: SeizureLog["staff"];
  client: SeizureLog["client"];
  company: SeizureLog["company"];
}

export interface UpdateSeizureLogProps extends CreateSeizureLogProps {
  id: SeizureLog["id"];
}

export interface DeleteSeizureLogProps {
  id: SeizureLog["id"];
  company: SeizureLog["company"];
}

export interface GetSeizureLogByIdProps extends DeleteSeizureLogProps {}

export interface GetSeizureLogsProps extends QueryParams {
  company: SeizureLog["company"];
}
