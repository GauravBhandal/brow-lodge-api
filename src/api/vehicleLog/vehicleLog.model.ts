import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import { VehicleLog, CreateVehicleLogProps } from "./vehicleLog.types";

class VehicleLogModel<
    ModelAttributes = VehicleLog,
    ModelCreationAttributes = CreateVehicleLogProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements VehicleLog
{
  date!: VehicleLog["date"];
  start_time!: VehicleLog["start_time"];
  end_time!: VehicleLog["end_time"];
  odometer_reading_start!: VehicleLog["odometer_reading_start"];
  odometer_reading_end!: VehicleLog["odometer_reading_end"];
  purpose_of_the_journey!: VehicleLog["purpose_of_the_journey"];
  total_km!: VehicleLog["total_km"];
  vehicle!: VehicleLog["vehicle"];
  staff!: VehicleLog["staff"];
  Staff: VehicleLog["Staff"];
  client!: VehicleLog["client"];
  Client: VehicleLog["Client"];
  company!: VehicleLog["company"];
  Company: VehicleLog["Company"];
}

modelManager.init(
  "VehicleLog",
  VehicleLogModel,
  {
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    start_time: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    end_time: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    odometer_reading_start: {
      type: Sequelize.BIGINT,
      allowNull: false,
    },
    odometer_reading_end: {
      type: Sequelize.BIGINT,
      allowNull: false,
    },
    purpose_of_the_journey: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    total_km: {
      type: Sequelize.NUMBER,
      allowNull: false,
    },
    vehicle: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    underscored: true,
    paranoid: true,
    tableName: "vehicle_logs",
  }
);

export default VehicleLogModel;
