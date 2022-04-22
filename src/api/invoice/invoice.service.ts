import { omit as _omit } from "lodash";
import { Op } from "sequelize";
import config from "../../config/environment";

import InvoiceModel from "./invoice.model";
import {
  CreateInvoiceProps,
  UpdateInvoiceProps,
  DeleteInvoiceProps,
  GetInvoiceByIdProps,
  GetInvoicesProps,
  UpdateInvoiceOnShiftUpdateProps,
  UpdateInvoiceStatusProps,
  GenerateInvoicesProps,
} from "./invoice.types";
import { CustomError } from "../../components/errors";
import InvoiceErrorCode from "./invoice.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel, companyService } from "../company";
import { StaffProfileModel } from "../staffProfile";
import { getFilters } from "../../components/filters";
import { ShiftRecordModel } from "../shiftRecord";
import { ClientProfileModel } from "../clientProfile";
import { ServiceModel } from "../service";
import { Invoice, Invoices } from "xero-node";
import xero from "../../components/xero";
import { getMinutesDiff } from "../../utils/shiftGenerator";

class InvoiceService {
  async createInvoiceInBulk(props: CreateInvoiceProps) {
    const createProps = props.client.map((singleClient) => ({
      ...props,
      client: singleClient,
    }));

    const invoice = await InvoiceModel.bulkCreate(createProps);
    return invoice;
  }

  async updateInvoice(props: UpdateInvoiceProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find invoice by id and company
    const invoice = await InvoiceModel.findOne({
      where: { id, company },
    });

    // if invoice not found, throw an error
    if (!invoice) {
      throw new CustomError(404, InvoiceErrorCode.INVOICE_NOT_FOUND);
    }

    // Finally, update the invoice
    const [, [updatedInvoice]] = await InvoiceModel.update(updateProps, {
      where: { id, company },
      returning: true,
    });
    return updatedInvoice;
  }

  async updateInvoiceStatus(props: UpdateInvoiceStatusProps) {
    // Props
    const { ids, company, status, lastExportedXero } = props;
    const updateProps = { status, lastExportedXero };

    // Finally, update the invoice
    const [, [updatedInvoice]] = await InvoiceModel.update(updateProps, {
      where: {
        id: {
          [Op.or]: ids,
        },
        company,
      },
      returning: true,
    });
    return updatedInvoice;
  }

  async generateInvoices(props: GenerateInvoicesProps) {
    // Props
    const { ids, company } = props;

    const include = [
      {
        model: CompanyModel,
      },
      {
        model: ShiftRecordModel,
        as: "Shift",
        include: [
          {
            model: CompanyModel,
          },
          {
            model: StaffProfileModel,
            through: {
              attributes: [],
            },
            as: "Staff",
          },
          {
            model: ClientProfileModel,
            through: {
              attributes: [],
            },
            as: "Client",
          },
          {
            model: ServiceModel,
            through: {
              attributes: ["start_time"], //TODO: We need to do some cleanup here
            },
          },
        ],
      },
    ];
    const AllInvoices = await InvoiceModel.findAll({
      where: { id: ids, company },
      include,
    });
    let result: any = {};
    AllInvoices.forEach((invoice: any) => {
      invoice.Shift.Client.forEach((client: any) => {
        const services = invoice.Shift.Services;
        if (!result[client.accountCode]) {
          result[client.accountCode] = {};
        }
        result[client.accountCode][services[0]?.code] =
          (result[client.accountCode][services[0]?.code] || 0) +
          getMinutesDiff(invoice.startDateTime, invoice.endDateTime) / 60;

        if (services.length === 2) {
          result[client.accountCode][services[1]?.code] =
            (result[client.accountCode][services[1]?.code] || 0) +
            getMinutesDiff(services[1]?.start_time, invoice.endDateTime) / 60;
        }
      });
    });
    console.log("result", result);
    const companyData = await companyService.getCompanyById({ company });
    await xero.setTokenSet(companyData.xeroTokenSet);
    const validTokenSet = await xero.refreshWithRefreshToken(
      config.XERO_CLIENT_ID,
      config.XERO_CLIENT_SECRET,
      companyData.xeroTokenSet.refresh_token
    ); // save the new tokenset
    await xero.updateTenants();

    const xeroTenantId = xero.tenants[0].tenantId; //a0f444ba-d500-4e24-9a5e-c5c767f9a222
    const summarizeErrors = true;
    const unitdp = 4;
    const dateValue = "2020-10-10";
    const dueDateValue = "2020-10-28";

    const getLineItems = (services: any) => {
      const finalLineItems = Object.keys(services).map((service) => ({
        description: "This is for testing",
        quantity: services[service],
        itemCode: service,
      }));
      return finalLineItems;
    };

    const invoiceData: any = [];
    Object.keys(result).forEach((clientId) => {
      const invoice: Invoice = {
        type: Invoice.TypeEnum.ACCREC,
        contact: {
          contactID: clientId,
        },
        date: dateValue,
        dueDate: dueDateValue,
        lineItems: getLineItems(result[clientId]),
        reference: "Website Design",
        status: Invoice.StatusEnum.DRAFT,
      };
      invoiceData.push(invoice);
    });
    const invoices: Invoices = {
      invoices: invoiceData,
    };
    try {
      const response = await xero.accountingApi.updateOrCreateInvoices(
        xeroTenantId,
        invoices,
        summarizeErrors,
        unitdp
      );
      console.log(response.body || response.response.statusCode);
      const invoice = await this.updateInvoiceStatus({
        company,
        ids,
        status: "Approved",
        lastExportedXero: new Date(),
      });
    } catch (err: any) {
      const error = JSON.stringify(err.response.body, null, 2);
      console.log(`Status Code: ${err.response.statusCode} => ${error}`);
      throw new CustomError(404, InvoiceErrorCode.INVOICE_NOT_CREATED);
    }
    return {};
  }

  async updateInvoiceOnShiftUpdate(props: UpdateInvoiceOnShiftUpdateProps) {
    // Props
    const { shift, company, startDateTime, endDateTime, client } = props;

    // Find invoices by shift id and company
    const invoices = await InvoiceModel.findAll({
      where: { shift, company },
    });

    // if invoice not found, throw an error
    if (!invoices) {
      throw new CustomError(404, InvoiceErrorCode.INVOICE_NOT_FOUND);
    }

    // Delete all the existing invoices for this shift
    await this.deleteInvoice({ shift, company });

    // Create new invoices on shift update
    const newInvoices = await this.createInvoiceInBulk({
      startDateTime,
      endDateTime,
      status: "Pending",
      shift,
      client,
      company,
    });
    return newInvoices;
  }

  async deleteInvoice(props: DeleteInvoiceProps) {
    // Props
    const { shift, company } = props;

    // Find and delete the invoice by id and company
    const invoice = await InvoiceModel.destroy({
      where: { shift, company },
    });

    // if invoice has been deleted, throw an error
    if (!invoice) {
      throw new CustomError(404, InvoiceErrorCode.INVOICE_NOT_FOUND);
    }

    return invoice;
  }

  async getInvoiceById(props: GetInvoiceByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the invoice by id and company
    const invoice = await InvoiceModel.findOne({
      where: { id, company },
      include: [
        {
          model: CompanyModel,
        },
        {
          model: ClientProfileModel,
          as: "Client",
        },
      ],
    });

    // If no invoice has been found, then throw an error
    if (!invoice) {
      throw new CustomError(404, InvoiceErrorCode.INVOICE_NOT_FOUND);
    }

    return invoice;
  }

  async getInvoices(props: GetInvoicesProps, userId: string) {
    // Props
    const { page, pageSize, sort, where, company } = props;

    const { offset, limit } = getPagingParams(page, pageSize);
    const order = getSortingParams(sort);
    const filters = getFilters(where);

    const include = [
      {
        model: CompanyModel,
      },
      {
        model: ClientProfileModel,
        as: "Client",
        where: {
          ...filters["Client"],
        },
      },
      {
        model: ShiftRecordModel,
        as: "Shift",
        where: {
          ...filters["Shift"],
        },
        include: [
          {
            model: ServiceModel,
            through: {
              attributes: ["start_time"], //TODO: We need to do some cleanup here
            },
          },
        ],
      },
    ];

    // Count total invoices in the given company
    const count = await InvoiceModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
      include,
    });

    // Find all invoices for matching props and company
    const data = await InvoiceModel.findAll({
      offset,
      limit,
      order,
      where: {
        company,
        ...filters["primaryFilters"],
      },
      include,
    });

    const response = getPagingData({ count, rows: data }, page, limit);

    return response;
  }
}

export default new InvoiceService();
