import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { StaffProfile } from "../staffProfile";
import { ClientProfile } from "../clientProfile";
import { QueryParams } from "../../common/types";

export interface DoctorVisit extends DefaultSchemaConfig {
  date: Date;
  time: Date;
  doctorName: string;
  healthPractitioner: string;
  reasonForVisit: string;
  doctorInstructions: string;
  location?: string;
  appointmentType?: string;
  nextAppointmentDate?: Date;
  staff: StaffProfile["id"];
  Staff?: StaffProfile;
  client: ClientProfile["id"];
  Client?: ClientProfile;
  company: Company["id"];
  Company?: Company;
}

export interface CreateDoctorVisitProps {
  date: DoctorVisit["date"];
  time: DoctorVisit["time"];
  doctorName: DoctorVisit["doctorName"];
  healthPractitioner: DoctorVisit["healthPractitioner"];
  reasonForVisit: DoctorVisit["reasonForVisit"];
  doctorInstructions: DoctorVisit["doctorInstructions"];
  location: DoctorVisit["location"];
  appointmentType: DoctorVisit["appointmentType"];
  nextAppointmentDate: DoctorVisit["nextAppointmentDate"];
  staff: DoctorVisit["staff"];
  client: DoctorVisit["client"];
  company: DoctorVisit["company"];
}

export interface UpdateDoctorVisitProps extends CreateDoctorVisitProps {
  id: DoctorVisit["id"];
}

export interface DeleteDoctorVisitProps {
  id: DoctorVisit["id"];
  company: DoctorVisit["company"];
}

export interface GetDoctorVisitByIdProps extends DeleteDoctorVisitProps {}

export interface GetDoctorVisitsProps extends QueryParams {
  company: DoctorVisit["company"];
}
