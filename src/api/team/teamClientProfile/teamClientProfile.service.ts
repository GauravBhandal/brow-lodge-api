import TeamClientProfileModel from "./teamClientProfile.model";
import {
  CreateBulkTeamClientProfileProps,
  UpdateBulkTeamClientProfileProps,
  DeleteBulkTeamClientProfileProps,
} from "./teamClientProfile.types";

class TeamClientProfileService {
  async createBulkTeamClientProfile(props: CreateBulkTeamClientProfileProps) {
    const createProps = props.client.map((clientProfile) => ({
      team: props.team,
      client: clientProfile,
    }));

    const teamClientProfile = await TeamClientProfileModel.bulkCreate(
      createProps
    );
    return teamClientProfile;
  }

  async updateBulkTeamClientProfile(props: UpdateBulkTeamClientProfileProps) {
    // Delete all the existing clientProfiles for the given team
    await this.deleteBulkTeamClientProfile({ team: props.team });

    // Then assign the new clientProfiles to the given team
    const teamClientProfile = await this.createBulkTeamClientProfile(props);
    return teamClientProfile;
  }

  async deleteBulkTeamClientProfile(props: DeleteBulkTeamClientProfileProps) {
    const { team } = props;
    await TeamClientProfileModel.destroy({
      where: {
        team,
      },
    });
  }
}

export default new TeamClientProfileService();
