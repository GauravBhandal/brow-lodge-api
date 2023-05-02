import { omit as _omit } from "lodash";

import ClockInClockOutModel from "./clockInClockOut.model";
import {
  CreateClockInClockOutProps,
  UpdateClockInClockOutProps,
  DeleteClockInClockOutProps,
  GetClockInClockOutByIdProps,
  GetClockInClockOutsProps,
} from "./clockInClockOut.types";
import { CustomError } from "../../components/errors";
import ClockInClockOutErrorCode from "./clockInClockOut.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { getFilters } from "../../components/filters";
import { AttachmentModel } from "../attachment";
import { ShiftRecordModel } from "../shiftRecord";
import { ServiceModel } from "../service";

class ClockInClockOutService {
  async createClockInClockOut(props: CreateClockInClockOutProps) {
    const clockInClockOut = await ClockInClockOutModel.create(props);

    return clockInClockOut;
  }

  async updateClockInClockOut(props: UpdateClockInClockOutProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find clockInClockOut by id and company
    const clockInClockOut = await ClockInClockOutModel.findOne({
      where: { id, company },
    });

    // if clockInClockOut not found, throw an error
    if (!clockInClockOut) {
      throw new CustomError(
        404,
        ClockInClockOutErrorCode.CLOCKIN_CLOCKOUT_NOT_FOUND
      );
    }

    // Finally, update the clockInClockOut
    const [, [updatedClockInClockOut]] = await ClockInClockOutModel.update(
      updateProps,
      {
        where: { id, company },
        returning: true,
      }
    );

    return updatedClockInClockOut;
  }

  async deleteClockInClockOut(props: DeleteClockInClockOutProps) {
    // Props
    const { id, company } = props;

    // Find and delete the clockInClockOut by id and company
    const clockInClockOut = await ClockInClockOutModel.destroy({
      where: { id, company },
    });

    // if clockInClockOut has been deleted, throw an error
    if (!clockInClockOut) {
      throw new CustomError(
        404,
        ClockInClockOutErrorCode.CLOCKIN_CLOCKOUT_NOT_FOUND
      );
    }

    return clockInClockOut;
  }

  async getClockInClockOutById(props: GetClockInClockOutByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the clockInClockOut by id and company
    const clockInClockOut = await ClockInClockOutModel.findOne({
      where: { id, company },
      include: [
        {
          model: CompanyModel,
        },
        {
          model: AttachmentModel,
          through: {
            attributes: [],
          },
        },
      ],
    });

    // If no clockInClockOut has been found, then throw an error
    if (!clockInClockOut) {
      throw new CustomError(
        404,
        ClockInClockOutErrorCode.CLOCKIN_CLOCKOUT_NOT_FOUND
      );
    }

    return clockInClockOut;
  }

  async getClockInClockOuts(props: GetClockInClockOutsProps, userId: string) {
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

    // Count total clockInClockOuts in the given company
    const count = await ClockInClockOutModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
      include,
    });

    // Find all clockInClockOuts for matching props and company
    const data = await ClockInClockOutModel.findAll({
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

export default new ClockInClockOutService();
