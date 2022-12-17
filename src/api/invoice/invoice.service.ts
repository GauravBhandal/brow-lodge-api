import { omit as _omit } from "lodash";
import { Op } from "sequelize";
import { orderBy as _orderBy } from "lodash";

import InvoiceModel from "./invoice.model";
import {
  Invoice as InvoiceType,
  CreateInvoiceProps,
  UpdateInvoiceProps,
  DeleteInvoiceProps,
  GetInvoiceByIdProps,
  GetInvoicesProps,
  UpdateInvoiceOnShiftUpdateProps,
  UpdateInvoiceStatusProps,
  GenerateInvoicesProps,
  GetInvoiceByIdsProps,
  SetExportedOnInvoicesProps,
} from "./invoice.types";
import { CustomError } from "../../components/errors";
import InvoiceErrorCode from "./invoice.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { Company, CompanyModel, companyService } from "../company";
import { StaffProfileModel } from "../staffProfile";
import { getFilters } from "../../components/filters";
import { ShiftRecordModel } from "../shiftRecord";
import { ClientProfileModel, ClientProfile } from "../clientProfile";
import { ServiceModel } from "../service";
import { Invoice, Invoices } from "xero-node";
import {
  addTimeToDate,
  formatDateToString,
  getMinutesDiff,
} from "../../utils/shiftGenerator";
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

  async getInvoices(props: GetInvoicesProps) {
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

  async _getInvoiceByIds(props: GetInvoiceByIdsProps) {
    // Props
    const { ids, company } = props;

    const include = [
      {
        model: CompanyModel,
      },
      {
        model: ClientProfileModel,
        as: "Client",
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
    const invoices = await InvoiceModel.findAll({
      where: { id: ids, company },
      include,
    });

    return invoices;
  }

  // Helper fn to check the accounting code in every invoice
  async _getErrorMessages(allInvoices: InvoiceType[], company: Company["id"]) {
    // Details of all the error messages
    const errorMessageDetails: any = [];

    // All the accounting codes list of xero
    const getAllAccountCodes = await xeroService.getXeroCustomers({ company });

    allInvoices.forEach((invoice: InvoiceType) => {
      if (invoice?.Client) {
        // For every Client, calculate hours for every service and add it to result object
        const client = invoice.Client;
        // To check if accounting code exists or not
        if (!client.accountingCode) {
          errorMessageDetails.push(
            `${client.preferredName} has no accouting code`
          );
        } else {
          if (
            getAllAccountCodes?.contacts &&
            getAllAccountCodes?.contacts.length
          ) {
            // If accounting code present in xero also or not
            const IsAccountingCodeValid = getAllAccountCodes?.contacts.filter(
              (customer: any) => customer.contactID === client.accountingCode
            );
            if (IsAccountingCodeValid.length === 0) {
              errorMessageDetails.push(
                `${client.preferredName} accounting code doesn't matched`
              );
            }
          } else {
            errorMessageDetails.push(`Please sync with xero`);
          }
        }
      }
    });
    const updatedErrorMessages = [...new Set(errorMessageDetails)];
    return updatedErrorMessages;
  }

  // Helper function to convert the given invoices to the format supported by Xero
  _getFormattedInvoicesForXero(allInvoices: InvoiceType[], timezone: any) {
    /*
     Creating an empty object to store the customers and service details e.g.
     result = {
       accountingCode: {
         service1: Total Units,
        service2: Total Units
       }
     } 
    */
    let result: any = {};

    // Helper fn. to return the endTime of given service
    const getEndTime = (
      index: any,
      length: any,
      services: any,
      invoice: any
    ) => {
      if (index === length - 1) {
        return invoice.endDateTime;
      }
      return services[index + 1].shift_records_services.dataValues.start_time;
    };

    // Invoice dates
    const invoiceDate = formatDateToString(new Date(), timezone);
    const invoiceDueDate = formatDateToString(
      addTimeToDate(new Date(), 6, "days", timezone),
      timezone
    );

    // Map the total hours per service per client
    allInvoices.forEach((invoice: InvoiceType) => {
      if (invoice?.Shift?.Services && invoice?.Client) {
        // Sort all the services for every invoice by start Time
        const services = _orderBy(
          invoice.Shift.Services,
          ["shift_records_services.dataValues.start_time"],
          ["asc"]
        );

        // For every Client, calculate hours for every service and add it to result object
        const client = invoice.Client;
        // Create a new key in result object for every client
        if (client.accountingCode && !result[client.accountingCode]) {
          result[client.accountingCode] = {
            referenceData: `${client.firstName} ${client.lastName} - ${client.ndisNumber}`,
            services: {}
          };
        }

        // Calculate hours for every service and add it to result object
        services.forEach((service: any, index: Number) => {
          if (client.accountingCode) {
            if (!result[client.accountingCode]['services'][service.code]) {
              result[client.accountingCode]['services'][service.code] = {
                amount: 0,
                details: `${service.code} : ${invoiceDate} - ${invoiceDueDate}`
              }
            }
            result[client.accountingCode]['services'][service.code]['amount'] =
              (result[client.accountingCode]['services'][service.code] || 0) +
              (service.rateType === "Fixed"
                ? 1
                : getMinutesDiff(
                  service.shift_records_services.dataValues.start_time, // TODO: This is messy
                  getEndTime(index, services.length, services, invoice),
                  timezone
                ) / 60);
          }
        });
      }
    });
    console.log('result', result)
    // Helper fn. to result invoice line item as per Xero format
    const getLineItems = (services: any) => {
      const finalLineItems = Object.keys(services).map((service) => ({
        quantity: services[service]['amount'],
        itemCode: service,
        description: services[service]['details']
      }));
      return finalLineItems;
    };

    const formattedInvoices: any = [];
    Object.keys(result).forEach((clientId) => {
      const invoice: Invoice = {
        type: Invoice.TypeEnum.ACCREC,
        contact: {
          contactID: clientId,
        },
        date: invoiceDate,
        dueDate: invoiceDueDate,
        lineItems: getLineItems(result[clientId]['services']),
        status: Invoice.StatusEnum.DRAFT,
        reference: result[clientId]['referenceData']
      };
      formattedInvoices.push(invoice);
    });

    return formattedInvoices;
  }

  // Helper fn to check the accounting code in every invoice
  async _getErrorMessagesForPdfInvoice(allInvoices: InvoiceType[]) {
    // Details of all the error messages
    const errorMessageDetails: any = [];

    allInvoices.forEach((invoice: InvoiceType) => {
      if (invoice?.Shift?.Services) {
        // Sort all the services for every invoice by start Time
        const services = _orderBy(
          invoice.Shift.Services,
          ["shift_records_services.dataValues.start_time"],
          ["asc"]
        );
        services.forEach((service: any) => {
          if (!service.price) {
            errorMessageDetails.push(
              `Price is not set for ${service.name} service`
            );
          }
        });
      }
    });

    const updatedErrorMessages = [...new Set(errorMessageDetails)];
    return updatedErrorMessages;
  }

  // Helper function to convert the given invoices to the format for pdf export
  _getFormattedInvoicesForPdf(allInvoices: InvoiceType[], timezone: any) {
    /*
     Creating an empty object to store the client and service details e.g.
     parsedServiceData = {
       clientId: {
        client,
        service1: {hours: Total Units, amount: Total Units * price, service: service details},
        service2: {hours: Total Units, amount: Total Units * price, service: service details}
       }
     } 
    */
    let parsedServiceData: any = {};

    // Helper fn. to return the endTime of given service
    const getEndTime = (
      index: any,
      length: any,
      services: any,
      invoice: any
    ) => {
      if (index === length - 1) {
        return invoice.endDateTime;
      }
      return services[index + 1].shift_records_services.dataValues.start_time;
    };

    // Map the total hours per service per client
    allInvoices.forEach((invoice: InvoiceType) => {
      if (invoice?.Shift?.Services && invoice?.Client) {
        // Sort all the services for every invoice by start Time
        const services = _orderBy(
          invoice.Shift.Services,
          ["shift_records_services.dataValues.start_time"],
          ["asc"]
        );

        // For every Client, calculate hours for every service and add it to parsedServiceData object
        const client = invoice.Client;
        // Create a new key in result object for every client
        if (client.id && !parsedServiceData[client.id]) {
          parsedServiceData[client.id] = {};
        }

        // Calculate hours for every service and add it to result object
        services.forEach((service: any, index: Number) => {
          const numberOfHours =
            service.rateType === "Fixed"
              ? 1
              : getMinutesDiff(
                service.shift_records_services.dataValues.start_time, // TODO: This is messy
                getEndTime(index, services.length, services, invoice),
                timezone
              ) / 60;
          if (!parsedServiceData[client.id][service.id]) {
            parsedServiceData[client.id][service.id] = {
              service,
              amount: 0,
              hours: 0,
            };
          }
          parsedServiceData[client.id][service.id] = {
            hours: (parsedServiceData[client.id][service.id].hours +=
              numberOfHours),
            amount: (parsedServiceData[client.id][service.id].amount +=
              numberOfHours * service.price),
            service,
          };
        });
        parsedServiceData[client.id]["client"] = client;
      }
    });

    // Helper fn. for modifying invoice data
    const getParsedInvoices = (invoices: any) => {
      const parsedInvoiceData = { ...invoices };
      delete parsedInvoiceData["client"];
      return parsedInvoiceData;
    };

    const formattedInvoices: any = [];
    Object.keys(parsedServiceData).forEach((clientId) => {
      const invoice: any = {
        clientDetails: parsedServiceData[clientId]["client"],
        invoices: getParsedInvoices(parsedServiceData[clientId]),
      };
      formattedInvoices.push(invoice);
    });

    return formattedInvoices;
  }

  async generateInvoices(props: GenerateInvoicesProps) {
    const companyData = await companyService.getCompanyById({
      company: props.company,
    });

    // Props
    const { ids, company } = props;

    // TODO: Create and call a helper fn to check the accounting code and service code used in every invoice

    // Find all the invoices for given company and ids
    const allInvoices = await this._getInvoiceByIds({ ids, company });

    // Called a helper fn to check the accounting code in every invoice
    const getErrorMessages = await this._getErrorMessages(allInvoices, company);

    if (getErrorMessages.length > 0) {
      throw new CustomError(404, getErrorMessages.toString());
    }

    // Convert the invoices to the format supported by Xero
    const formatedInvoices = this._getFormattedInvoicesForXero(
      allInvoices,
      companyData.timezone
    );
    console.log('formatedInvoices', formatedInvoices)
    const invoices: Invoices = {
      invoices: formatedInvoices,
    };

    // Send invoices to Xero
    await xeroService.exportInvoicesToXero({
      company,
      invoices,
    });

    // Finally update the status of invoices
    await this.updateInvoiceStatus({
      company,
      ids,
      status: "Approved",
      lastExportedOn: new Date(),
    });
  }

  async generateInvoicesPdf(props: GenerateInvoicesProps) {
    const companyData = await companyService.getCompanyById({
      company: props.company,
    });

    // Props
    const { ids, company } = props;

    const { timezone } = companyData;

    // Find all the invoices for given company and ids
    const allInvoices = await this._getInvoiceByIds({ ids, company });

    // Called a helper fn to check the accounting code in every invoice
    const getErrorMessages = await this._getErrorMessagesForPdfInvoice(
      allInvoices
    );

    if (getErrorMessages.length > 0) {
      throw new CustomError(404, getErrorMessages.toString());
    }

    await this.updateInvoiceStatus({
      company,
      ids,
      status: "Approved",
      lastExportedOn: new Date(),
    });

    // Convert the invoices to the format for pdf data
    const formatedInvoices = this._getFormattedInvoicesForPdf(
      allInvoices,
      timezone
    );
    const invoiceDate = formatDateToString(new Date(), timezone);
    const invoiceDueDate = formatDateToString(
      addTimeToDate(new Date(), 6, "days", timezone),
      timezone
    );
    const result = {
      company: companyData,
      invoiceNumber: "",
      invoiceDate: invoiceDate,
      invoiceDueDate: invoiceDueDate,
      invoices: formatedInvoices,
    };
    return result;
  }

  async setExportedOnInvoices(props: SetExportedOnInvoicesProps) {
    // Props
    const { ids, company } = props;

    // Finally update the status of invoices
    await this.updateInvoiceStatus({
      company,
      ids,
      status: "Approved",
      lastExportedOn: new Date(),
    });

    return {};
  }
}

export default new InvoiceService();
