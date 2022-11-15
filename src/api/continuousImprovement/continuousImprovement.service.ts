import { omit as _omit } from "lodash";

import ContinuousImprovementModel from "./continuousImprovement.model";
import {
  CreateContinuousImprovementProps,
  UpdateContinuousImprovementProps,
  DeleteContinuousImprovementProps,
  GetContinuousImprovementByIdProps,
  GetContinuousImprovementsProps,
} from "./continuousImprovement.types";
import { CustomError } from "../../components/errors";
import ContinuousImprovementErrorCode from "./continuousImprovement.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { ClientProfileModel } from "../clientProfile";
import { StaffProfileModel } from "../staffProfile";
import { addCientFiltersByTeams, getFilters } from "../../components/filters";

class ContinuousImprovementService {
  async createContinuousImprovement(props: CreateContinuousImprovementProps) {
    const continuousImprovement = await ContinuousImprovementModel.create(
      props
    );
    return continuousImprovement;
  }

  async updateContinuousImprovement(props: UpdateContinuousImprovementProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find continuousImprovement by id and company
    const continuousImprovement = await ContinuousImprovementModel.findOne({
      where: { id, company },
    });

    // if continuousImprovement not found, throw an error
    if (!continuousImprovement) {
      throw new CustomError(
        404,
        ContinuousImprovementErrorCode.CONTINUOUS_IMPROVEMENT_NOT_FOUND
      );
    }

    // Finally, update the continuousImprovement
    const [, [updatedContinuousImprovement]] =
      await ContinuousImprovementModel.update(updateProps, {
        where: { id, company },
        returning: true,
      });
    return updatedContinuousImprovement;
  }

  async deleteContinuousImprovement(props: DeleteContinuousImprovementProps) {
    // Props
    const { id, company } = props;

    // Find and delete the continuousImprovement by id and company
    const continuousImprovement = await ContinuousImprovementModel.destroy({
      where: { id, company },
    });

    // if continuousImprovement has been deleted, throw an error
    if (!continuousImprovement) {
      throw new CustomError(
        404,
        ContinuousImprovementErrorCode.CONTINUOUS_IMPROVEMENT_NOT_FOUND
      );
    }

    return continuousImprovement;
  }

  async getContinuousImprovementById(props: GetContinuousImprovementByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the continuousImprovement by id and company
    const continuousImprovement = await ContinuousImprovementModel.findOne({
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

    // If no continuousImprovement has been found, then throw an error
    if (!continuousImprovement) {
      throw new CustomError(
        404,
        ContinuousImprovementErrorCode.CONTINUOUS_IMPROVEMENT_NOT_FOUND
      );
    }

    return continuousImprovement;
  }

  async getContinuousImprovements(
    props: GetContinuousImprovementsProps,
    userId: string
  ) {
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
    ];
    // Count total continuousImprovements in the given company
    const count = await ContinuousImprovementModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
      include,
    });

    // Find all continuousImprovements for matching props and company
    const data = await ContinuousImprovementModel.findAll({
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

export default new ContinuousImprovementService();
