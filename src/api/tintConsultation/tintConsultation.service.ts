import { omit as _omit } from "lodash";

import TintConsultationModel from "./tintConsultation.model";
import {
  CreateTintConsultationProps,
  UpdateTintConsultationProps,
  DeleteTintConsultationProps,
  GetTintConsultationByIdProps,
  GetTintConsultationsProps,
} from "./tintConsultation.types";
import { CustomError } from "../../components/errors";
import TintConsultationErrorCode from "./tintConsultation.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { getFilters } from "../../components/filters";
import { ClientProfileModel } from "../clientProfile";
import { TintConsultationDetailModel } from "../tintConsultationDetail";

class TintConsultationService {
  async createTintConsultation(props: CreateTintConsultationProps) {
    const { date, company, client } = props;
    const createProps = _omit(props, ["types"]);

    // Check if category with same name already exists
    const existingCategory = await TintConsultationModel.findOne({
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
        TintConsultationErrorCode.TINT_CONSULTATION_ALREADY_EXISTS
      );
    }

    const tintConsultation = await TintConsultationModel.create(createProps);

    return tintConsultation;
  }

  async updateTintConsultation(props: UpdateTintConsultationProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find tintConsultation by id and company
    const tintConsultation = await TintConsultationModel.findOne({
      where: { id, company },
    });

    // if tintConsultation not found, throw an error
    if (!tintConsultation) {
      throw new CustomError(
        404,
        TintConsultationErrorCode.TINT_CONSULTATION_NOT_FOUND
      );
    }

    // Finally, update the tintConsultation
    const [, [updatedTintConsultation]] = await TintConsultationModel.update(
      updateProps,
      {
        where: { id, company },
        returning: true,
      }
    );
    return updatedTintConsultation;
  }

  async deleteTintConsultation(props: DeleteTintConsultationProps) {
    // Props
    const { id, company } = props;

    // Find and delete the tintConsultation by id and company
    const tintConsultation = await TintConsultationModel.destroy({
      where: { id, company },
    });

    // if tintConsultation has been deleted, throw an error
    if (!tintConsultation) {
      throw new CustomError(
        404,
        TintConsultationErrorCode.TINT_CONSULTATION_NOT_FOUND
      );
    }

    return tintConsultation;
  }

  async getTintConsultationById(props: GetTintConsultationByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the tintConsultation by id and company
    const tintConsultation = await TintConsultationModel.findOne({
      where: { id, company },
      include: [
        {
          model: CompanyModel,
        },
        {
          model: TintConsultationDetailModel,
          as: "Details",
        },
      ],
    });

    // If no tintConsultation has been found, then throw an error
    if (!tintConsultation) {
      throw new CustomError(
        404,
        TintConsultationErrorCode.TINT_CONSULTATION_NOT_FOUND
      );
    }

    return tintConsultation;
  }

  async getTintConsultations(props: GetTintConsultationsProps) {
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
        model: TintConsultationDetailModel,
        as: "Details",
      },
      {
        model: ClientProfileModel,
        as: "Client",
      },
    ];

    // Count total tintConsultations in the given company
    const count = await TintConsultationModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
      include,
    });

    // Find all tintConsultations for matching props and company
    const data = await TintConsultationModel.findAll({
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

export default new TintConsultationService();
