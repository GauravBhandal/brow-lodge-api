import { omit as _omit } from "lodash";

import RestrictivePracticeLogModel from "./restrictivePracticeLog.model";
import {
  CreateRestrictivePracticeLogProps,
  UpdateRestrictivePracticeLogProps,
  DeleteRestrictivePracticeLogProps,
  GetRestrictivePracticeLogByIdProps,
  GetRestrictivePracticeLogsProps,
} from "./restrictivePracticeLog.types";
import { CustomError } from "../../components/errors";
import RestrictivePracticeLogErrorCode from "./restrictivePracticeLog.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { StaffProfileModel } from "../staffProfile";
import { ClientProfileModel } from "../clientProfile";
import { addCientFiltersByTeams, getFilters } from "../../components/filters";
import { restrictivePracticeLogStaffProfileService } from "./restrictivePracticeLogStaffProfile";
import {
  RestrictivePracticeLogTypeModel,
  restrictivePracticeLogTypeService,
} from "./restrictivePracticeLogType";

class RestrictivePracticeLogService {
  async createRestrictivePracticeLog(props: CreateRestrictivePracticeLogProps) {
    const restrictivePracticeLog = await RestrictivePracticeLogModel.create(
      props
    );

    // Assign staff profiles
    if (props.type && props.type.length) {
      await restrictivePracticeLogTypeService.createBulkRestrictivePracticeLogType(
        {
          restrictivePracticeLog: restrictivePracticeLog.id,
          type: props.type,
        }
      );
    }

    // Assign staff profiles
    if (props.staff && props.staff.length) {
      await restrictivePracticeLogStaffProfileService.createBulkRestrictivePracticeLogStaffProfile(
        {
          relation: restrictivePracticeLog.id,
          staff: props.staff,
        }
      );
    }

    return restrictivePracticeLog;
  }

  async updateRestrictivePracticeLog(props: UpdateRestrictivePracticeLogProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find restrictivePracticeLog by id and company
    const restrictivePracticeLog = await RestrictivePracticeLogModel.findOne({
      where: { id, company },
    });

    // if restrictivePracticeLog not found, throw an error
    if (!restrictivePracticeLog) {
      throw new CustomError(
        404,
        RestrictivePracticeLogErrorCode.RESTRICTIVE_PRACTICE_LOG_NOT_FOUND
      );
    }

    // Finally, update the restrictivePracticeLog
    const [, [updatedRestrictivePracticeLog]] =
      await RestrictivePracticeLogModel.update(updateProps, {
        where: { id, company },
        returning: true,
      });

    // Updaate type
    if (props.type && props.type.length) {
      await restrictivePracticeLogTypeService.updateBulkRestrictivePracticeLogType(
        {
          restrictivePracticeLog: restrictivePracticeLog.id,
          type: props.type,
        }
      );
    }

    // Updaate staff profiles
    if (props.staff && props.staff.length) {
      await restrictivePracticeLogStaffProfileService.updateBulkRestrictivePracticeLogStaffProfile(
        {
          relation: restrictivePracticeLog.id,
          staff: props.staff,
        }
      );
    }

    return updatedRestrictivePracticeLog;
  }

  async deleteArchiveRestrictivePracticeLog(
    props: DeleteRestrictivePracticeLogProps
  ) {
    // Props
    const { id, company } = props;

    // Find and delete the restrictivePracticeLog by id and company
    const restrictivePracticeLog = await RestrictivePracticeLogModel.findOne({
      where: { id, company },
    });

    // if restrictivePracticeLog has been deleted, throw an error
    if (!restrictivePracticeLog) {
      throw new CustomError(
        404,
        RestrictivePracticeLogErrorCode.RESTRICTIVE_PRACTICE_LOG_NOT_FOUND
      );
    }

    if (restrictivePracticeLog.archived) {
      // Check if restrictivePracticeLog already exists
      const existingRestrictivePracticeLog =
        await RestrictivePracticeLogModel.findAll({
          where: {
            startDate: restrictivePracticeLog.startDate,
            startTime: restrictivePracticeLog.startTime,
            startLocation: restrictivePracticeLog.startLocation,
            endDate: restrictivePracticeLog.endDate,
            endTime: restrictivePracticeLog.endTime,
            endLocation: restrictivePracticeLog.endLocation,
            client: restrictivePracticeLog.client,
            isAuthorised: restrictivePracticeLog.isAuthorised,
            impactOnAnyPerson: restrictivePracticeLog.impactOnAnyPerson,
            injuryToAnyPerson: restrictivePracticeLog.injuryToAnyPerson,
            wasReportableIncident: restrictivePracticeLog.wasReportableIncident,
            anyWitness: restrictivePracticeLog.anyWitness,
            reasonBehindUse: restrictivePracticeLog.reasonBehindUse,
            describeBehaviour: restrictivePracticeLog.describeBehaviour,
            actionTakenInResponse: restrictivePracticeLog.actionTakenInResponse,
            alternativesConsidered:
              restrictivePracticeLog.alternativesConsidered,
            actionTakenLeadingUpTo:
              restrictivePracticeLog.actionTakenLeadingUpTo,
            company: restrictivePracticeLog.company,
            archived: false,
          },
        });

      if (existingRestrictivePracticeLog.length > 0) {
        throw new CustomError(
          409,
          RestrictivePracticeLogErrorCode.RESTRICTIVE_PRACTICE_LOG_ALREADY_EXISTS
        );
      }
    }

    // Finally, update the restrictivePracticeLog update the Archive state
    const [, [updatedRestrictivePracticeLog]] =
      await RestrictivePracticeLogModel.update(
        { archived: !restrictivePracticeLog.archived },
        {
          where: { id, company },
          returning: true,
        }
      );

    return updatedRestrictivePracticeLog;
  }

  async deleteRestrictivePracticeLog(props: DeleteRestrictivePracticeLogProps) {
    // Props
    const { id, company } = props;

    // Find and delete the restrictivePracticeLog by id and company
    const restrictivePracticeLog = await RestrictivePracticeLogModel.destroy({
      where: { id, company },
    });

    // if restrictivePracticeLog has been deleted, throw an error
    if (!restrictivePracticeLog) {
      throw new CustomError(
        404,
        RestrictivePracticeLogErrorCode.RESTRICTIVE_PRACTICE_LOG_NOT_FOUND
      );
    }

    return restrictivePracticeLog;
  }

  async getRestrictivePracticeLogById(
    props: GetRestrictivePracticeLogByIdProps
  ) {
    // Props
    const { id, company } = props;

    // Find  the restrictivePracticeLog by id and company
    const restrictivePracticeLog = await RestrictivePracticeLogModel.findOne({
      where: { id, company },
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
          as: "Client",
        },
        {
          model: RestrictivePracticeLogTypeModel,
          as: "Types",
        },
      ],
    });

    // If no restrictivePracticeLog has been found, then throw an error
    if (!restrictivePracticeLog) {
      throw new CustomError(
        404,
        RestrictivePracticeLogErrorCode.RESTRICTIVE_PRACTICE_LOG_NOT_FOUND
      );
    }

    return restrictivePracticeLog;
  }

  async getRestrictivePracticeLogs(
    props: GetRestrictivePracticeLogsProps,
    userId: string
  ) {
    // Props
    const { page, pageSize, sort, where, company } = props;

    const { offset, limit } = getPagingParams(page, pageSize);
    const order = getSortingParams(sort);
    const filters = getFilters(where);

    const clientFilters = await addCientFiltersByTeams(userId, company);

    const include = [
      {
        model: CompanyModel,
        duplicating: true,
        required: true,
      },
      {
        model: StaffProfileModel,
        through: {
          attributes: [],
        },
        where: {
          ...filters["Staff"],
        },
        as: "Staff",
        duplicating: true,
        required: true,
      },
      {
        model: ClientProfileModel,
        as: "Client",
        where: {
          ...filters["Client"],
          ...clientFilters,
        },
        duplicating: true,
        required: true,
      },
      {
        model: RestrictivePracticeLogTypeModel,
        as: "Types",
      },
    ];

    // Count total restrictivePracticeLogs in the given company
    const count = await RestrictivePracticeLogModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
      include,
    });

    // Find all restrictivePracticeLogs for matching props and company
    const data = await RestrictivePracticeLogModel.findAll({
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

export default new RestrictivePracticeLogService();
