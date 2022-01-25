import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { StaffProfile } from "../staffProfile";
import { QueryParams } from "../../common/types";

export interface Feedback extends DefaultSchemaConfig {
  dateReported: Date;
  name?: String;
  email?: String;
  phone?: String;
  youAreA: String;
  typeOfFeedback: String;
  feedback: String;
  assessments?: String;
  actions?: String;
  notifiedOfResult?: String;
  dateClosed?: Date;
  status?: String;
  staff?: StaffProfile["id"];
  Staff?: StaffProfile;
  company: Company["id"];
  Company?: Company;
}

export interface CreateFeedbackProps {
  dateReported: Feedback["dateReported"];
  name?: Feedback["name"];
  email?: Feedback["email"];
  phone?: Feedback["phone"];
  youAreA: Feedback["youAreA"];
  typeOfFeedback: Feedback["typeOfFeedback"];
  feedback: Feedback["feedback"];
  assessments?: Feedback["assessments"];
  actions?: Feedback["actions"];
  notifiedOfResult?: Feedback["notifiedOfResult"];
  dateClosed?: Feedback["dateClosed"];
  status?: Feedback["status"];
  staff: Feedback["staff"];
  company: Feedback["company"];
}

export interface UpdateFeedbackProps extends CreateFeedbackProps {
  id: Feedback["id"];
}

export interface DeleteFeedbackProps {
  id: Feedback["id"];
  company: Feedback["company"];
}

export interface GetFeedbackByIdProps extends DeleteFeedbackProps {}

export interface GetFeedbacksProps extends QueryParams {
  company: Feedback["company"];
}
