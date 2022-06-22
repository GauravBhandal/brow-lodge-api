import { DefaultSchemaConfig } from "../../../components/sequelize/manager";
import { PayLevel } from "../../payLevel";
import { Company } from "../../company";
import { Service } from "..";

export interface ServicePayLevel extends DefaultSchemaConfig {
  paylevel: PayLevel["id"];
  service: Service["id"];
  payitem: string;
  company: Company["id"];
}

export interface CreateBulkServicePayLevelProps {
  paylevel: ServicePayLevel["paylevel"];
  service: ServicePayLevel["service"];
  payitem: ServicePayLevel["payitem"];
  company: ServicePayLevel["company"];
}

export interface UpdateBulkServicePayLevelProps
  extends CreateBulkServicePayLevelProps {}

export interface DeleteBulkServicePayLevelProps {
  company: Company["id"];
}

export interface GetServicePayLevelProps {
  company: Company["id"];
}
