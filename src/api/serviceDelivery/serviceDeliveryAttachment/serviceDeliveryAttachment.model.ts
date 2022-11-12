import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../../components/sequelize/manager";
import {
  ServiceDeliveryAttachment,
  CreateBulkServiceDeliveryAttachmentProps,
} from "./serviceDeliveryAttachment.types";

class ServiceDeliveryAttachmentModel<
    ModelAttributes = ServiceDeliveryAttachment,
    ModelCreationAttributes = CreateBulkServiceDeliveryAttachmentProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements ServiceDeliveryAttachment
{
  relation!: ServiceDeliveryAttachment["relation"];
  attachment!: ServiceDeliveryAttachment["attachment"];
}

modelManager.init(
  "ServiceDeliveryAttachment",
  ServiceDeliveryAttachmentModel,
  {
    relation: {
      type: Sequelize.UUIDV4,
      allowNull: false,
    },
    attachment: {
      type: Sequelize.UUIDV4,
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
    paranoid: false, // <-- We are setting to false because of the update functionality of this Model
    tableName: "service_delivery_attachments",
  }
);

export default ServiceDeliveryAttachmentModel;
