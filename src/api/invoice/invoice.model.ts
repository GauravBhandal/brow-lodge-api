import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import { Invoice, CreateInvoiceProps } from "./invoice.types";

class InvoiceModel<
    ModelAttributes = Invoice,
    ModelCreationAttributes = CreateInvoiceProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements Invoice
{
  lastExportedOn!: Invoice["lastExportedOn"];
  startDateTime!: Invoice["startDateTime"];
  endDateTime!: Invoice["endDateTime"];
  status!: Invoice["status"];
  client!: Invoice["client"];
  Client: Invoice["Client"];
  shift!: Invoice["shift"];
  Shift: Invoice["Shift"];
  company!: Invoice["company"];
  Company: Invoice["Company"];
}

modelManager.init(
  "Invoice",
  InvoiceModel,
  {
    startDateTime: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    endDateTime: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastExportedOn: {
      type: Sequelize.DATE,
    },
  },
  {
    defaultScope: {
      attributes: {
        exclude: ["deleted"],
      },
    },
    underscored: true,
    paranoid: true,
    tableName: "invoices",
  }
);

export default InvoiceModel;
