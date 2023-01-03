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
  startTime!: VehicleLog["startTime"];
  endTime!: VehicleLog["endTime"];
  odometerReadingStart!: VehicleLog["odometerReadingStart"];
  odometerReadingEnd!: VehicleLog["odometerReadingEnd"];
  purposeOfTheJourney!: VehicleLog["purposeOfTheJourney"];
  totalKm!: VehicleLog["totalKm"];
  vehicle!: VehicleLog["vehicle"];
  staff!: VehicleLog["staff"];
  Staff: VehicleLog["Staff"];
  client!: VehicleLog["client"];
  Client: VehicleLog["Client"];
  company!: VehicleLog["company"];
  Company: VehicleLog["Company"];
  archived: VehicleLog["archived"];
}

modelManager.init(
  "VehicleLog",
  VehicleLogModel,
  {
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    startTime: {
      type: Sequelize.TIME,
      allowNull: false,
    },
    endTime: {
      type: Sequelize.TIME,
      allowNull: false,
    },
    odometerReadingStart: {
      type: Sequelize.BIGINT,
      allowNull: false,
    },
    odometerReadingEnd: {
      type: Sequelize.BIGINT,
      allowNull: false,
    },
    purposeOfTheJourney: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    totalKm: {
      type: Sequelize.NUMBER,
      allowNull: false,
    },
    vehicle: {
      type: Sequelize.STRING,
      allowNull: false,
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
    tableName: "vehicle_logs",
  }
);

export default VehicleLogModel;
