import { omit as _omit } from "lodash";

import ParticipantMedicationChartModel from "./participantMedicationChart.model";
import {
  CreateParticipantMedicationChartProps,
  UpdateParticipantMedicationChartProps,
  DeleteParticipantMedicationChartProps,
  GetParticipantMedicationChartByIdProps,
  GetParticipantMedicationChartsProps,
} from "./participantMedicationChart.types";
import { CustomError } from "../../components/errors";
import ParticipantMedicationChartErrorCode from "./participantMedicationChart.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { StaffProfileModel } from "../staffProfile";
import { ClientProfileModel } from "../clientProfile";
import { addCientFiltersByTeams, getFilters } from "../../components/filters";
import { participantMedicationChartAttachmentService } from "./participantMedicationChartAttachment";
import { AttachmentModel } from "../attachment";

class ParticipantMedicationChartService {
  async createParticipantMedicationChart(
    props: CreateParticipantMedicationChartProps
  ) {
    const participantMedicationChart =
      await ParticipantMedicationChartModel.create(props);

    // Create attachments
    if (props.attachments && props.attachments.length) {
      await participantMedicationChartAttachmentService.createBulkParticipantMedicationChartAttachment(
        {
          relation: participantMedicationChart.id,
          attachments: props.attachments,
        }
      );
    }
    return participantMedicationChart;
  }

  async updateParticipantMedicationChart(
    props: UpdateParticipantMedicationChartProps
  ) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find participantMedicationChart by id and company
    const participantMedicationChart =
      await ParticipantMedicationChartModel.findOne({
        where: { id, company },
      });

    // if participantMedicationChart not found, throw an error
    if (!participantMedicationChart) {
      throw new CustomError(
        404,
        ParticipantMedicationChartErrorCode.PARTICIPANT_MEDICATION_CHART
      );
    }

    // Finally, update the participantMedicationChart
    const [, [updatedParticipantMedicationChart]] =
      await ParticipantMedicationChartModel.update(updateProps, {
        where: { id, company },
        returning: true,
      });

    // Update attachments
    if (props.attachments) {
      await participantMedicationChartAttachmentService.updateBulkParticipantMedicationChartAttachment(
        {
          relation: participantMedicationChart.id,
          attachments: props.attachments,
        }
      );
    }

    return updatedParticipantMedicationChart;
  }

  async deleteParticipantMedicationChart(
    props: DeleteParticipantMedicationChartProps
  ) {
    // Props
    const { id, company } = props;

    // Find and delete the participantMedicationChart by id and company
    const participantMedicationChart =
      await ParticipantMedicationChartModel.destroy({
        where: { id, company },
      });

    // if participantMedicationChart has been deleted, throw an error
    if (!participantMedicationChart) {
      throw new CustomError(
        404,
        ParticipantMedicationChartErrorCode.PARTICIPANT_MEDICATION_CHART
      );
    }

    return participantMedicationChart;
  }

  async getParticipantMedicationChartById(
    props: GetParticipantMedicationChartByIdProps
  ) {
    // Props
    const { id, company } = props;

    // Find  the participantMedicationChart by id and company
    const participantMedicationChart =
      await ParticipantMedicationChartModel.findOne({
        where: { id, company },
        include: [
          {
            model: AttachmentModel,
            through: {
              attributes: [],
            },
          },
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

    // If no participantMedicationChart has been found, then throw an error
    if (!participantMedicationChart) {
      throw new CustomError(
        404,
        ParticipantMedicationChartErrorCode.PARTICIPANT_MEDICATION_CHART
      );
    }

    return participantMedicationChart;
  }

  async getParticipantMedicationCharts(
    props: GetParticipantMedicationChartsProps,
    userId: string
  ) {
    // Props
    const { page, pageSize, sort, where, company } = props;

    const { offset, limit } = getPagingParams(page, pageSize);
    const order = getSortingParams(sort);
    const filters = getFilters(where);

    const clientFilters = await addCientFiltersByTeams(userId, company);

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
      {
        model: ClientProfileModel,
        as: "Client",
        where: {
          ...filters["Client"],
          ...clientFilters,
        },
      },
    ];

    // Count total participantMedicationCharts in the given company
    const count = await ParticipantMedicationChartModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
      include,
    });

    // Find all participantMedicationCharts for matching props and company
    const data = await ParticipantMedicationChartModel.findAll({
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

export default new ParticipantMedicationChartService();
