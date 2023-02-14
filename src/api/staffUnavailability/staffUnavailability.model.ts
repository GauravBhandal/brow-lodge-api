import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import { StaffUnavailability, CreateStaffUnavailabilityProps } from "./staffUnavailability.types";

class StaffUnavailabilityModel<
  ModelAttributes = StaffUnavailability,
  ModelCreationAttributes = CreateStaffUnavailabilityProps
>
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements StaffUnavailability {
  startDateTime!: StaffUnavailability["startDateTime"];
  endDateTime!: StaffUnavailability["endDateTime"];
  staff!: StaffUnavailability["staff"];
  Staff: StaffUnavailability["Staff"];
  company!: StaffUnavailability["company"];
  Company: StaffUnavailability["Company"];
  repeat?: StaffUnavailability["repeat"];
}

modelManager.init(
  "StaffUnavailability",
  StaffUnavailabilityModel,
  {
    startDateTime: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    endDateTime: {
      type: Sequelize.DATE,
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
    tableName: "staff_unavailability",
  }
);

export default StaffUnavailabilityModel;
