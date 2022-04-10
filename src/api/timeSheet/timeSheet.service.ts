import { omit as _omit } from "lodash";
import { Op } from "sequelize";

import TimeSheetModel from "./timeSheet.model";
import {
  CreateTimeSheetProps,
  UpdateTimeSheetProps,
  DeleteTimeSheetProps,
  GetTimeSheetByIdProps,
  GetTimeSheetsProps,
  UpdateTimeSheetOnShiftUpdateProps,
  UpdateTimeSheetStatusProps,
} from "./timeSheet.types";
import { CustomError } from "../../components/errors";
import TimeSheetErrorCode from "./timeSheet.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { StaffProfileModel } from "../staffProfile";
import { getFilters } from "../../components/filters";
import { ShiftRecordModel } from "../shiftRecord";

class TimeSheetService {
  async createTimeSheetInBulk(props: CreateTimeSheetProps) {
    const createProps = props.staff.map((singleStaff) => ({
      ...props,
      staff: singleStaff,
    }));
    const timeSheet = await TimeSheetModel.bulkCreate(createProps);
    return timeSheet;
  }

  async updateTimeSheet(props: UpdateTimeSheetProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find timeSheet by id and company
    const timeSheet = await TimeSheetModel.findOne({
      where: { id, company },
    });

    // if timeSheet not found, throw an error
    if (!timeSheet) {
      throw new CustomError(404, TimeSheetErrorCode.TIME_SHEET_NOT_FOUND);
    }

    // Finally, update the timeSheet
    const [, [updatedTimeSheet]] = await TimeSheetModel.update(updateProps, {
      where: { id, company },
      returning: true,
    });
    return updatedTimeSheet;
  }

  async updateTimeSheetStatus(props: UpdateTimeSheetStatusProps) {
    // Props
    const { ids, company, status } = props;

    const updateProps = { status };

    // Finally, update the timeSheet
    const [, [updatedTimeSheet]] = await TimeSheetModel.update(updateProps, {
      where: {
        id: {
          [Op.or]: ids,
        },
        company,
      },
      returning: true,
    });
    return updatedTimeSheet;
  }
  async updateTimeSheetOnShiftUpdate(props: UpdateTimeSheetOnShiftUpdateProps) {
    // Props
    const { shift, company, startDateTime, endDateTime, staff } = props;

    // Find timeSheets by shift id and company
    const timeSheets = await TimeSheetModel.findAll({
      where: { shift, company },
    });

    // if timeSheet not found, throw an error
    if (!timeSheets) {
      throw new CustomError(404, TimeSheetErrorCode.TIME_SHEET_NOT_FOUND);
    }

    // Delete all the existing timesheets for this shift
    await this.deleteTimeSheet({ shift, company });

    // creating new timesheets for shift update
    const newTimeSheets = await this.createTimeSheetInBulk({
      startDateTime,
      endDateTime,
      status: "Pending",
      shift,
      staff,
      company,
    });
    return newTimeSheets;
  }

  async deleteTimeSheet(props: DeleteTimeSheetProps) {
    // Props
    const { shift, company } = props;

    // Find and delete the timeSheet by id and company
    const timeSheet = await TimeSheetModel.destroy({
      where: { shift, company },
    });

    // if timeSheet has been deleted, throw an error
    if (!timeSheet) {
      throw new CustomError(404, TimeSheetErrorCode.TIME_SHEET_NOT_FOUND);
    }

    return timeSheet;
  }

  async getTimeSheetById(props: GetTimeSheetByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the timeSheet by id and company
    const timeSheet = await TimeSheetModel.findOne({
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

    // If no timeSheet has been found, then throw an error
    if (!timeSheet) {
      throw new CustomError(404, TimeSheetErrorCode.TIME_SHEET_NOT_FOUND);
    }

    return timeSheet;
  }

  async getTimeSheets(props: GetTimeSheetsProps, userId: string) {
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

    // Count total timeSheets in the given company
    const count = await TimeSheetModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
      include,
    });

    // Find all timeSheets for matching props and company
    const data = await TimeSheetModel.findAll({
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

export default new TimeSheetService();
