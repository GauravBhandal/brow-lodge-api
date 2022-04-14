import { omit as _omit } from "lodash";
import { Op } from "sequelize";

import PayLevelModel from "./payLevel.model";
import {
  CreatePayLevelProps,
  UpdatePayLevelProps,
  DeletePayLevelProps,
  GetPayLevelByIdProps,
  GetPayLevelsProps,
} from "./payLevel.types";
import { CustomError } from "../../components/errors";
import PayLevelErrorCode from "./payLevel.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { getFilters } from "../../components/filters";

class PayLevelService {
  async createPayLevel(props: CreatePayLevelProps) {
    // Props
    const { company, name } = props;

    // Check if payLevel with same name already exists
    const existingPayLevel = await PayLevelModel.findOne({
      where: {
        company,
        name: {
          [Op.iLike]: `${name}`,
        },
      },
    });

    // If exists, then throw an error
    if (existingPayLevel) {
      throw new CustomError(409, PayLevelErrorCode.PAY_LEVEL_ALREADY_EXISTS);
    }

    // Otherwise, create a new payLevel
    const payLevel = await PayLevelModel.create(props);

    return payLevel;
  }

  async updatePayLevel(props: UpdatePayLevelProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find payLevel by id and company
    const payLevel = await PayLevelModel.findOne({
      where: { id, company },
    });

    // if payLevel not found, throw an error
    if (!payLevel) {
      throw new CustomError(404, PayLevelErrorCode.PAY_LEVEL_NOT_FOUND);
    }

    if (payLevel.name.toLowerCase() !== props.name.toLowerCase()) {
      // Check if payLevel with same name already exists
      const existingPayLevel = await PayLevelModel.findOne({
        where: {
          name: {
            [Op.iLike]: `${props.name}`,
          },
          company,
        },
      });

      // If exists, then throw an error
      if (existingPayLevel) {
        throw new CustomError(409, PayLevelErrorCode.PAY_LEVEL_ALREADY_EXISTS);
      }
    }

    // Finally, update the payLevel
    const [, [updatedPayLevel]] = await PayLevelModel.update(updateProps, {
      where: { id, company },
      returning: true,
    });

    return updatedPayLevel;
  }

  async deletePayLevel(props: DeletePayLevelProps) {
    // Props
    const { id, company } = props;

    // Find and delete the payLevel by id and company
    const payLevel = await PayLevelModel.destroy({
      where: { id, company },
    });

    // if payLevel has been deleted, throw an error
    if (!payLevel) {
      throw new CustomError(404, PayLevelErrorCode.PAY_LEVEL_NOT_FOUND);
    }

    return payLevel;
  }

  async getPayLevelById(props: GetPayLevelByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the payLevel by id and company
    const payLevel = await PayLevelModel.findOne({
      where: { id, company },
      include: [
        {
          model: CompanyModel,
        },
      ],
    });

    // If no payLevel has been found, then throw an error
    if (!payLevel) {
      throw new CustomError(404, PayLevelErrorCode.PAY_LEVEL_NOT_FOUND);
    }

    return payLevel;
  }

  async getPayLevels(props: GetPayLevelsProps) {
    // Props
    const { page, pageSize, sort, where, company } = props;

    const { offset, limit } = getPagingParams(page, pageSize);
    const order = getSortingParams(sort);
    const filters = getFilters(where);

    const include = [
      {
        model: CompanyModel,
      },
    ];

    // Count total payLevels in the given company
    const count = await PayLevelModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
      include,
    });

    // Find all payLevels for matching props and company
    const data = await PayLevelModel.findAll({
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

export default new PayLevelService();
