import { omit as _omit } from "lodash";

import MobileSettingModel from "./mobileSetting.model";
import {
  CreateMobileSettingProps,
  UpdateMobileSettingProps,
  DeleteMobileSettingProps,
  GetMobileSettingsProps,
} from "./mobileSetting.types";

class MobileSettingService {
  async createMobileSettingInBulk(props: CreateMobileSettingProps) {
    const mobileSettings = await MobileSettingModel.create(props);
    return mobileSettings;
  }

  async updateMobileSetting(props: UpdateMobileSettingProps) {
    // Props
    const { company } = props;

    // Delete existing configurations
    await this.deleteMobileSetting({ company });

    // Update mobile setting
    const updatedMobileSettings = await this.createMobileSettingInBulk(
      props
    );

    return updatedMobileSettings;
  }

  async deleteMobileSetting(props: DeleteMobileSettingProps) {
    // Props
    const { company } = props;

    // Find and delete the mobileSetting by company
    const mobileSetting = await MobileSettingModel.destroy({
      where: { company },
    });

    return mobileSetting;
  }

  async getMobileSettings(props: GetMobileSettingsProps) {
    // Props
    const { company } = props;

    // Find all mobileSettings for matching props and company
    const mobileSettings = await MobileSettingModel.findOne({
      where: {
        company,
      },
    });

    return mobileSettings || {};
  }
}

export default new MobileSettingService();