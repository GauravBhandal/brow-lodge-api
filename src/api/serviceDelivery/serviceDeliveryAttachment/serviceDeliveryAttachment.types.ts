import { DefaultSchemaConfig } from "../../../components/sequelize/manager";
import { Attachment } from "../../attachment";
import { ServiceDelivery } from "../serviceDelivery.types";

export interface ServiceDeliveryAttachment extends DefaultSchemaConfig {
  relation: ServiceDelivery["id"];
  attachment: Attachment["id"];
}

export interface CreateBulkServiceDeliveryAttachmentProps {
  relation: ServiceDeliveryAttachment["relation"];
  attachments: ServiceDeliveryAttachment["attachment"][];
}

export interface UpdateBulkServiceDeliveryAttachmentProps
  extends CreateBulkServiceDeliveryAttachmentProps {}

export interface DeleteBulkServiceDeliveryAttachmentProps {
  relation: ServiceDeliveryAttachment["relation"];
}
