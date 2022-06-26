import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../../components/sequelize/manager";
import {
  CompanyAssetAttachment,
  CreateBulkCompanyAssetAttachmentProps,
} from "./companyAssetAttachment.types";

class CompanyAssetAttachmentModel<
    ModelAttributes = CompanyAssetAttachment,
    ModelCreationAttributes = CreateBulkCompanyAssetAttachmentProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements CompanyAssetAttachment
{
  relation!: CompanyAssetAttachment["relation"];
  attachment!: CompanyAssetAttachment["attachment"];
}

modelManager.init(
  "CompanyAssetAttachment",
  CompanyAssetAttachmentModel,
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
    tableName: "company_assets_attachments",
  }
);

export default CompanyAssetAttachmentModel;
