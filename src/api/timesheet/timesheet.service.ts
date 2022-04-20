import { omit as _omit } from "lodash";
import { Op } from "sequelize";
import config from "../../config/environment";

import TimesheetModel from "./timesheet.model";
import {
  CreateTimesheetProps,
  UpdateTimesheetProps,
  DeleteTimesheetProps,
  GetTimesheetByIdProps,
  GetTimesheetsProps,
  UpdateTimesheetOnShiftUpdateProps,
  UpdateTimesheetStatusProps,
  GenerateInvoicesProps,
} from "./timesheet.types";
import { CustomError } from "../../components/errors";
import TimesheetErrorCode from "./timesheet.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel, companyService } from "../company";
import { StaffProfileModel } from "../staffProfile";
import { getFilters } from "../../components/filters";
import { ShiftRecordModel } from "../shiftRecord";
import { ClientProfileModel } from "../clientProfile";
import { ShiftTypeModel } from "../shiftType";
import { ServiceModel } from "../service";
import { CreditNote, Invoice, Invoices, LineItem } from "xero-node";
import xero from "../../components/xero";
import { getMinutesDiff } from "../../utils/shiftGenerator";

class TimesheetService {
  async createTimesheetInBulk(props: CreateTimesheetProps) {
    const createProps = props.staff.map((singleStaff) => ({
      ...props,
      staff: singleStaff,
    }));

    const timesheet = await TimesheetModel.bulkCreate(createProps);
    return timesheet;
  }

  async updateTimesheet(props: UpdateTimesheetProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find timesheet by id and company
    const timesheet = await TimesheetModel.findOne({
      where: { id, company },
    });

    // if timesheet not found, throw an error
    if (!timesheet) {
      throw new CustomError(404, TimesheetErrorCode.TIMESHEET_NOT_FOUND);
    }

    // Finally, update the timesheet
    const [, [updatedTimesheet]] = await TimesheetModel.update(updateProps, {
      where: { id, company },
      returning: true,
    });
    return updatedTimesheet;
  }

  async updateTimesheetStatus(props: UpdateTimesheetStatusProps) {
    // Props
    const { ids, company, status } = props;
    const updateProps = { status };

    // Finally, update the timesheet
    const [, [updatedTimesheet]] = await TimesheetModel.update(updateProps, {
      where: {
        id: {
          [Op.or]: ids,
        },
        company,
      },
      returning: true,
    });
    return updatedTimesheet;
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
            model: ShiftTypeModel,
            through: {
              attributes: ["start_time"], //TODO: We need to do some cleanup here
            },
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
    const timesheets = await TimesheetModel.findAll({
      where: { id: ids, company },
      include,
    });
    let result: any = {};
    timesheets.forEach((timesheet: any) => {
      timesheet.Shift.Client.forEach((client: any) => {
        const services = timesheet.Shift.Services;
        if (!result[client.accountCode]) {
          result[client.accountCode] = {};
        }
        result[client.accountCode][services[0]?.code] =
          (result[client.accountCode][services[0]?.code] || 0) +
          getMinutesDiff(timesheet.startDateTime, timesheet.endDateTime) / 60;

        if (services.length === 2) {
          result[client.accountCode][services[1]?.code] =
            (result[client.accountCode][services[1]?.code] || 0) +
            getMinutesDiff(services[1]?.start_time, timesheet.endDateTime) / 60;
        }
      });
    });
    console.log("result", result);
    const companyData = await companyService.getCompanyById({ company });
    await xero.setTokenSet(companyData.xeroTokenSet);
    const validTokenSet = await xero.refreshWithRefreshToken(
      config.CLIENT_ID,
      config.CLIENT_SECRET,
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
    } catch (err: any) {
      const error = JSON.stringify(err.response.body, null, 2);
      console.log(`Status Code: ${err.response.statusCode} => ${error}`);
      throw new CustomError(404, TimesheetErrorCode.INVOICE_NOT_CREATED);
    }
    return {};
  }

  async updateTimesheetOnShiftUpdate(props: UpdateTimesheetOnShiftUpdateProps) {
    // Props
    const { shift, company, startDateTime, endDateTime, staff } = props;

    // Find timesheets by shift id and company
    const timesheets = await TimesheetModel.findAll({
      where: { shift, company },
    });

    // if timesheet not found, throw an error
    if (!timesheets) {
      throw new CustomError(404, TimesheetErrorCode.TIMESHEET_NOT_FOUND);
    }

    // Delete all the existing timesheets for this shift
    await this.deleteTimesheet({ shift, company });

    // Create new timesheets on shift update
    const newTimesheets = await this.createTimesheetInBulk({
      startDateTime,
      endDateTime,
      status: "Pending",
      shift,
      staff,
      company,
    });
    return newTimesheets;
  }

  async deleteTimesheet(props: DeleteTimesheetProps) {
    // Props
    const { shift, company } = props;

    // Find and delete the timesheet by id and company
    const timesheet = await TimesheetModel.destroy({
      where: { shift, company },
    });

    // if timesheet has been deleted, throw an error
    if (!timesheet) {
      throw new CustomError(404, TimesheetErrorCode.TIMESHEET_NOT_FOUND);
    }

    return timesheet;
  }

  async getTimesheetById(props: GetTimesheetByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the timesheet by id and company
    const timesheet = await TimesheetModel.findOne({
      where: { id, company },
      include: [
        {
          model: CompanyModel,
        },
        {
          model: StaffProfileModel,
          as: "Staff",
        },
      ],
    });

    // If no timesheet has been found, then throw an error
    if (!timesheet) {
      throw new CustomError(404, TimesheetErrorCode.TIMESHEET_NOT_FOUND);
    }

    return timesheet;
  }

  async getTimesheets(props: GetTimesheetsProps, userId: string) {
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
        model: StaffProfileModel,
        as: "Staff",
        where: {
          ...filters["Staff"],
        },
      },
      {
        model: ShiftRecordModel,
        as: "Shift",
        where: {
          ...filters["Shift"],
        },
      },
    ];

    // Count total timesheets in the given company
    const count = await TimesheetModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
      include,
    });

    // Find all timesheets for matching props and company
    const data = await TimesheetModel.findAll({
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

export default new TimesheetService();
