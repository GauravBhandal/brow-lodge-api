import { omit as _omit } from "lodash";
import { Op } from "sequelize";

import ProgressNoteModel from "./progressNote.model";
import {
  CreateProgressNoteProps,
  UpdateProgressNoteProps,
  DeleteProgressNoteProps,
  GetProgressNoteByIdProps,
  GetProgressNotesProps,
} from "./progressNote.types";
import { CustomError } from "../../components/errors";
import ProgressNoteErrorCode from "./progressNote.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { StaffProfileModel } from "../staffProfile";
import { ClientProfileModel } from "../clientProfile";
import { getFilters } from "../../components/filters";
import { addCientFiltersByTeams } from "../../components/filters";
import { progressNoteAttachmentService } from "./progressNoteAttachment";
import { AttachmentModel } from "../attachment";
import { progressNoteStaffProfileService } from "./progressNoteStaffProfile";
import { ShiftRecordModel } from "../shiftRecord";
import { ServiceModel } from "../service";

class ProgressNoteService {
  async createProgressNote(props: CreateProgressNoteProps) {
    const progressNote = await ProgressNoteModel.create(props);

    // Create attachments
    if (props.attachments && props.attachments.length) {
      await progressNoteAttachmentService.createBulkProgressNoteAttachment({
        relation: progressNote.id,
        attachments: props.attachments,
      });
    }

    // Assign staff profiles
    if (props.staff && props.staff.length) {
      await progressNoteStaffProfileService.createBulkProgressNoteStaffProfile({
        progressNote: progressNote.id,
        staff: props.staff,
      });
    }

    return progressNote;
  }

  async updateProgressNote(props: UpdateProgressNoteProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find progressNote by id and company
    const progressNote = await ProgressNoteModel.findOne({
      where: { id, company },
    });

    // if progressNote not found, throw an error
    if (!progressNote) {
      throw new CustomError(404, ProgressNoteErrorCode.PROGRESS_NOTE_NOT_FOUND);
    }

    // Finally, update the progressNote
    const [, [updatedProgressNote]] = await ProgressNoteModel.update(
      updateProps,
      {
        where: { id, company },
        returning: true,
      }
    );

    // Update attachments
    if (props.attachments) {
      await progressNoteAttachmentService.updateBulkProgressNoteAttachment({
        relation: progressNote.id,
        attachments: props.attachments,
      });
    }

    // Update staff profiles
    if (props.staff && props.staff.length) {
      await progressNoteStaffProfileService.updateBulkProgressNoteStaffProfile({
        progressNote: progressNote.id,
        staff: props.staff,
      });
    }

    return updatedProgressNote;
  }

  async deleteArchiveProgressNote(props: DeleteProgressNoteProps) {
    // Props
    const { id, company } = props;

    // Find and delete the progressNote by id and company
    const progressNote = await ProgressNoteModel.findOne({
      where: { id, company },
    });

    // if progressNote has been deleted, throw an error
    if (!progressNote) {
      throw new CustomError(404, ProgressNoteErrorCode.PROGRESS_NOTE_NOT_FOUND);
    }

    if (progressNote.archived) {
      // Check if progressNote already exists
      const existingProgressNote = await ProgressNoteModel.findAll({
        where: {
          shiftStartTime: progressNote.shiftStartTime,
          date: progressNote.date,
          shiftEndTime: progressNote.shiftEndTime,
          client: progressNote.client,
          notes: progressNote.notes,
          company: progressNote.company,
          archived: false,
        },
      });

      if (existingProgressNote.length > 0) {
        throw new CustomError(
          409,
          ProgressNoteErrorCode.PROGRESS_NOTE_ALREADY_EXISTS
        );
      }
    }

    // Finally, update the progressNote update the Archive state
    const [, [updatedProgressNote]] = await ProgressNoteModel.update(
      { archived: !progressNote.archived },
      {
        where: { id, company },
        returning: true,
      }
    );

    return updatedProgressNote;
  }

  async deleteProgressNote(props: DeleteProgressNoteProps) {
    // Props
    const { id, company } = props;

    // Find and delete the progressNote by id and company
    const progressNote = await ProgressNoteModel.destroy({
      where: { id, company },
    });

    // if progressNote has been deleted, throw an error
    if (!progressNote) {
      throw new CustomError(404, ProgressNoteErrorCode.PROGRESS_NOTE_NOT_FOUND);
    }

    return progressNote;
  }

  async getProgressNoteById(props: GetProgressNoteByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the progressNote by id and company
    const progressNote = await ProgressNoteModel.findOne({
      where: { id, company },
      include: [
        {
          model: CompanyModel,
        },
        {
          model: StaffProfileModel,
          as: "Staff",
          through: {
            attributes: [],
          },
        },
        {
          model: ClientProfileModel,
          as: "Client",
        },
        {
          model: ShiftRecordModel,
          as: "Shift",
        },
        {
          model: AttachmentModel,
          through: {
            attributes: [],
          },
        },
      ],
    });

    // If no progressNote has been found, then throw an error
    if (!progressNote) {
      throw new CustomError(404, ProgressNoteErrorCode.PROGRESS_NOTE_NOT_FOUND);
    }

    return progressNote;
  }

  async getProgressNotes(props: GetProgressNotesProps, userId: string) {
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
        model: ShiftRecordModel,
        as: "Shift",
        where: {
          ...filters["Shift"],
        },
        include: [
          {
            model: ServiceModel,
            through: {
              attributes: ["start_time"], //TODO: We need to do some cleanup here
            },
          },
        ],
      },
    ];

    // Count total progressNotes in the given company
    const count = await ProgressNoteModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
      include,
    });

    // Find all progressNotes for matching props and company
    const data = await ProgressNoteModel.findAll({
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

export default new ProgressNoteService();
