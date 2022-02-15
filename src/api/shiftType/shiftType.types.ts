import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { QueryParams } from "../../common/types";

export interface ShiftType extends DefaultSchemaConfig {
  name: string;
  company: Company["id"];
  Company?: Company;
}

export interface CreateShiftTypeProps {
  name: ShiftType["name"];
  company: ShiftType["company"];
}

export interface UpdateShiftTypeProps extends CreateShiftTypeProps {
  id: ShiftType["id"];
}

export interface DeleteShiftTypeProps {
  id: ShiftType["id"];
  company: ShiftType["company"];
}

export interface GetShiftTypeByIdProps extends DeleteShiftTypeProps {}

export interface GetShiftTypesProps extends QueryParams {
  company: ShiftType["company"];
}
