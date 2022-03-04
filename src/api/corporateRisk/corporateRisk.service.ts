import { omit as _omit } from "lodash";

import CorporateRiskModel from "./corporateRisk.model";
import {
  CreateCorporateRiskProps,
  UpdateCorporateRiskProps,
  DeleteCorporateRiskProps,
  GetCorporateRiskByIdProps,
  GetCorporateRisksProps,
} from "./corporateRisk.types";
import { CustomError } from "../../components/errors";
import CorporateRiskErrorCode from "./corporateRisk.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { StaffProfileModel } from "../staffProfile";

import { getFilters } from "../../components/filters";

class CorporateRiskService {
  async createCorporateRisk(props: CreateCorporateRiskProps) {
    const corporateRisk = await CorporateRiskModel.create(props);
    return corporateRisk;
  }

  async updateCorporateRisk(props: UpdateCorporateRiskProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find corporateRisk by id and company
    const corporateRisk = await CorporateRiskModel.findOne({
      where: { id, company },
    });

    // if corporateRisk not found, throw an error
    if (!corporateRisk) {
      throw new CustomError(
        404,
        CorporateRiskErrorCode.CORPORATE_RISK_NOT_FOUND
      );
    }

    // Finally, update the corporateRisk
    const [, [updatedCorporateRisk]] = await CorporateRiskModel.update(
      updateProps,
      {
        where: { id, company },
        returning: true,
      }
    );
    return updatedCorporateRisk;
  }

  async deleteCorporateRisk(props: DeleteCorporateRiskProps) {
    // Props
    const { id, company } = props;

    // Find and delete the corporateRisk by id and company
    const corporateRisk = await CorporateRiskModel.destroy({
      where: { id, company },
    });

    // if corporateRisk has been deleted, throw an error
    if (!corporateRisk) {
      throw new CustomError(
        404,
        CorporateRiskErrorCode.CORPORATE_RISK_NOT_FOUND
      );
    }

    return corporateRisk;
  }

  async getCorporateRiskById(props: GetCorporateRiskByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the corporateRisk by id and company
    const corporateRisk = await CorporateRiskModel.findOne({
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

    // If no corporateRisk has been found, then throw an error
    if (!corporateRisk) {
      throw new CustomError(
        404,
        CorporateRiskErrorCode.CORPORATE_RISK_NOT_FOUND
      );
    }

    return corporateRisk;
  }

  async getCorporateRisks(props: GetCorporateRisksProps) {
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
    // Count total corporateRisks in the given company
    const count = await CorporateRiskModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
      include,
    });

    // Find all corporateRisks for matching props and company
    const data = await CorporateRiskModel.findAll({
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

export default new CorporateRiskService();
