import { omit as _omit } from "lodash";

import VehicleLogModel from "./vehicleLog.model";
import {
  CreateVehicleLogProps,
  UpdateVehicleLogProps,
  DeleteVehicleLogProps,
  GetVehicleLogByIdProps,
  GetVehicleLogsProps,
} from "./vehicleLog.types";
import { CustomError } from "../../components/errors";
import VehicleLogErrorCode from "./vehicleLog.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { StaffProfileModel } from "../staffProfile";
import { ClientProfileModel } from "../clientProfile";
import { getFilters } from "../../components/filters";

class VehicleLogService {
  async createVehicleLog(props: CreateVehicleLogProps) {
    const vehicleLog = await VehicleLogModel.create(props);
    return vehicleLog;
  }

  async updateVehicleLog(props: UpdateVehicleLogProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find vehicleLog by id and company
    const vehicleLog = await VehicleLogModel.findOne({
      where: { id, company },
    });

    // if vehicleLog not found, throw an error
    if (!vehicleLog) {
      throw new CustomError(404, VehicleLogErrorCode.VEHICLE_LOG_NOT_FOUND);
    }

    // Finally, update the vehicleLog
    const [, [updatedVehicleLog]] = await VehicleLogModel.update(updateProps, {
      where: { id, company },
      returning: true,
    });
    return updatedVehicleLog;
  }

  async deleteVehicleLog(props: DeleteVehicleLogProps) {
    // Props
    const { id, company } = props;

    // Find and delete the vehicleLog by id and company
    const vehicleLog = await VehicleLogModel.destroy({
      where: { id, company },
    });

    // if vehicleLog has been deleted, throw an error
    if (!vehicleLog) {
      throw new CustomError(404, VehicleLogErrorCode.VEHICLE_LOG_NOT_FOUND);
    }

    return vehicleLog;
  }

  async getVehicleLogById(props: GetVehicleLogByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the vehicleLog by id and company
    const vehicleLog = await VehicleLogModel.findOne({
      where: { id, company },
      include: [
        {
          model: CompanyModel,
        },
        {
          model: StaffProfileModel,
          as: "Staff",
        },
        {
          model: ClientProfileModel,
          as: "Client",
        },
      ],
    });

    // If no vehicleLog has been found, then throw an error
    if (!vehicleLog) {
      throw new CustomError(404, VehicleLogErrorCode.VEHICLE_LOG_NOT_FOUND);
    }

    return vehicleLog;
  }

  async getVehicleLogs(props: GetVehicleLogsProps) {
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
        model: ClientProfileModel,
        as: "Client",
        where: {
          ...filters["Client"],
        },
      },
    ];
    // Count total vehicleLogs in the given company
    const count = await VehicleLogModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      include,
    });

    // Find all vehicleLogs for matching props and company
    const data = await VehicleLogModel.findAll({
      offset,
      limit,
      order,
      where: {
        company,
        ...filters["primaryFilters"],
      },
      include,
    });

    // TODO: Clean up getPagingData function
    const response = getPagingData({ count, rows: data }, page, limit);

    return response;
  }
}

export default new VehicleLogService();
