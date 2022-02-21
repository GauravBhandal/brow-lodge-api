import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { QueryParams } from "../../common/types";

export interface IncidentType extends DefaultSchemaConfig {
  type: string;
}

export interface CreateIncidentTypeProps {
  type: IncidentType["type"];
}

export interface GetIncidentTypeByIdProps {
  id: IncidentType["id"];
}

export interface GetIncidentTypesProps extends QueryParams {}
