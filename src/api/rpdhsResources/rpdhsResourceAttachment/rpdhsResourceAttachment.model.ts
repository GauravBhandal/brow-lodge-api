import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../../components/sequelize/manager";
import {
  RpdhsResourceAttachment,
  CreateBulkRpdhsResourceAttachmentProps,
} from "./rpdhsResourceAttachment.types";

class RpdhsResourceAttachmentModel<
    ModelAttributes = RpdhsResourceAttachment,
    ModelCreationAttributes = CreateBulkRpdhsResourceAttachmentProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements RpdhsResourceAttachment
{
  relation!: RpdhsResourceAttachment["relation"];
  attachment!: RpdhsResourceAttachment["attachment"];
}

modelManager.init(
  "RpdhsResourceAttachment",
  RpdhsResourceAttachmentModel,
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
    tableName: "rpdhs_resources_attachments",
  }
);

export default RpdhsResourceAttachmentModel;
