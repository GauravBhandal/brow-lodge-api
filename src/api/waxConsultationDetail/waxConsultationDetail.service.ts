import { omit as _omit } from "lodash";
import { Op } from "sequelize";

import WaxConsultationDetailModel from "./waxConsultationDetail.model";
import {
  CreateWaxConsultationDetailProps,
  UpdateWaxConsultationDetailProps,
  DeleteWaxConsultationDetailProps,
  GetWaxConsultationDetailByIdProps,
  GetWaxConsultationDetailsProps,
} from "./waxConsultationDetail.types";
import { CustomError } from "../../components/errors";
import WaxConsultationDetailErrorCode from "./waxConsultationDetail.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { WaxConsultationModel } from "../waxConsultation";
import { getFilters } from "../../components/filters";

class WaxConsultationDetailService {
  async createWaxConsultationDetail(props: CreateWaxConsultationDetailProps) {
    const { wax, date, company } = props;

    // Check if type with same name already exists
    const existingType = await WaxConsultationDetailModel.findOne({
      where: {
        company,
        wax,
        date,
      },
    });

    // If exists, then throw an error
    if (existingType) {
      throw new CustomError(
        409,
        WaxConsultationDetailErrorCode.WAX_DETAIL_ALREADY_EXISTS
      );
    }

    const waxConsultationDetail = await WaxConsultationDetailModel.create(
      props
    );
    return waxConsultationDetail;
  }

  async updateWaxConsultationDetail(props: UpdateWaxConsultationDetailProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find waxConsultationDetail by id and company
    const waxConsultationDetail = await WaxConsultationDetailModel.findOne({
      where: { id, company },
    });

    // if waxConsultationDetail not found, throw an error
    if (!waxConsultationDetail) {
      throw new CustomError(
        404,
        WaxConsultationDetailErrorCode.WAX_DETAIL_NOT_FOUND
      );
    }

    // Finally, update the waxConsultationDetail
    const [, [updatedWaxConsultationDetail]] =
      await WaxConsultationDetailModel.update(updateProps, {
        where: { id, company },
        returning: true,
      });
    return updatedWaxConsultationDetail;
  }

  async deleteWaxConsultationDetail(props: DeleteWaxConsultationDetailProps) {
    // Props
    const { id, company } = props;

    // Find and delete the waxConsultationDetail by id and company
    const waxConsultationDetail = await WaxConsultationDetailModel.destroy({
      where: { id, company },
    });

    // if waxConsultationDetail has been deleted, throw an error
    if (!waxConsultationDetail) {
      throw new CustomError(
        404,
        WaxConsultationDetailErrorCode.WAX_DETAIL_NOT_FOUND
      );
    }

    return waxConsultationDetail;
  }

  async getWaxConsultationDetailById(
    props: GetWaxConsultationDetailByIdProps
  ) {
    // Props
    const { id, company } = props;

    // Find  the waxConsultationDetail by id and company
    const waxConsultationDetail = await WaxConsultationDetailModel.findOne({
      where: { id, company },
      include: [
        {
          model: CompanyModel,
        },
        {
          model: WaxConsultationModel,
          as: "Wax",
        },
      ],
    });

    // If no waxConsultationDetail has been found, then throw an error
    if (!waxConsultationDetail) {
      throw new CustomError(
        404,
        WaxConsultationDetailErrorCode.WAX_DETAIL_NOT_FOUND
      );
    }

    return waxConsultationDetail;
  }

  async getWaxConsultationDetails(props: GetWaxConsultationDetailsProps) {
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
        model: WaxConsultationModel,
        as: "Wax",
        where: {
          ...filters["Wax"],
        }
      },
    ];

    // Count total waxConsultationDetails in the given company
    const count = await WaxConsultationDetailModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
      include,
    });

    // Find all waxConsultationDetails for matching props and company
    const data = await WaxConsultationDetailModel.findAll({
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

export default new WaxConsultationDetailService();
