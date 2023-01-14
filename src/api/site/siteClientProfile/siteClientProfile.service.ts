import SiteClientProfileModel from "./siteClientProfile.model";
import {
  CreateBulkSiteClientProfileProps,
  UpdateBulkSiteClientProfileProps,
  DeleteBulkSiteClientProfileProps,
} from "./siteClientProfile.types";

class SiteClientProfileService {
  async createBulkSiteClientProfile(props: CreateBulkSiteClientProfileProps) {
    const createProps = props.client.map((clientProfile) => ({
      site: props.site,
      client: clientProfile,
    }));

    const siteClientProfile = await SiteClientProfileModel.bulkCreate(
      createProps
    );
    return siteClientProfile;
  }

  async updateBulkSiteClientProfile(props: UpdateBulkSiteClientProfileProps) {
    // Delete all the existing clientProfiles for the given site
    await this.deleteBulkSiteClientProfile({ site: props.site });

    // Then assign the new clientProfiles to the given site
    const siteClientProfile = await this.createBulkSiteClientProfile(props);
    return siteClientProfile;
  }

  async deleteBulkSiteClientProfile(props: DeleteBulkSiteClientProfileProps) {
    const { site } = props;
    await SiteClientProfileModel.destroy({
      where: {
        site,
      },
    });
  }
}

export default new SiteClientProfileService();
