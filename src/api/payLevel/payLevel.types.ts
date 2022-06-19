import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { QueryParams } from "../../common/types";

export interface PayLevel extends DefaultSchemaConfig {
  name: string;
  company: Company["id"];
  Company?: Company;
}

export interface CreatePayLevelProps {
  name: PayLevel["name"];
  company: PayLevel["company"];
}

export interface UpdatePayLevelProps extends CreatePayLevelProps {
  id: PayLevel["id"];
}

export interface DeletePayLevelProps {
  id: PayLevel["id"];
  company: PayLevel["company"];
}

export interface GetPayLevelByIdProps extends DeletePayLevelProps {}

export interface GetPayLevelsProps extends QueryParams {
  company: PayLevel["company"];
}
