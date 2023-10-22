import { omit as _omit } from "lodash";

import EyelashExtensionModel from "./eyelashExtension.model";
import {
  CreateEyelashExtensionProps,
  UpdateEyelashExtensionProps,
  DeleteEyelashExtensionProps,
  GetEyelashExtensionByIdProps,
  GetEyelashExtensionsProps,
} from "./eyelashExtension.types";
import { CustomError } from "../../components/errors";
import EyelashExtensionErrorCode from "./eyelashExtension.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { getFilters } from "../../components/filters";
import { EyelashExtensionDetailModel } from "../eyelashExtensionDetail";

class EyelashExtensionService {
  async createEyelashExtension(props: CreateEyelashExtensionProps) {
    const { date, company, client } = props;
    const createProps = _omit(props, ["types"]);

    // Check if category with same name already exists
    const existingCategory = await EyelashExtensionModel.findOne({
      where: {
        company,
        date,
        client,
      },
    });

    // If exists, then throw an error
    if (existingCategory) {
      throw new CustomError(
        409,
        EyelashExtensionErrorCode.EYELASH_EXTENSION_ALREADY_EXISTS
      );
    }

    const eyelashExtension = await EyelashExtensionModel.create(createProps);

    return eyelashExtension;
  }

  async updateEyelashExtension(props: UpdateEyelashExtensionProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find eyelashExtension by id and company
    const eyelashExtension = await EyelashExtensionModel.findOne({
      where: { id, company },
    });

    // if eyelashExtension not found, throw an error
    if (!eyelashExtension) {
      throw new CustomError(
        404,
        EyelashExtensionErrorCode.EYELASH_EXTENSION_NOT_FOUND
      );
    }

    // Finally, update the eyelashExtension
    const [, [updatedEyelashExtension]] = await EyelashExtensionModel.update(
      updateProps,
      {
        where: { id, company },
        returning: true,
      }
    );
    return updatedEyelashExtension;
  }

  async deleteEyelashExtension(props: DeleteEyelashExtensionProps) {
    // Props
    const { id, company } = props;

    // Find and delete the eyelashExtension by id and company
    const eyelashExtension = await EyelashExtensionModel.destroy({
      where: { id, company },
    });

    // if eyelashExtension has been deleted, throw an error
    if (!eyelashExtension) {
      throw new CustomError(
        404,
        EyelashExtensionErrorCode.EYELASH_EXTENSION_NOT_FOUND
      );
    }

    return eyelashExtension;
  }

  async getEyelashExtensionById(props: GetEyelashExtensionByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the eyelashExtension by id and company
    const eyelashExtension = await EyelashExtensionModel.findOne({
      where: { id, company },
      include: [
        {
          model: CompanyModel,
        },
        {
          model: EyelashExtensionDetailModel,
          as: "Details",
        },
      ],
    });

    // If no eyelashExtension has been found, then throw an error
    if (!eyelashExtension) {
      throw new CustomError(
        404,
        EyelashExtensionErrorCode.EYELASH_EXTENSION_NOT_FOUND
      );
    }

    return eyelashExtension;
  }

  async getEyelashExtensions(props: GetEyelashExtensionsProps) {
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
        model: EyelashExtensionDetailModel,
        as: "Details",
      },
    ];

    // Count total eyelashExtensions in the given company
    const count = await EyelashExtensionModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
      include,
    });

    // Find all eyelashExtensions for matching props and company
    const data = await EyelashExtensionModel.findAll({
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

export default new EyelashExtensionService();
