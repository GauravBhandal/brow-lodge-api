import { omit as _omit } from "lodash";

import CompanyAssetModel from "./companyAsset.model";
import {
  CreateCompanyAssetProps,
  UpdateCompanyAssetProps,
  DeleteCompanyAssetProps,
  GetCompanyAssetByIdProps,
  GetCompanyAssetsProps,
} from "./companyAsset.types";
import { CustomError } from "../../components/errors";
import CompanyAssetErrorCode from "./companyAsset.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { StaffProfileModel } from "../staffProfile";
import { ClientProfileModel } from "../clientProfile";
import { getFilters } from "../../components/filters";

class CompanyAssetService {
  async createCompanyAsset(props: CreateCompanyAssetProps) {
    const companyAsset = await CompanyAssetModel.create(props);
    return companyAsset;
  }

  async updateCompanyAsset(props: UpdateCompanyAssetProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find companyAsset by id and company
    const companyAsset = await CompanyAssetModel.findOne({
      where: { id, company },
    });

    // if companyAsset not found, throw an error
    if (!companyAsset) {
      throw new CustomError(404, CompanyAssetErrorCode.COMPANY_ASSET_NOT_FOUND);
    }

    // Finally, update the companyAsset
    const [, [updatedCompanyAsset]] = await CompanyAssetModel.update(
      updateProps,
      {
        where: { id, company },
        returning: true,
      }
    );
    return updatedCompanyAsset;
  }

  async deleteCompanyAsset(props: DeleteCompanyAssetProps) {
    // Props
    const { id, company } = props;

    // Find and delete the companyAsset by id and company
    const companyAsset = await CompanyAssetModel.destroy({
      where: { id, company },
    });

    // if companyAsset has been deleted, throw an error
    if (!companyAsset) {
      throw new CustomError(404, CompanyAssetErrorCode.COMPANY_ASSET_NOT_FOUND);
    }

    return companyAsset;
  }

  async getCompanyAssetById(props: GetCompanyAssetByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the companyAsset by id and company
    const companyAsset = await CompanyAssetModel.findOne({
      where: { id, company },
      include: [
        {
          model: CompanyModel,
        },
        {
          model: StaffProfileModel,
          as: "Staff",
        },
        {
          model: ClientProfileModel,
          as: "Client",
        },
      ],
    });

    // If no companyAsset has been found, then throw an error
    if (!companyAsset) {
      throw new CustomError(404, CompanyAssetErrorCode.COMPANY_ASSET_NOT_FOUND);
    }

    return companyAsset;
  }

  async getCompanyAssets(props: GetCompanyAssetsProps) {
    // Props
    const { page, pageSize, sort, where, company } = props;

    const { offset, limit } = getPagingParams(page, pageSize);
    const order = getSortingParams(sort);
    const filters = getFilters(where);

    // Count total companyAssets in the given company
    const count = await CompanyAssetModel.count({
      where: {
        company,
        ...filters,
      },
    });

    // Find all companyAssets for matching props and company
    const data = await CompanyAssetModel.findAll({
      offset,
      limit,
      order,
      where: {
        company,
        ...filters,
      },
      include: [
        {
          model: CompanyModel,
        },
        {
          model: StaffProfileModel,
          as: "Staff",
        },
        {
          model: ClientProfileModel,
          as: "Client",
        },
      ],
    });

    // TODO: Clean up getPagingData function
    const response = getPagingData({ count, rows: data }, page, limit);

    return response;
  }
}

export default new CompanyAssetService();
