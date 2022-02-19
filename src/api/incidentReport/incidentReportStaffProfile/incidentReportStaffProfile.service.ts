import IncidentReportStaffProfileModel from "./incidentReportStaffProfile.model";
import {
  CreateBulkIncidentReportStaffProfileProps,
  UpdateBulkIncidentReportStaffProfileProps,
  DeleteBulkIncidentReportStaffProfileProps,
} from "./incidentReportStaffProfile.types";

class IncidentReportStaffProfileService {
  async createBulkIncidentReportStaffProfile(
    props: CreateBulkIncidentReportStaffProfileProps
  ) {
    const createProps = props.staff.map((staffProfile) => ({
      incident: props.incident,
      staff: staffProfile,
    }));

    const incidentReportStaffProfile =
      await IncidentReportStaffProfileModel.bulkCreate(createProps);
    return incidentReportStaffProfile;
  }

  async updateBulkIncidentReportStaffProfile(
    props: UpdateBulkIncidentReportStaffProfileProps
  ) {
    // Delete all the existing staffProfiles for the given incident
    await this.deleteBulkIncidentReportStaffProfile({
      incident: props.incident,
    });

    // Then assign the new staffProfiles to the given incident
    const incidentReportStaffProfile =
      await this.createBulkIncidentReportStaffProfile(props);
    return incidentReportStaffProfile;
  }

  async deleteBulkIncidentReportStaffProfile(
    props: DeleteBulkIncidentReportStaffProfileProps
  ) {
    const { incident } = props;
    await IncidentReportStaffProfileModel.destroy({
      where: {
        incident,
      },
    });
  }
}

export default new IncidentReportStaffProfileService();
