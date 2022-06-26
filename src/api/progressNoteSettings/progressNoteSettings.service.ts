import { omit as _omit } from "lodash";

import ProgressNoteSettingsModel from "./progressNoteSettings.model";
import {
  CreateProgressNoteSettingsProps,
  UpdateProgressNoteSettingsProps,
  GetProgressNoteSettingsProps,
} from "./progressNoteSettings.types";

class ProgressNoteSettingsService {
  async createProgressNoteSettings(props: CreateProgressNoteSettingsProps) {
    const progressNoteSettings = await ProgressNoteSettingsModel.create(props);
    return progressNoteSettings;
  }

  async updateProgressNoteSettings(props: UpdateProgressNoteSettingsProps) {
    // Props
    const { company, customFields } = props;

    // Find progressNoteSettings by company
    const progressNoteSettings = await ProgressNoteSettingsModel.findOne({
      where: { company },
    });

    // if progressNoteSettings not found, create a new one
    if (!progressNoteSettings) {
      const createdProgressNoteSettings = await this.createProgressNoteSettings(
        {
          customFields,
          company,
        }
      );
      return createdProgressNoteSettings;
    }

    // If found, update the rosterSetting
    const [, [updatedProgressNoteSettings]] =
      await ProgressNoteSettingsModel.update(
        { customFields },
        {
          where: { company },
          returning: true,
        }
      );
    return updatedProgressNoteSettings;
  }

  async getProgressNoteSettings(props: GetProgressNoteSettingsProps) {
    // Props
    const { company } = props;

    // Find progressNoteSettings by company
    const progressNoteSettings = await ProgressNoteSettingsModel.findOne({
      where: { company },
    });

    // if progressNoteSettings not found, create a new one
    if (!progressNoteSettings) {
      const createdProgressNoteSettings = await this.createProgressNoteSettings(
        {
          customFields: [],
          company,
        }
      );
      return createdProgressNoteSettings;
    }

    return progressNoteSettings;
  }
}

export default new ProgressNoteSettingsService();
