import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../../components/sequelize/manager";
import {
  ProgressNoteStaffProfile,
  CreateBulkProgressNoteStaffProfileProps,
} from "./progressNoteStaffProfile.types";

class ProgressNoteStaffProfileModel<
    ModelAttributes = ProgressNoteStaffProfile,
    ModelCreationAttributes = CreateBulkProgressNoteStaffProfileProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements ProgressNoteStaffProfile
{
  progressNote!: ProgressNoteStaffProfile["progressNote"];
  staff!: ProgressNoteStaffProfile["staff"];
}

modelManager.init(
  "ProgressNoteStaffProfile",
  ProgressNoteStaffProfileModel,
  {
    progressNote: {
      type: Sequelize.UUIDV4,
      allowNull: false,
    },
    staff: {
      type: Sequelize.UUIDV4,
      allowNull: false,
    },
  },
  {
    defaultScope: {
      attributes: {
        exclude: ["deleted"],
      },
    },
    underscored: true,
    paranoid: false, // <-- We are setting to false because of the update functionality of this Model
    tableName: "progress_notes_staff_profiles",
  }
);

export default ProgressNoteStaffProfileModel;
