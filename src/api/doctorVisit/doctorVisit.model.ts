import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import { DoctorVisit, CreateDoctorVisitProps } from "./doctorVisit.types";

class DoctorVisitModel<
    ModelAttributes = DoctorVisit,
    ModelCreationAttributes = CreateDoctorVisitProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements DoctorVisit
{
  date!: DoctorVisit["date"];
  time!: DoctorVisit["time"];
  doctorName!: DoctorVisit["doctorName"];
  healthPractitioner!: DoctorVisit["healthPractitioner"];
  reasonForVisit!: DoctorVisit["reasonForVisit"];
  doctorInstructions!: DoctorVisit["doctorInstructions"];
  location?: DoctorVisit["doctorInstructions"];
  appointmentType?: DoctorVisit["doctorInstructions"];
  nextAppointmentDate?: DoctorVisit["nextAppointmentDate"];
  staff!: DoctorVisit["staff"];
  Staff: DoctorVisit["Staff"];
  client!: DoctorVisit["client"];
  Client: DoctorVisit["Client"];
  company!: DoctorVisit["company"];
  Company: DoctorVisit["Company"];
}

modelManager.init(
  "DoctorVisit",
  DoctorVisitModel,
  {
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    time: {
      type: Sequelize.TIME,
      allowNull: false,
    },
    doctorName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    healthPractitioner: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    reasonForVisit: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    doctorInstructions: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    location: {
      type: Sequelize.STRING,
    },
    appointmentType: {
      type: Sequelize.STRING,
    },
    nextAppointmentDate: {
      type: Sequelize.DATE,
    },
  },
  {
    underscored: true,
    paranoid: true,
    tableName: "doctor_visits",
  }
);

export default DoctorVisitModel;
