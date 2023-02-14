import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import { StaffUnavailabilityRepeat, CreateStaffUnavailabilityRepeatProps } from "./staffUnavailabilityRepeat.types";

class StaffUnavailabilityRepeatModel<
  ModelAttributes = StaffUnavailabilityRepeat,
  ModelCreationAttributes = CreateStaffUnavailabilityRepeatProps
>
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements StaffUnavailabilityRepeat {
  meta!: StaffUnavailabilityRepeat["meta"];
  company!: StaffUnavailabilityRepeat["company"];
  Company: StaffUnavailabilityRepeat["Company"];
}

modelManager.init(
  "StaffUnavailabilityRepeat",
  StaffUnavailabilityRepeatModel,
  {
    meta: {
      type: Sequelize.JSONB,
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
    paranoid: true,
    tableName: "staff_unavailability_repeat",
  }
);

export default StaffUnavailabilityRepeatModel;
