import { omit as _omit } from "lodash";

import AlertConfigurationModel from "./alertConfiguration.model";
import {
  CreateAlertConfigurationProps,
  UpdateAlertConfigurationProps,
  DeleteAlertConfigurationProps,
  GetAlertConfigurationsProps,
  GetAlertConfigurationByNameProps,
} from "./alertConfiguration.types";

class AlertConfigurationService {
  async createAlertConfigurationInBulk(props: CreateAlertConfigurationProps[]) {
    const alertConfigurations = await AlertConfigurationModel.bulkCreate(props);
    return alertConfigurations;
  }

  async updateAlertConfiguration(props: UpdateAlertConfigurationProps) {
    // Props
    const { company, payload } = props;

    // Create payload for update
    const updateProps = payload.map((item) => ({
      ...item,
      company,
    }));

    // Delete existing configurations
    await this.deleteAlertConfiguration({ company });

    // Update alert configurations
    const updatedAlertConfigurations =
      await this.createAlertConfigurationInBulk(updateProps);

    return updatedAlertConfigurations;
  }

  async deleteAlertConfiguration(props: DeleteAlertConfigurationProps) {
    // Props
    const { company } = props;

    // Find and delete the alertConfiguration by company
    const alertConfiguration = await AlertConfigurationModel.destroy({
      where: { company },
    });

    return alertConfiguration;
  }

  async getAlertConfigurations(props: GetAlertConfigurationsProps) {
    // Props
    const { company } = props;

    // Find all alertConfigurations for matching props and company
    const data = await AlertConfigurationModel.findAll({
      where: {
        company,
      },
    });

    return data;
  }

  async getAlertConfigurationByName(props: GetAlertConfigurationByNameProps) {
    // Props
    const { company, name } = props;

    // Find all alertConfigurations for matching props and company
    const alertConfiguration = await AlertConfigurationModel.findAll({
      where: {
        company,
      },
    });

    if (!alertConfiguration) {
      return {};
    }

    const getAlertByName = alertConfiguration.find(alert => alert.name === name);

    return getAlertByName;
  }
}

export default new AlertConfigurationService();
