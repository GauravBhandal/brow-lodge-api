import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import { ProgressNote, CreateProgressNoteProps } from "./progressNote.types";

class ProgressNoteModel<
    ModelAttributes = ProgressNote,
    ModelCreationAttributes = CreateProgressNoteProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements ProgressNote
{
  notes!: ProgressNote["notes"];
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
    paranoid: true,
    tableName: "progressNotes",
  }
);

export default ProgressNoteModel;
