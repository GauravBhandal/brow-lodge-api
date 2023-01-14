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
  date!: ProgressNote["date"];
  shiftStartTime!: ProgressNote["shiftStartTime"];
  shiftEndTime!: ProgressNote["shiftEndTime"];
  notes!: ProgressNote["notes"];
  client!: ProgressNote["client"];
  Client: ProgressNote["Client"];
  company!: ProgressNote["company"];
  Company: ProgressNote["Company"];
  Attachments: ProgressNote["Attachments"];
  customFieldsData: ProgressNote["customFieldsData"];
  archived: ProgressNote["archived"];
}

modelManager.init(
  "ProgressNote",
  ProgressNoteModel,
  {
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    shiftStartTime: {
      type: Sequelize.TIME,
      allowNull: false,
    },
    shiftEndTime: {
      type: Sequelize.TIME,
      allowNull: false,
    },
    notes: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    customFieldsData: {
      type: Sequelize.JSONB,
    },
    archived: {
      type: Sequelize.BOOLEAN,
    },
  },
  {
    defaultScope: {
      attributes: {
        exclude: ["deleted"],
      },
    },
    underscored: true,
    paranoid: true,
    tableName: "progress_notes",
  }
);

export default ProgressNoteModel;
