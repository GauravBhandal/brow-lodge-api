import TeamStaffProfileModel from "./teamStaffProfile.model";
import {
  CreateBulkTeamStaffProfileProps,
  UpdateBulkTeamStaffProfileProps,
  DeleteBulkTeamStaffProfileProps,
} from "./teamStaffProfile.types";

class TeamStaffProfileService {
  async createBulkTeamStaffProfile(props: CreateBulkTeamStaffProfileProps) {
    const createProps = props.staff.map((staffProfile) => ({
      team: props.team,
      staff: staffProfile,
    }));

    const teamStaffProfile = await TeamStaffProfileModel.bulkCreate(
      createProps
    );
    return teamStaffProfile;
  }

  async updateBulkTeamStaffProfile(props: UpdateBulkTeamStaffProfileProps) {
    // Delete all the existing staffProfiles for the given team
    await this.deleteBulkTeamStaffProfile({ team: props.team });

    // Then assign the new staffProfiles to the given team
    const teamStaffProfile = await this.createBulkTeamStaffProfile(props);
    return teamStaffProfile;
  }

  async deleteBulkTeamStaffProfile(props: DeleteBulkTeamStaffProfileProps) {
    const { team } = props;
    await TeamStaffProfileModel.destroy({
      where: {
        team,
      },
    });
  }
}

export default new TeamStaffProfileService();
