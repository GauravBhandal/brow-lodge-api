import { omit as _omit } from "lodash";

import AlertConfigurationModel from "./alertConfiguration.model";
import {
  CreateAlertConfigurationProps,
  UpdateAlertConfigurationProps,
  DeleteAlertConfigurationProps,
  GetAlertConfigurationByIdProps,
  GetAlertConfigurationsProps,
} from "./alertConfiguration.types";
import { CustomError } from "../../components/errors";
import AlertConfigurationErrorCode from "./alertConfiguration.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { UserModel } from "../user";
import { getFilters } from "../../components/filters";

class AlertConfigurationService {
  async createAlertConfiguration(props: CreateAlertConfigurationProps) {
    // Check if alertConfiguration already exist
    const existingAlertConfiguration = await AlertConfigurationModel.findOne({
      where: { name: props.name, company: props.company },
    });

    // if the alertConfiguration exists, throw an error
    if (existingAlertConfiguration) {
      throw new CustomError(409, AlertConfigurationErrorCode.ROLE_ALREADY_EXISTS);
    }

    const alertConfiguration = await AlertConfigurationModel.create(props);
    return alertConfiguration;
  }

  async updateAlertConfiguration(props: UpdateAlertConfigurationProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find alertConfiguration by id and company
    const alertConfiguration = await AlertConfigurationModel.findOne({ where: { id, company } });

    // if alertConfiguration not found, throw an error
    if (!alertConfiguration) {
      throw new CustomError(404, AlertConfigurationErrorCode.ROLE_NOT_FOUND);
    }

    // Finally, update the alertConfiguration
    const [, [updatedAlertConfiguration]] = await AlertConfigurationModel.update(updateProps, {
      where: { id, company },
      returning: true,
    });

    return updatedAlertConfiguration;
  }

  async deleteAlertConfiguration(props: DeleteAlertConfigurationProps) {
    // Props
    const { id, company } = props;

    // Find and delete the alertConfiguration by id and company
    const alertConfiguration = await AlertConfigurationModel.destroy({ where: { id, company } });

    // If no alertConfiguration has been deleted, then throw an error
    if (!alertConfiguration) {
      throw new CustomError(404, AlertConfigurationErrorCode.ROLE_NOT_FOUND);
    }

    return alertConfiguration;
  }

  async getAlertConfigurationById(props: GetAlertConfigurationByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the alertConfiguration by id and company
    const alertConfiguration = await AlertConfigurationModel.findOne({
      where: { id, company },
    });

    // If no alertConfiguration has been found, then throw an error
    if (!alertConfiguration) {
      throw new CustomError(404, AlertConfigurationErrorCode.ROLE_NOT_FOUND);
    }

    return alertConfiguration;
  }

  async getAlertConfigurations(props: GetAlertConfigurationsProps) {
    // Props
    const { page, pageSize, sort, where, company } = props;

    const { offset, limit } = getPagingParams(page, pageSize);
    const order = getSortingParams(sort);
    const filters = getFilters(where);

    // Count total alertConfigurations in the given company
    const count = await AlertConfigurationModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
    });

    // Find all alertConfigurations for matching props and company
    const data = await AlertConfigurationModel.findAll({
      offset,
      limit,
      order,
      where: {
        company,
        ...filters["primaryFilters"],
      },
      include: [
        {
          model: UserModel,
          through: {
            attributes: [],
          },
        },
      ],
    });

    const response = getPagingData({ count, rows: data }, page, limit);

    return response;
  }
}

export default new AlertConfigurationService();
