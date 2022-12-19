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
import { getFilters } from "../../components/filters";
import { companyAssetAttachmentService } from "./companyAssetAttachment";
import { AttachmentModel } from "../attachment";

class CompanyAssetService {
  async createCompanyAsset(props: CreateCompanyAssetProps) {
    const companyAsset = await CompanyAssetModel.create(props);

    // Create attachments
    if (props.attachments && props.attachments.length) {
      await companyAssetAttachmentService.createBulkCompanyAssetAttachment({
        relation: companyAsset.id,
        attachments: props.attachments,
      });
    }
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

    // Update attachments
    if (props.attachments) {
      await companyAssetAttachmentService.updateBulkCompanyAssetAttachment({
        relation: companyAsset.id,
        attachments: props.attachments,
      });
    }
    return updatedCompanyAsset;
  }

  async deleteArchiveCompanyAsset(props: DeleteCompanyAssetProps) {
    // Props
    const { id, company } = props;

    // Find and delete the companyAsset by id and company
    const companyAsset = await CompanyAssetModel.findOne({
      where: { id, company },
    });

    // if companyAsset has been deleted, throw an error
    if (!companyAsset) {
      throw new CustomError(404, CompanyAssetErrorCode.COMPANY_ASSET_NOT_FOUND);
    }

    if (companyAsset.archived) {
      // Check if companyAsset already exists
      const existingCompanyAsset = await CompanyAssetModel.findAll({
        where: {
          date: companyAsset.date,
          staff: companyAsset.staff,
          assetName: companyAsset.assetName,
          location: companyAsset.location,
          company: companyAsset.company,
          archived: false,
        },
      });

      if (existingCompanyAsset.length > 0) {
        throw new CustomError(
          409,
          CompanyAssetErrorCode.COMPANY_ASSET_ALREADY_EXISTS
        );
      }
    }

    // Finally, update the companyAsset update the Archive state
    const [, [updatedCompanyAsset]] = await CompanyAssetModel.update(
      { archived: !companyAsset.archived },
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
          model: AttachmentModel,
          through: {
            attributes: [],
          },
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

    // Count total companyAssets in the given company
    const count = await CompanyAssetModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
      include,
    });

    // Find all companyAssets for matching props and company
    const data = await CompanyAssetModel.findAll({
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

export default new CompanyAssetService();
