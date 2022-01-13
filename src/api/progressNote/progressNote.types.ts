import { DefaultSchemaConfig } from "../../components/sequelize/manager";

export interface ProgressNote extends DefaultSchemaConfig {
  notes: string;
}

export type CreateProgressNoteProps = Pick<ProgressNote, "notes">;

export type UpdateProgressNoteProps = Pick<ProgressNote, "notes">;
