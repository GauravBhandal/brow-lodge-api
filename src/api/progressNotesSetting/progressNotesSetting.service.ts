import { omit as _omit } from "lodash";

import ProgressNotesSettingModel from "./progressNotesSetting.model";
import {
  CreateProgressNotesSettingProps,
  UpdateProgressNotesSettingProps,
  DeleteProgressNotesSettingProps,
  GetProgressNotesSettingByIdProps,
  GetProgressNotesSettingsProps,
} from "./progressNotesSetting.types";
import { CustomError } from "../../components/errors";
import ProgressNotesSettingErrorCode from "./progressNotesSetting.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { getFilters } from "../../components/filters";

class ProgressNotesSettingService {
  async createProgressNotesSetting(props: CreateProgressNotesSettingProps) {
    const progressNotesSetting = await ProgressNotesSettingModel.create(props);
    return progressNotesSetting;
  }

  async updateProgressNotesSetting(props: UpdateProgressNotesSettingProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find progressNotesSetting by id and company
    const progressNotesSetting = await ProgressNotesSettingModel.findOne({
      where: { id, company },
    });

    // if progressNotesSetting not found, throw an error
    if (!progressNotesSetting) {
      throw new CustomError(
        404,
        ProgressNotesSettingErrorCode.PROGRESS_NOTES_SETTING_NOT_FOUND
      );
    }

    // Finally, update the progressNotesSetting
    const [, [updatedProgressNotesSetting]] =
      await ProgressNotesSettingModel.update(updateProps, {
        where: { id, company },
        returning: true,
      });
    return updatedProgressNotesSetting;
  }

  async getProgressNotesSettingById(props: GetProgressNotesSettingByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the progressNotesSetting by id and company
    const progressNotesSetting = await ProgressNotesSettingModel.findOne({
      where: { id, company },
      include: [
        {
          model: CompanyModel,
        },
      ],
    });

    // If no progressNotesSetting has been found, then throw an error
    if (!progressNotesSetting) {
      throw new CustomError(
        404,
        ProgressNotesSettingErrorCode.PROGRESS_NOTES_SETTING_NOT_FOUND
      );
    }

    return progressNotesSetting;
  }

  async getProgressNotesSettings(
    props: GetProgressNotesSettingsProps,
    userId: string
  ) {
    // Props
    const { page, pageSize, sort, where, company } = props;

    const { offset, limit } = getPagingParams(page, pageSize);
    const order = getSortingParams(sort);
    const filters = getFilters(where);

    const include = [
      {
        model: CompanyModel,
      },
    ];

    // Count total progressNotesSettings in the given company
    const count = await ProgressNotesSettingModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
      include,
    });

    // Find all progressNotesSettings for matching props and company
    const data = await ProgressNotesSettingModel.findAll({
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

export default new ProgressNotesSettingService();
