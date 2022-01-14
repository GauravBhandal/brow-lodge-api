import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import { ProgressNote, CreateProgressNoteProps } from "./progressNote.types";
import { Company } from "../company";

class ProgressNoteModel<
    ModelAttributes = ProgressNote,
    ModelCreationAttributes = CreateProgressNoteProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements ProgressNote
{
  notes!: ProgressNote["notes"];
  company!: Company["id"];
  Company?: Company;
}

modelManager.init(
  "ProgressNote",
  ProgressNoteModel,
  {
    notes: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    underscored: true,
    paranoid: true,
    tableName: "progress_notes",
  }
);

export default ProgressNoteModel;
