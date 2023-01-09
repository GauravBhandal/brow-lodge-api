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
import { ClientProfileModel } from "../clientProfile";
import { getFilters } from "../../components/filters";
import { siteClientProfileService } from "./siteClientProfile";

class SiteService {
  async createSite(props: CreateSiteProps) {
    const site = await SiteModel.create(props);

    // Add ClientProfiles
    if (props.client && props.client.length) {
      await siteClientProfileService.createBulkSiteClientProfile({
        site: site.id,
        client: props.client,
      });
    }
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
      throw new CustomError(404, SiteErrorCode.SITE_NOT_FOUND);
    }

    // Finally, update the site
    const [, [updatedSite]] = await SiteModel.update(updateProps, {
      where: { id, company },
      returning: true,
    });

    // Update clientProfiles
    if (props.client) {
      await siteClientProfileService.updateBulkSiteClientProfile({
        site: site.id,
        client: props.client,
      });
    }

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
      throw new CustomError(404, SiteErrorCode.SITE_NOT_FOUND);
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
          model: ClientProfileModel,
          through: {
            attributes: [],
          },
          as: "Client",
        },
        {
          model: CompanyModel,
        },
      ],
    });

    // If no site has been found, then throw an error
    if (!site) {
      throw new CustomError(404, SiteErrorCode.SITE_NOT_FOUND);
    }

    return site;
  }

  /**
   * getSiteClientProfiles - funtion to return list of clients which are not present in any site
   */
  async getSiteClientProfiles(props: GetSitesProps) {
    // Props
    const { sort, where, company } = props;

    const order = getSortingParams(sort);
    const filters = getFilters(where);

    const include = [
      {
        model: CompanyModel,
      },
      {
        model: ClientProfileModel,
        through: {
          attributes: [],
        },
        as: "Client",
      },
    ];

    // Find all sites for matching props and company
    const sitesList = await SiteModel.findAll({
      where: {
        company,
      },
      include,
    });

    /**
     * sitesClientIds - get the clients ids by first get the clients array from sites then map their ids only
     */
    const sitesClientIds = sitesList.reduce((prevData, site: any) => {
      return prevData.concat(site.Client)
    }, []).map((client: any) => client.id) //TODO: change any to some prop type

    /**
     * clientList get client list where sites client ids are not present
     */
    const clientList = await ClientProfileModel.findAll({
      order,
      where: {
        company,
        id: {
          [Op.notIn]: sitesClientIds
        },
        archived: false,
        ...filters["primaryFilters"],
      },
      include: {
        model: CompanyModel,
      },
    });

    return clientList;
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
      {
        model: ClientProfileModel,
        through: {
          attributes: [],
        },
        as: "Client",
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
