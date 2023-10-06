import { omit as _omit } from "lodash";
import { Op } from "sequelize";

import SiteModel from "./site.model";
import {
  CreateSiteProps,
  UpdateSiteProps,
  DeleteSiteProps,
  GetSiteByIdProps,
  GetSitesProps,
} from "./site.types";
import { CustomError } from "../../components/errors";
import SiteErrorCode from "./site.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { getFilters } from "../../components/filters";
class SiteService {

  async createSite(props: CreateSiteProps) {
    const { name, company } = props;

    // Check if type with same name already exists
    const existingType = await SiteModel.findOne({
      where: {
        company,
        name: {
          [Op.iLike]: `${name}`,
        },
      },
    });

    // If exists, then throw an error
    if (existingType) {
      throw new CustomError(
        409,
        SiteErrorCode.SITE_ALREADY_EXISTS
      );
    }
    const site = await SiteModel.create(props);
    return site;
  }

  async updateSite(props: UpdateSiteProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find site by id and company
    const site = await SiteModel.findOne({
      where: { id, company },
    });

    // if site not found, throw an error
    if (!site) {
      throw new CustomError(
        404,
        SiteErrorCode.SITE_NOT_FOUND
      );
    }

    if (site.name.toLowerCase() !== props.name.toLowerCase()) {
      // Check if type with same name already exists
      const existingType = await SiteModel.findOne({
        where: {
          name: {
            [Op.iLike]: `${props.name}`,
          },
          company,
        },
      });

      // If exists, then throw an error
      if (existingType) {
        throw new CustomError(
          409,
          SiteErrorCode.SITE_ALREADY_EXISTS
        );
      }
    }

    // Finally, update the site
    const [, [updatedSite]] = await SiteModel.update(
      updateProps,
      {
        where: { id, company },
        returning: true,
      }
    );
    return updatedSite;
  }

  async deleteSite(props: DeleteSiteProps) {
    // Props
    const { id, company } = props;

    // Find and delete the site by id and company
    const site = await SiteModel.destroy({
      where: { id, company },
    });

    // if site has been deleted, throw an error
    if (!site) {
      throw new CustomError(
        404,
        SiteErrorCode.SITE_NOT_FOUND
      );
    }

    return site;
  }

  async getSiteById(props: GetSiteByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the site by id and company
    const site = await SiteModel.findOne({
      where: { id, company },
      include: [
        {
          model: CompanyModel,
        }
      ],
    });

    // If no site has been found, then throw an error
    if (!site) {
      throw new CustomError(
        404,
        SiteErrorCode.SITE_NOT_FOUND
      );
    }

    return site;
  }

  async getSites(props: GetSitesProps) {
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

    // Count total sites in the given company
    const count = await SiteModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
      include,
    });

    // Find all sites for matching props and company
    const data = await SiteModel.findAll({
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

export default new SiteService();
