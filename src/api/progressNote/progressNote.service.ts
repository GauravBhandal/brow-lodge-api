import ProgressNoteModel from "./progressNote.model";
import {
  ProgressNote,
  CreateProgressNoteProps,
  UpdateProgressNoteProps,
} from "./progressNote.types";
import { CustomError } from "../../components/errors";
import ProgressNoteErrorCode from "./progressNote.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { QueryParams } from "../../common/types";

class ProgressNoteService {
  async createProgressNote(props: CreateProgressNoteProps) {
    const progressNote = await ProgressNoteModel.create(props);
    return progressNote;
  }

  async updateProgressNote(
    progressNoteId: ProgressNote["id"],
    props: UpdateProgressNoteProps
  ) {
    const progressNote = await ProgressNoteModel.findOne({
      where: { id: progressNoteId },
    });
    if (!progressNote) {
      throw new CustomError(404, ProgressNoteErrorCode.PROGRESS_NOTE_NOT_FOUND);
    }
    const [, [updatedProgressNote]] = await ProgressNoteModel.update(props, {
      where: { id: progressNoteId },
      returning: true,
    });
    return updatedProgressNote;
  }

  async deleteProgressNote(progressNoteId: ProgressNote["id"]) {
    const progressNote = await ProgressNoteModel.destroy({
      where: { id: progressNoteId },
    });
    return progressNote;
  }

  async getProgressNotes(queryParams: QueryParams) {
    const { page, pageSize, sort } = queryParams;

    const { offset, limit } = getPagingParams(page, pageSize);
    const order = getSortingParams(sort);

    const data = await ProgressNoteModel.findAndCountAll({
      offset,
      limit,
      order,
    });

    const response = getPagingData(data, page, limit);

    return response;
  }

  async getProgressNoteById(progressNoteId: ProgressNote["id"]) {
    const progressNote = await ProgressNoteModel.findOne({
      where: { id: progressNoteId },
    });
    return progressNote;
  }
}

export default new ProgressNoteService();
