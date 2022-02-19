import IncidentReportIncidentTypeModel from "./incidentReportIncidentType.model";
import {
  CreateBulkIncidentReportIncidentTypeProps,
  UpdateBulkIncidentReportIncidentTypeProps,
  DeleteBulkIncidentReportIncidentTypeProps,
} from "./incidentReportIncidentType.types";

class IncidentReportIncidentTypeService {
  async createBulkIncidentReportIncidentType(
    props: CreateBulkIncidentReportIncidentTypeProps
  ) {
    const createProps = props.types.map((type) => ({
      incident: props.incident,
      type,
    }));

    const incidentReportIncidentType =
      await IncidentReportIncidentTypeModel.bulkCreate(createProps);
    return incidentReportIncidentType;
  }

  async updateBulkIncidentReportIncidentType(
    props: UpdateBulkIncidentReportIncidentTypeProps
  ) {
    // Delete all the existing types for the given incident
    await this.deleteBulkIncidentReportIncidentType({
      incident: props.incident,
    });

    // Then assign the new types to the given incident
    const incidentReportIncidentType =
      await this.createBulkIncidentReportIncidentType(props);
    return incidentReportIncidentType;
  }

  async deleteBulkIncidentReportIncidentType(
    props: DeleteBulkIncidentReportIncidentTypeProps
  ) {
    const { incident } = props;
    await IncidentReportIncidentTypeModel.destroy({
      where: {
        incident,
      },
    });
  }
}

export default new IncidentReportIncidentTypeService();
