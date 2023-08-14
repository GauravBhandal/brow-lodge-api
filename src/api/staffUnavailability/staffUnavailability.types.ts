import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { QueryParams } from "../../common/types";
import { StaffProfile } from "../staffProfile";

export interface StaffUnavailability extends DefaultSchemaConfig {
  startDateTime: Date;
  endDateTime: Date;
  staff: StaffProfile["id"];
  Staff?: StaffProfile;
  company: Company["id"];
  Company?: Company;
  repeat?: JSON;
}

export interface CreateStaffUnavailabilityProps {
  startDateTime: StaffUnavailability["startDateTime"];
  endDateTime: StaffUnavailability["endDateTime"];
  staff: StaffProfile["id"];
  company: StaffUnavailability["company"];
  repeat: any;
}

export interface CreateStaffUnavailabilityInBulkHelperProps {
  startDateTime: StaffUnavailability["startDateTime"];
  endDateTime: StaffUnavailability["endDateTime"];
  staff: StaffProfile["id"];
  company: StaffUnavailability["company"];
  repeat: any; // TODO: Remove any
  timezone?: string;
}

export interface CreateStaffUnavailabilityInBulkProps {
  startDateTime: StaffUnavailability["startDateTime"];
  endDateTime: StaffUnavailability["endDateTime"];
  staff: StaffProfile["id"];
  company: StaffUnavailability["company"];
  repeat: any; // TODO: Remove any
}

export interface DeleteStaffUnavailabilityProps {
  id: StaffUnavailability["id"];
  company: StaffUnavailability["company"];
}

export interface GetStaffUnavailabilityByIdProps extends DeleteStaffUnavailabilityProps { }

export interface GetStaffUnavailabilitysProps extends QueryParams {
  company: StaffUnavailability["company"];
}