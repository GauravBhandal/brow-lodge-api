import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { Service } from "../service";
import { StaffProfile } from "../staffProfile";
import { ClientProfile } from "../clientProfile";
import { QueryParams } from "../../common/types";
import { ProgressNote } from "../progressNote";

export interface ServiceDelivery extends DefaultSchemaConfig {
  date: Date;
  startTime: Date;
  endTime: Date;
  notes: string;
  staff: StaffProfile["id"];
  Staff?: StaffProfile;
  service: Service["id"];
  Service?: Service;
  client: ClientProfile["id"];
  Client?: ClientProfile;
  company: Company["id"];
  Company?: Company;
  progressnote?: ProgressNote["id"];
}

export interface CreateServiceDeliveryProps {
  date: ServiceDelivery["date"];
  startTime: ServiceDelivery["startTime"];
  endTime: ServiceDelivery["endTime"];
  notes: ServiceDelivery["notes"];
  staff: ServiceDelivery["staff"];
  client: ServiceDelivery["client"];
  company: ServiceDelivery["company"];
  service: ServiceDelivery["service"];
  progressnote: ServiceDelivery["progressnote"];
}

export interface UpdateServiceDeliveryProps extends CreateServiceDeliveryProps {
  id: ServiceDelivery["id"];
}

export interface DeleteServiceDeliveryProps {
  id: ServiceDelivery["id"];
  company: ServiceDelivery["company"];
}

export interface GetServiceDeliveryByIdProps
  extends DeleteServiceDeliveryProps {}

export interface GetServiceDeliveriesProps extends QueryParams {
  company: ServiceDelivery["company"];
}
