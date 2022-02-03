import { omit as _omit } from "lodash";

import IncidentModel from "./incident.model";
import {
  CreateIncidentProps,
  UpdateIncidentProps,
  DeleteIncidentProps,
  GetIncidentByIdProps,
  GetIncidentsProps,
} from "./incident.types";
import { CustomError } from "../../components/errors";
import IncidentErrorCode from "./incident.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { StaffProfileModel } from "../staffProfile";
import { ClientProfileModel } from "../clientProfile";
import { getFilters } from "../../components/filters";
import { incidentAttachmentService } from "./incidentAttachment";
import { AttachmentModel } from "../attachment";

class IncidentService {
  async createIncident(props: CreateIncidentProps) {
    const incident = await IncidentModel.create(props);

    // Create attachments
    if (props.attachments && props.attachments.length) {
      await incidentAttachmentService.createBulkIncidentAttachment({
        relation: incident.id,
        attachments: props.attachments,
      });
    }
    return incident;
  }

  async updateIncident(props: UpdateIncidentProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find incident by id and company
    const incident = await IncidentModel.findOne({
      where: { id, company },
    });

    // if incident not found, throw an error
    if (!incident) {
      throw new CustomError(404, IncidentErrorCode.INCIDENT);
    }

    // Finally, update the incident
    const [, [updatedIncident]] = await IncidentModel.update(updateProps, {
      where: { id, company },
      returning: true,
    });

    // Update attachments
    if (props.attachments) {
      await incidentAttachmentService.updateBulkIncidentAttachment({
        relation: incident.id,
        attachments: props.attachments,
      });
    }

    return updatedIncident;
  }

  async deleteIncident(props: DeleteIncidentProps) {
    // Props
    const { id, company } = props;

    // Find and delete the incident by id and company
    const incident = await IncidentModel.destroy({
      where: { id, company },
    });

    // if incident has been deleted, throw an error
    if (!incident) {
      throw new CustomError(404, IncidentErrorCode.INCIDENT);
    }

    return incident;
  }

  async getIncidentById(props: GetIncidentByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the incident by id and company
    const incident = await IncidentModel.findOne({
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

    // If no incident has been found, then throw an error
    if (!incident) {
      throw new CustomError(404, IncidentErrorCode.INCIDENT);
    }

    return incident;
  }

  async getIncidents(props: GetIncidentsProps) {
    // Props
    const { page, pageSize, sort, where, company } = props;

    const { offset, limit } = getPagingParams(page, pageSize);
    const order = getSortingParams(sort);
    const filters = getFilters(where);

    const include = [
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
        where: {
          ...filters["Staff"],
        },
      },
      {
        model: ClientProfileModel,
        as: "Client",
        where: {
          ...filters["Client"],
        },
      },
    ];

    // Count total incidents in the given company
    const count = await IncidentModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
      include,
    });

    // Find all incidents for matching props and company
    const data = await IncidentModel.findAll({
      offset,
      limit,
      order,
      where: {
        company,
        ...filters["primaryFilters"],
      },
      subQuery: false, // TODO: I have no idea why we need this, but removing it will break sort by client
      include,
    });

    // TODO: Clean up getPagingData function
    const response = getPagingData({ count, rows: data }, page, limit);

    return response;
  }
}

export default new IncidentService();
