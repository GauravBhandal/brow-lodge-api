import { omit as _omit } from "lodash";

import RosterSettingModel from "./rosterSetting.model";
import {
  UpdateRosterSettingProps,
  GetRosterSettingByIdProps,
  CreateRosterSettingProps,
} from "./rosterSetting.types";
import { CustomError } from "../../components/errors";
import RosterSettingErrorCode from "./rosterSetting.error";
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

    // Find rosterSetting by id and company
    const rosterSetting = await RosterSettingModel.findOne({
      where: { company },
    });

    // if rosterSetting not found, throw an error
    if (!rosterSetting) {
      const createdRosterSetting = await this.createRosterSetting({
        settings: updateProps.settings,
        company,
      });
      return createdRosterSetting;
    }

    // Finally, update the rosterSetting
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

    // Find  the rosterSetting by id and company
    const rosterSetting = await RosterSettingModel.findOne({
      where: { company },
      include: [
        {
          model: CompanyModel,
        },
      ],
    });

    // If no rosterSetting has been found, then throw an error
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
