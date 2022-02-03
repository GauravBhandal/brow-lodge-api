import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import { InjuryReport, CreateInjuryReportProps } from "./injuryReport.types";

class InjuryReportModel<
    ModelAttributes = InjuryReport,
    ModelCreationAttributes = CreateInjuryReportProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements InjuryReport
{
  date!: InjuryReport["date"];
  time!: InjuryReport["time"];
  description!: InjuryReport["description"];
  staff!: InjuryReport["staff"];
  Staff: InjuryReport["Staff"];
  client!: InjuryReport["client"];
  Client: InjuryReport["Client"];
  company!: InjuryReport["company"];
  Company: InjuryReport["Company"];
  Attachments: InjuryReport["Attachments"];
}

modelManager.init(
  "InjuryReport",
  InjuryReportModel,
  {
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    time: {
      type: Sequelize.TIME,
      allowNull: false,
    },
    description: {
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
    paranoid: true,
    tableName: "injury_reports",
  }
);

export default InjuryReportModel;
