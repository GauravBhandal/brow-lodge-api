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
import { addCientFiltersByTeams, getFilters } from "../../components/filters";

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

  async deleteArchiveVehicleLog(props: DeleteVehicleLogProps) {
    // Props
    const { id, company } = props;

    // Find and delete the vehicleLog by id and company
    const vehicleLog = await VehicleLogModel.findOne({
      where: { id, company },
    });

    // if vehicleLog has been deleted, throw an error
    if (!vehicleLog) {
      throw new CustomError(404, VehicleLogErrorCode.VEHICLE_LOG_NOT_FOUND);
    }

    if (vehicleLog.archived) {
      // Check if vehicleLog already exists
      const existingVehicleLog = await VehicleLogModel.findAll({
        where: {
          date: vehicleLog.date,
          startTime: vehicleLog.startTime,
          endTime: vehicleLog.endTime,
          odometerReadingStart: vehicleLog.odometerReadingStart,
          odometerReadingEnd: vehicleLog.odometerReadingEnd,
          purposeOfTheJourney: vehicleLog.purposeOfTheJourney,
          totalKm: vehicleLog.totalKm,
          vehicle: vehicleLog.vehicle,
          staff: vehicleLog.staff,
          client: vehicleLog.client,
          company: vehicleLog.company,
          archived: false,
        },
      });

      if (existingVehicleLog.length > 0) {
        throw new CustomError(
          409,
          VehicleLogErrorCode.VEHICLE_LOG_ALREADY_EXISTS
        );
      }
    }

    // Finally, update the vehicleLog update the Archive state
    const [, [updatedPracticeGuide]] = await VehicleLogModel.update(
      { archived: !vehicleLog.archived },
      {
        where: { id, company },
        returning: true,
      }
    );

    return updatedPracticeGuide;
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

  async getVehicleLogs(props: GetVehicleLogsProps, userId: string) {
    // Props
    const { page, pageSize, sort, where, company } = props;

    const { offset, limit } = getPagingParams(page, pageSize);
    const order = getSortingParams(sort);
    const filters = getFilters(where);

    const clientFilters = await addCientFiltersByTeams(userId, company);

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
          ...clientFilters,
        },
      },
    ];
    // Count total vehicleLogs in the given company
    const count = await VehicleLogModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
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

    const response = getPagingData({ count, rows: data }, page, limit);

    return response;
  }
}

export default new VehicleLogService();
