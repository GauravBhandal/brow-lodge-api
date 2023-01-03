import { omit as _omit } from "lodash";
import { Op } from "sequelize";

import IncidentReportModel from "./incidentReport.model";
import {
  CreateIncidentReportProps,
  UpdateIncidentReportProps,
  DeleteIncidentReportProps,
  GetIncidentReportByIdProps,
  GetIncidentReportsProps,
} from "./incidentReport.types";
import { CustomError } from "../../components/errors";
import IncidentReportErrorCode from "./incidentReport.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { StaffProfileModel } from "../staffProfile";
import { ClientProfileModel } from "../clientProfile";
import { IncidentTypeModel } from "../incidentType";
import { addCientFiltersByTeams, getFilters } from "../../components/filters";
import { incidentReportAttachmentService } from "./incidentReportAttachment";
import { incidentReportStaffProfileService } from "./incidentReportStaffProfile";
import { incidentReportIncidentTypeService } from "./incidentReportIncidentType";
import { AttachmentModel } from "../attachment";

class IncidentReportService {
  async createIncidentReport(props: CreateIncidentReportProps) {
    const incidentReport = await IncidentReportModel.create(props);

    // Assign staff profiles
    if (props.staff && props.staff.length) {
      await incidentReportStaffProfileService.createBulkIncidentReportStaffProfile(
        {
          incident: incidentReport.id,
          staff: props.staff,
        }
      );
    }

    // Assign incident types
    if (props.types && props.types.length) {
      await incidentReportIncidentTypeService.createBulkIncidentReportIncidentType(
        {
          incident: incidentReport.id,
          types: props.types,
        }
      );
    }

    // Assign attachments
    if (props.attachments && props.attachments.length) {
      await incidentReportAttachmentService.createBulkIncidentReportAttachment({
        relation: incidentReport.id,
        attachments: props.attachments,
      });
    }
    return incidentReport;
  }

  async updateIncidentReport(props: UpdateIncidentReportProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find incidentReport by id and company
    const incidentReport = await IncidentReportModel.findOne({
      where: { id, company },
    });

    // if incidentReport not found, throw an error
    if (!incidentReport) {
      throw new CustomError(404, IncidentReportErrorCode.INCIDENT_NOT_FOUND);
    }

    // Finally, update the incidentReport
    const [, [updatedIncidentReport]] = await IncidentReportModel.update(
      updateProps,
      {
        where: { id, company },
        returning: true,
      }
    );

    // Update staff profiles
    if (props.staff && props.staff.length) {
      await incidentReportStaffProfileService.updateBulkIncidentReportStaffProfile(
        {
          incident: incidentReport.id,
          staff: props.staff,
        }
      );
    }

    // Update incident types
    if (props.types && props.types.length) {
      await incidentReportIncidentTypeService.updateBulkIncidentReportIncidentType(
        {
          incident: incidentReport.id,
          types: props.types,
        }
      );
    }

    // Update attachments
    if (props.attachments) {
      await incidentReportAttachmentService.updateBulkIncidentReportAttachment({
        relation: incidentReport.id,
        attachments: props.attachments,
      });
    }

    return updatedIncidentReport;
  }

  async deleteArchiveIncidentReport(props: DeleteIncidentReportProps) {
    // Props
    const { id, company } = props;

    // Find and delete the incidentReport by id and company
    const incidentReport = await IncidentReportModel.findOne({
      where: { id, company },
    });

    // if incidentReport has been deleted, throw an error
    if (!incidentReport) {
      throw new CustomError(404, IncidentReportErrorCode.INCIDENT_NOT_FOUND);
    }

    if (incidentReport.archived) {
      // Check if incidentReport already exists
      const existingIncidentReport = await IncidentReportModel.findAll({
        where: {
          date: incidentReport.date,
          time: incidentReport.time,
          location: incidentReport.location,
          client: incidentReport.client,
          incidentDescription: incidentReport.incidentDescription,
          eventsPriorToIncident: incidentReport.eventsPriorToIncident,
          actionsTakenByStaff: incidentReport.actionsTakenByStaff,
          actionsTakenByOthers: incidentReport.actionsTakenByOthers,
          anyOtherWitness: incidentReport.anyOtherWitness,
          company: incidentReport.company,
          archived: false,
        },
      });

      if (existingIncidentReport.length > 0) {
        throw new CustomError(
          409,
          IncidentReportErrorCode.INCIDENT_ALREADY_EXISTS
        );
      }
    }

    // Finally, update the incidentReport update the Archive state
    const [, [updatedIncidentReport]] = await IncidentReportModel.update(
      { archived: !incidentReport.archived },
      {
        where: { id, company },
        returning: true,
      }
    );

    return updatedIncidentReport;
  }

  async deleteIncidentReport(props: DeleteIncidentReportProps) {
    // Props
    const { id, company } = props;

    // Find and delete the incidentReport by id and company
    const incidentReport = await IncidentReportModel.destroy({
      where: { id, company },
    });

    // if incidentReport has been deleted, throw an error
    if (!incidentReport) {
      throw new CustomError(404, IncidentReportErrorCode.INCIDENT_NOT_FOUND);
    }

    return incidentReport;
  }

  async getIncidentReportById(props: GetIncidentReportByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the incidentReport by id and company
    const incidentReport = await IncidentReportModel.findOne({
      where: { id, company },
      include: [
        {
          model: CompanyModel,
        },
        {
          model: StaffProfileModel,
          as: "Manager",
        },
        {
          model: ClientProfileModel,
          as: "Client",
        },
        {
          model: AttachmentModel,
          through: {
            attributes: [],
          },
        },
        {
          model: StaffProfileModel,
          through: {
            attributes: [],
          },
          as: "Staff",
        },
        {
          model: IncidentTypeModel,
          through: {
            attributes: [],
          },
          as: "Types",
        },
      ],
    });

    // If no incidentReport has been found, then throw an error
    if (!incidentReport) {
      throw new CustomError(404, IncidentReportErrorCode.INCIDENT_NOT_FOUND);
    }

    return incidentReport;
  }

  async getIncidentReports(props: GetIncidentReportsProps, userId: string) {
    // Props
    const { page, pageSize, sort, where, company } = props;

    const { offset, limit } = getPagingParams(page, pageSize);
    const order = getSortingParams(sort);
    const filters = getFilters(where);

    const clientFilters = await addCientFiltersByTeams(userId, company);

    const include = [
      {
        model: CompanyModel,
        duplicating: true,
        required: true,
      },
      {
        model: ClientProfileModel,
        as: "Client",
        where: {
          [Op.and]: [{ ...filters["Client"] }, { ...clientFilters }],
        },
        duplicating: true,
        required: true,
      },
      {
        model: StaffProfileModel,
        through: {
          attributes: [],
        },
        where: {
          ...filters["Staff"],
        },
        as: "Staff",
        duplicating: true,
        required: true,
      },
      {
        model: IncidentTypeModel,
        through: {
          attributes: [],
        },
        as: "Types",
        duplicating: true,
        required: true,
      },
      {
        model: StaffProfileModel,
        as: "Manager",
        duplicating: true,
      },
    ];

    // Count total incidentReports in the given company
    const count = await IncidentReportModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
      include,
    });

    // Find all incidentReports for matching props and company
    const data = await IncidentReportModel.findAll({
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

export default new IncidentReportService();
