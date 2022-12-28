import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../../components/sequelize/manager";
import {
  RestrictivePracticeLogType,
  CreateBulkRestrictivePracticeLogTypeProps,
} from "./restrictivePracticeLogType.types";

class RestrictivePracticeLogTypeModel<
  ModelAttributes = RestrictivePracticeLogType,
  ModelCreationAttributes = CreateBulkRestrictivePracticeLogTypeProps
>
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements RestrictivePracticeLogType {
  restrictivePracticeLog!: RestrictivePracticeLogType["restrictivePracticeLog"];
  type!: RestrictivePracticeLogType["type"];
}

modelManager.init(
  "RestrictivePracticeLogType",
  RestrictivePracticeLogTypeModel,
  {
    restrictivePracticeLog: {
      type: Sequelize.UUIDV4,
      allowNull: false,
    },
    type: {
      type: Sequelize.STRING,
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
    tableName: "restrictive_practice_logs_types",
  }
);

export default RestrictivePracticeLogTypeModel;
