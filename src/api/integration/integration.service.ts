import { omit as _omit } from "lodash";
import { Op } from "sequelize";

import IntegrationModel from "./integration.model";
import {
  CreateIntegrationProps,
  UpdateIntegrationProps,
  DeleteIntegrationProps,
  GetIntegrationByIdProps,
  GetIntegrationsProps,
} from "./integration.types";
import { CustomError } from "../../components/errors";
import IntegrationErrorCode from "./integration.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { getFilters } from "../../components/filters";

class IntegrationService {
  async createIntegration(props: CreateIntegrationProps) {
    // Props
    const { company } = props;

    // Check if integration with same name already exists
    const existingIntegration = await IntegrationModel.findOne({
      where: {
        company,
      },
    });

    // If exists, then throw an error
    if (existingIntegration) {
      throw new CustomError(
        409,
        IntegrationErrorCode.INTEGRATION_ALREADY_EXISTS
      );
    }

    // Otherwise, create a new integration
    const integration = await IntegrationModel.create(props);

    return integration;
  }

  async updateIntegration(props: UpdateIntegrationProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find integration by id and company
    const integration = await IntegrationModel.findOne({
      where: { id, company },
    });

    // if integration not found, throw an error
    if (!integration) {
      throw new CustomError(404, IntegrationErrorCode.INTEGRATION_NOT_FOUND);
    }

    if (integration.key.toLowerCase() !== props.key.toLowerCase()) {
      // Check if integration with same key already exists
      const existingIntegration = await IntegrationModel.findOne({
        where: {
          key: {
            [Op.iLike]: `${props.key}`,
          },
          company,
        },
      });

      // If exists, then throw an error
      if (existingIntegration) {
        throw new CustomError(
          409,
          IntegrationErrorCode.INTEGRATION_ALREADY_EXISTS
        );
      }
    }

    // Finally, update the integration
    const [, [updatedIntegration]] = await IntegrationModel.update(
      updateProps,
      {
        where: { id, company },
        returning: true,
      }
    );

    return updatedIntegration;
  }

  async deleteIntegration(props: DeleteIntegrationProps) {
    // Props
    const { id, company } = props;

    // Find and delete the integration by id and company
    const integration = await IntegrationModel.destroy({
      where: { id, company },
    });

    // if integration has been deleted, throw an error
    if (!integration) {
      throw new CustomError(404, IntegrationErrorCode.INTEGRATION_NOT_FOUND);
    }

    return integration;
  }

  async getIntegrationById(props: GetIntegrationByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the integration by id and company
    const integration = await IntegrationModel.findOne({
      where: { id, company },
      include: [
        {
          model: CompanyModel,
        },
      ],
    });

    // If no integration has been found, then throw an error
    if (!integration) {
      throw new CustomError(404, IntegrationErrorCode.INTEGRATION_NOT_FOUND);
    }

    return integration;
  }

  async getIntegrations(props: GetIntegrationsProps) {
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

    // Count total integrations in the given company
    const count = await IntegrationModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
      include,
    });

    // Find all integrations for matching props and company
    const data = await IntegrationModel.findAll({
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

export default new IntegrationService();
