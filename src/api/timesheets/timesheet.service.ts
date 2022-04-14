import { omit as _omit } from "lodash";
import { Op } from "sequelize";

import TimesheetModel from "./timesheet.model";
import {
  CreateTimesheetProps,
  UpdateTimesheetProps,
  DeleteTimesheetProps,
  GetTimesheetByIdProps,
  GetTimesheetsProps,
  UpdateTimesheetOnShiftUpdateProps,
  UpdateTimesheetStatusProps,
} from "./timesheet.types";
import { CustomError } from "../../components/errors";
import TimesheetErrorCode from "./timesheet.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { StaffProfileModel } from "../staffProfile";
import { getFilters } from "../../components/filters";
import { ShiftRecordModel } from "../shiftRecord";
import { ClientProfileModel } from "../clientProfile";

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
