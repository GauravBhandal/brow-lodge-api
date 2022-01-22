import { omit as _omit } from "lodash";

import ConflictOfInterestModel from "./conflictOfInterest.model";
import {
  CreateConflictOfInterestProps,
  UpdateConflictOfInterestProps,
  DeleteConflictOfInterestProps,
  GetConflictOfInterestByIdProps,
  GetConflictOfInterestsProps,
} from "./conflictOfInterest.types";
import { CustomError } from "../../components/errors";
import ConflictOfInterestErrorCode from "./conflictOfInterest.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { StaffProfileModel } from "../staffProfile";

import { getFilters } from "../../components/filters";

class ConflictOfInterestService {
  async createConflictOfInterest(props: CreateConflictOfInterestProps) {
    const conflictOfInterest = await ConflictOfInterestModel.create(props);
    return conflictOfInterest;
  }

  async updateConflictOfInterest(props: UpdateConflictOfInterestProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find conflictOfInterest by id and company
    const conflictOfInterest = await ConflictOfInterestModel.findOne({
      where: { id, company },
    });

    // if conflictOfInterest not found, throw an error
    if (!conflictOfInterest) {
      throw new CustomError(
        404,
        ConflictOfInterestErrorCode.CONFLICT_OF_INTEREST_NOT_FOUND
      );
    }

    // Finally, update the conflictOfInterest
    const [, [updatedConflictOfInterest]] =
      await ConflictOfInterestModel.update(updateProps, {
        where: { id, company },
        returning: true,
      });
    return updatedConflictOfInterest;
  }

  async deleteConflictOfInterest(props: DeleteConflictOfInterestProps) {
    // Props
    const { id, company } = props;

    // Find and delete the conflictOfInterest by id and company
    const conflictOfInterest = await ConflictOfInterestModel.destroy({
      where: { id, company },
    });

    // if conflictOfInterest has been deleted, throw an error
    if (!conflictOfInterest) {
      throw new CustomError(
        404,
        ConflictOfInterestErrorCode.CONFLICT_OF_INTEREST_NOT_FOUND
      );
    }

    return conflictOfInterest;
  }

  async getConflictOfInterestById(props: GetConflictOfInterestByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the conflictOfInterest by id and company
    const conflictOfInterest = await ConflictOfInterestModel.findOne({
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

    // If no conflictOfInterest has been found, then throw an error
    if (!conflictOfInterest) {
      throw new CustomError(
        404,
        ConflictOfInterestErrorCode.CONFLICT_OF_INTEREST_NOT_FOUND
      );
    }

    return conflictOfInterest;
  }

  async getConflictOfInterests(props: GetConflictOfInterestsProps) {
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
      },
    ];
    // Count total conflictOfInterests in the given company
    const count = await ConflictOfInterestModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      include,
    });

    // Find all conflictOfInterests for matching props and company
    const data = await ConflictOfInterestModel.findAll({
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

export default new ConflictOfInterestService();
