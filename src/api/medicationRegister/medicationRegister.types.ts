import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { ClientProfile } from "../clientProfile";
import { StaffProfile } from "../staffProfile";
import { QueryParams } from "../../common/types";

export interface MedicationRegister extends DefaultSchemaConfig {
  startDate: Date;
  endDate?: Date;
  medicationName: string;
  administrationType: string;
  dosage: string;
  frequency: string;
  isPrescribed?: string;
  notes?: string;
  nextReviewDate?: Date;
  company: Company["id"];
  Company?: Company;
  staff: StaffProfile["id"];
  Staff?: StaffProfile;
  client: ClientProfile["id"];
  Client?: ClientProfile;
}

export interface CreateMedicationRegisterProps {
  startDate: MedicationRegister["startDate"];
  endDate: MedicationRegister["endDate"];
  staff: MedicationRegister["staff"];
  client: MedicationRegister["client"];
  medicationName: MedicationRegister["medicationName"];
  administrationType: MedicationRegister["administrationType"];
  dosage: MedicationRegister["dosage"];
  frequency: MedicationRegister["frequency"];
  isPrescribed: MedicationRegister["isPrescribed"];
  notes: MedicationRegister["notes"];
  nextReviewDate: MedicationRegister["nextReviewDate"];
  company: MedicationRegister["company"];
}

export interface UpdateMedicationRegisterProps
  extends CreateMedicationRegisterProps {
  id: MedicationRegister["id"];
}

export interface DeleteMedicationRegisterProps {
  id: MedicationRegister["id"];
  company: MedicationRegister["company"];
}

export interface GetMedicationRegisterByIdProps
  extends DeleteMedicationRegisterProps {}

export interface GetMedicationRegistersProps extends QueryParams {
  company: MedicationRegister["company"];
}
