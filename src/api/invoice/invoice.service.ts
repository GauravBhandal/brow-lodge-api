import { omit as _omit } from "lodash";
import { Op } from "sequelize";

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
import { CompanyModel } from "../company";
import { StaffProfileModel } from "../staffProfile";
import { getFilters } from "../../components/filters";
import { ShiftRecordModel } from "../shiftRecord";
import { ClientProfileModel } from "../clientProfile";
import { ServiceModel } from "../service";
import { Invoice, Invoices } from "xero-node";
import { getMinutesDiff } from "../../utils/shiftGenerator";
import { xeroService } from "../xero";

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
    const { ids, company, status, lastExportedOn } = props;
    const updateProps = { status, lastExportedOn };

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

    // Find all the invoices for given company and ids
    const allInvoices = await InvoiceModel.findAll({
      where: { id: ids, company },
      include,
    });

    // Map the total hours per service per client
    let result: any = {};
    allInvoices.forEach((invoice: any) => {
      invoice.Shift.Client.forEach((client: any) => {
        const services = invoice.Shift.Services;
        if (!result[client.accountingCode]) {
          result[client.accountingCode] = {};
        }

        services.forEach((service: any, index: any) => {
          result[client.accountingCode][service?.code] =
            (result[client.accountingCode][service?.code] || 0) +
            (service.rateType === "Fixed")
              ? 1
              : getMinutesDiff(
                  service.shift_records_services.dataValues.start_time,
                  index === services.length - 1
                    ? invoice.endDateTime
                    : services[index + 1].shift_records_services.dataValues
                        .start_time
                ) / 60;
        });
      });
    });

    // TODO: Fix these dates
    const dateValue = "2020-10-10"; // Should be today's date
    const dueDateValue = "2020-10-28"; // Should be today's date + 14 days

    const getLineItems = (services: any) => {
      const finalLineItems = Object.keys(services).map((service) => ({
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
        status: Invoice.StatusEnum.DRAFT,
      };
      invoiceData.push(invoice);
    });
    const invoices: Invoices = {
      invoices: invoiceData,
    };

    try {
      await xeroService.exportInvoicesToXero({
        company,
        invoices,
      });

      await this.updateInvoiceStatus({
        company,
        ids,
        status: "Approved",
        lastExportedOn: new Date(),
      });
    } catch (err: any) {
      console.log(`Error${err}`);
      throw new CustomError(404, InvoiceErrorCode.FAILED_TO_GENERATE_INVOICE);
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

    // Delete all the existing invoices for this shift
    if (invoices.length > 0) {
      await this.deleteInvoice({ shift, company });
    }

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
