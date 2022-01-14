import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";

export interface ProgressNote extends DefaultSchemaConfig {
  notes: string;
  company: Company["id"];
  Company?: Company;
}

export type CreateProgressNoteProps = Pick<ProgressNote, "notes">;

export type UpdateProgressNoteProps = Pick<ProgressNote, "notes">;
