import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import { IncidentType, CreateIncidentTypeProps } from "./incidentType.types";

class IncidentTypeModel<
    ModelAttributes = IncidentType,
    ModelCreationAttributes = CreateIncidentTypeProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements IncidentType
{
  type!: IncidentType["type"];
}

modelManager.init(
  "IncidentType",
  IncidentTypeModel,
  {
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
    paranoid: true,
    tableName: "incident_types",
  }
);

export default IncidentTypeModel;
