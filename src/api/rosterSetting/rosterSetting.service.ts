import { omit as _omit } from "lodash";

import RosterSettingModel from "./rosterSetting.model";
import {
  UpdateRosterSettingProps,
  GetRosterSettingByIdProps,
  CreateRosterSettingProps,
} from "./rosterSetting.types";
import { CompanyModel } from "../company";

class RosterSettingService {
  async createRosterSetting(props: CreateRosterSettingProps) {
    const rosterSetting = await RosterSettingModel.create(props);

    return rosterSetting;
  }

  async updateRosterSetting(props: UpdateRosterSettingProps) {
    // Props
    const { company } = props;
    const updateProps = _omit(props, ["company"]);

    // Find rosterSetting by company
    const rosterSetting = await RosterSettingModel.findOne({
      where: { company },
    });

    // if rosterSetting not found, create a new one
    if (!rosterSetting) {
      const createdRosterSetting = await this.createRosterSetting({
        settings: updateProps.settings,
        company,
      });
      return createdRosterSetting;
    }

    // If found, update the rosterSetting
    const [, [updatedRosterSetting]] = await RosterSettingModel.update(
      updateProps,
      {
        where: { company },
        returning: true,
      }
    );
    return updatedRosterSetting;
  }

  async getRosterSettingById(props: GetRosterSettingByIdProps) {
    // Props
    const { company } = props;

    // Find the rosterSetting by company
    const rosterSetting = await RosterSettingModel.findOne({
      where: { company },
      include: [
        {
          model: CompanyModel,
        },
      ],
    });

    // If no rosterSetting has been found, then create a new one
    if (!rosterSetting) {
      const createdRosterSetting = await this.createRosterSetting({
        settings: {},
        company,
      });
      return createdRosterSetting;
    }

    return rosterSetting;
  }
}

export default new RosterSettingService();
