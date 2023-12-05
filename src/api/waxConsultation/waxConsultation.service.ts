import { omit as _omit } from "lodash";

import WaxConsultationModel from "./waxConsultation.model";
import {
  CreateWaxConsultationProps,
  UpdateWaxConsultationProps,
  DeleteWaxConsultationProps,
  GetWaxConsultationByIdProps,
  GetWaxConsultationsProps,
} from "./waxConsultation.types";
import { CustomError } from "../../components/errors";
import WaxConsultationErrorCode from "./waxConsultation.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { getFilters } from "../../components/filters";
import { WaxConsultationDetailModel } from "../waxConsultationDetail";
import { ClientProfileModel } from "../clientProfile";

class WaxConsultationService {
  async createWaxConsultation(props: CreateWaxConsultationProps) {
    const { date, company, client } = props;
    const createProps = _omit(props, ["types"]);

    // Check if category with same name already exists
    const existingCategory = await WaxConsultationModel.findOne({
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
        WaxConsultationErrorCode.WAX_CONSULTATION_ALREADY_EXISTS
      );
    }

    const waxConsultation = await WaxConsultationModel.create(createProps);

    return waxConsultation;
  }

  async updateWaxConsultation(props: UpdateWaxConsultationProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find waxConsultation by id and company
    const waxConsultation = await WaxConsultationModel.findOne({
      where: { id, company },
    });

    // if waxConsultation not found, throw an error
    if (!waxConsultation) {
      throw new CustomError(
        404,
        WaxConsultationErrorCode.WAX_CONSULTATION_NOT_FOUND
      );
    }

    // Finally, update the waxConsultation
    const [, [updatedWaxConsultation]] = await WaxConsultationModel.update(
      updateProps,
      {
        where: { id, company },
        returning: true,
      }
    );
    return updatedWaxConsultation;
  }

  async deleteWaxConsultation(props: DeleteWaxConsultationProps) {
    // Props
    const { id, company } = props;

    // Find and delete the waxConsultation by id and company
    const waxConsultation = await WaxConsultationModel.destroy({
      where: { id, company },
    });

    // if waxConsultation has been deleted, throw an error
    if (!waxConsultation) {
      throw new CustomError(
        404,
        WaxConsultationErrorCode.WAX_CONSULTATION_NOT_FOUND
      );
    }

    return waxConsultation;
  }

  async getWaxConsultationById(props: GetWaxConsultationByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the waxConsultation by id and company
    const waxConsultation = await WaxConsultationModel.findOne({
      where: { id, company },
      include: [
        {
          model: CompanyModel,
        },
        {
          model: WaxConsultationDetailModel,
          as: "Details",
        },
      ],
    });

    // If no waxConsultation has been found, then throw an error
    if (!waxConsultation) {
      throw new CustomError(
        404,
        WaxConsultationErrorCode.WAX_CONSULTATION_NOT_FOUND
      );
    }

    return waxConsultation;
  }

  async getWaxConsultations(props: GetWaxConsultationsProps) {
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
        model: WaxConsultationDetailModel,
        as: "Details",
      },
      {
        model: ClientProfileModel,
        as: "Client",
      },
    ];

    // Count total waxConsultations in the given company
    const count = await WaxConsultationModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
      include,
    });

    // Find all waxConsultations for matching props and company
    const data = await WaxConsultationModel.findAll({
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

export default new WaxConsultationService();
