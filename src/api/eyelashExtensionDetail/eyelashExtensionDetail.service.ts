import { omit as _omit } from "lodash";
import { Op } from "sequelize";

import EyelashExtensionDetailModel from "./eyelashExtensionDetail.model";
import {
  CreateEyelashExtensionDetailProps,
  UpdateEyelashExtensionDetailProps,
  DeleteEyelashExtensionDetailProps,
  GetEyelashExtensionDetailByIdProps,
  GetEyelashExtensionDetailsProps,
} from "./eyelashExtensionDetail.types";
import { CustomError } from "../../components/errors";
import EyelashExtensionDetailErrorCode from "./eyelashExtensionDetail.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { EyelashExtensionModel } from "../eyelashExtension";
import { getFilters } from "../../components/filters";

class EyelashExtensionDetailService {
  async createEyelashExtensionDetail(props: CreateEyelashExtensionDetailProps) {
    const { eyelash, date, company } = props;

    // Check if type with same name already exists
    const existingType = await EyelashExtensionDetailModel.findOne({
      where: {
        company,
        eyelash,
        date,
      },
    });

    // If exists, then throw an error
    if (existingType) {
      throw new CustomError(
        409,
        EyelashExtensionDetailErrorCode.EYELASH_DETAIL_ALREADY_EXISTS
      );
    }

    const eyelashExtensionDetail = await EyelashExtensionDetailModel.create(
      props
    );
    return eyelashExtensionDetail;
  }

  async updateEyelashExtensionDetail(props: UpdateEyelashExtensionDetailProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find eyelashExtensionDetail by id and company
    const eyelashExtensionDetail = await EyelashExtensionDetailModel.findOne({
      where: { id, company },
    });

    // if eyelashExtensionDetail not found, throw an error
    if (!eyelashExtensionDetail) {
      throw new CustomError(
        404,
        EyelashExtensionDetailErrorCode.EYELASH_DETAIL_NOT_FOUND
      );
    }

    // Finally, update the eyelashExtensionDetail
    const [, [updatedEyelashExtensionDetail]] =
      await EyelashExtensionDetailModel.update(updateProps, {
        where: { id, company },
        returning: true,
      });
    return updatedEyelashExtensionDetail;
  }

  async deleteEyelashExtensionDetail(props: DeleteEyelashExtensionDetailProps) {
    // Props
    const { id, company } = props;

    // Find and delete the eyelashExtensionDetail by id and company
    const eyelashExtensionDetail = await EyelashExtensionDetailModel.destroy({
      where: { id, company },
    });

    // if eyelashExtensionDetail has been deleted, throw an error
    if (!eyelashExtensionDetail) {
      throw new CustomError(
        404,
        EyelashExtensionDetailErrorCode.EYELASH_DETAIL_NOT_FOUND
      );
    }

    return eyelashExtensionDetail;
  }

  async getEyelashExtensionDetailById(
    props: GetEyelashExtensionDetailByIdProps
  ) {
    // Props
    const { id, company } = props;

    // Find  the eyelashExtensionDetail by id and company
    const eyelashExtensionDetail = await EyelashExtensionDetailModel.findOne({
      where: { id, company },
      include: [
        {
          model: CompanyModel,
        },
        {
          model: EyelashExtensionModel,
          as: "Eyelash",
        },
      ],
    });

    // If no eyelashExtensionDetail has been found, then throw an error
    if (!eyelashExtensionDetail) {
      throw new CustomError(
        404,
        EyelashExtensionDetailErrorCode.EYELASH_DETAIL_NOT_FOUND
      );
    }

    return eyelashExtensionDetail;
  }

  async getEyelashExtensionDetails(props: GetEyelashExtensionDetailsProps) {
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
        model: EyelashExtensionModel,
        as: "Eyelash",
        where: {
          ...filters["Eyelash"],
        }
      },
    ];

    // Count total eyelashExtensionDetails in the given company
    const count = await EyelashExtensionDetailModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
      include,
    });

    // Find all eyelashExtensionDetails for matching props and company
    const data = await EyelashExtensionDetailModel.findAll({
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

export default new EyelashExtensionDetailService();
