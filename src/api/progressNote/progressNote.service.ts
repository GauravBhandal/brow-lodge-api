import { omit as _omit } from "lodash";

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

class ProgressNoteService {
  async createProgressNote(props: CreateProgressNoteProps) {
    const progressNote = await ProgressNoteModel.create(props);
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
        },
        {
          model: ClientProfileModel,
          as: "Client",
        },
      ],
    });

    // If no progressNote has been found, then throw an error
    if (!progressNote) {
      throw new CustomError(404, ProgressNoteErrorCode.PROGRESS_NOTE_NOT_FOUND);
    }

    return progressNote;
  }

  async getProgressNotes(props: GetProgressNotesProps) {
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

    // TODO: Clean up getPagingData function
    const response = getPagingData({ count, rows: data }, page, limit);

    return response;
  }
}

export default new ProgressNoteService();
