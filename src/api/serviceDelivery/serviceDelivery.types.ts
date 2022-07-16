import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { StaffProfile } from "../staffProfile";
import { ClientProfile } from "../clientProfile";
import { QueryParams } from "../../common/types";

export interface ServiceDelivery extends DefaultSchemaConfig {
  date: Date;
  startTime: Date;
  endTime: Date;
  staff: StaffProfile["id"];
  Staff?: StaffProfile;
  client: ClientProfile["id"];
  Client?: ClientProfile;
  company: Company["id"];
  Company?: Company;
}

export interface CreateServiceDeliveryProps {
  date: ServiceDelivery["date"];
  startTime: ServiceDelivery["startTime"];
  endTime: ServiceDelivery["endTime"];
  staff: ServiceDelivery["staff"];
  client: ServiceDelivery["client"];
  company: ServiceDelivery["company"];
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
