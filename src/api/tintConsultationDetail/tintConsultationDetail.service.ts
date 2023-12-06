import { omit as _omit } from "lodash";
import { Op } from "sequelize";

import TintConsultationDetailModel from "./tintConsultationDetail.model";
import {
  CreateTintConsultationDetailProps,
  UpdateTintConsultationDetailProps,
  DeleteTintConsultationDetailProps,
  GetTintConsultationDetailByIdProps,
  GetTintConsultationDetailsProps,
} from "./tintConsultationDetail.types";
import { CustomError } from "../../components/errors";
import TintConsultationDetailErrorCode from "./tintConsultationDetail.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { TintConsultationModel } from "../tintConsultation";
import { getFilters } from "../../components/filters";

class TintConsultationDetailService {
  async createTintConsultationDetail(props: CreateTintConsultationDetailProps) {
    const { tint, date, company } = props;

    // Check if type with same name already exists
    const existingType = await TintConsultationDetailModel.findOne({
      where: {
        company,
        tint,
        date,
      },
    });

    // If exists, then throw an error
    if (existingType) {
      throw new CustomError(
        409,
        TintConsultationDetailErrorCode.TINT_DETAIL_ALREADY_EXISTS
      );
    }

    const tintConsultationDetail = await TintConsultationDetailModel.create(
      props
    );
    return tintConsultationDetail;
  }

  async updateTintConsultationDetail(props: UpdateTintConsultationDetailProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find tintConsultationDetail by id and company
    const tintConsultationDetail = await TintConsultationDetailModel.findOne({
      where: { id, company },
    });

    // if tintConsultationDetail not found, throw an error
    if (!tintConsultationDetail) {
      throw new CustomError(
        404,
        TintConsultationDetailErrorCode.TINT_DETAIL_NOT_FOUND
      );
    }

    // Finally, update the tintConsultationDetail
    const [, [updatedTintConsultationDetail]] =
      await TintConsultationDetailModel.update(updateProps, {
        where: { id, company },
        returning: true,
      });
    return updatedTintConsultationDetail;
  }

  async deleteTintConsultationDetail(props: DeleteTintConsultationDetailProps) {
    // Props
    const { id, company } = props;

    // Find and delete the tintConsultationDetail by id and company
    const tintConsultationDetail = await TintConsultationDetailModel.destroy({
      where: { id, company },
    });

    // if tintConsultationDetail has been deleted, throw an error
    if (!tintConsultationDetail) {
      throw new CustomError(
        404,
        TintConsultationDetailErrorCode.TINT_DETAIL_NOT_FOUND
      );
    }

    return tintConsultationDetail;
  }

  async getTintConsultationDetailById(
    props: GetTintConsultationDetailByIdProps
  ) {
    // Props
    const { id, company } = props;

    // Find  the tintConsultationDetail by id and company
    const tintConsultationDetail = await TintConsultationDetailModel.findOne({
      where: { id, company },
      include: [
        {
          model: CompanyModel,
        },
        {
          model: TintConsultationModel,
          as: "Tint",
        },
      ],
    });

    // If no tintConsultationDetail has been found, then throw an error
    if (!tintConsultationDetail) {
      throw new CustomError(
        404,
        TintConsultationDetailErrorCode.TINT_DETAIL_NOT_FOUND
      );
    }

    return tintConsultationDetail;
  }

  async getTintConsultationDetails(props: GetTintConsultationDetailsProps) {
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
        model: TintConsultationModel,
        as: "Tint",
      },
    ];

    // Count total tintConsultationDetails in the given company
    const count = await TintConsultationDetailModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
      include,
    });

    // Find all tintConsultationDetails for matching props and company
    const data = await TintConsultationDetailModel.findAll({
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

export default new TintConsultationDetailService();
