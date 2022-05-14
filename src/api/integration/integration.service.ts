import { omit as _omit } from "lodash";
import crypto from "crypto-js";

import IntegrationModel from "./integration.model";
import {
  CreateIntegrationProps,
  UpdateIntegrationProps,
  GetIntegrationStatusByKeyProps,
  GetIntegrationBykeyProps,
  DeleteIntegrationBykeyProps,
} from "./integration.types";
import { CustomError } from "../../components/errors";
import IntegrationErrorCode from "./integration.error";
import config from "../../config/environment";

class IntegrationService {
  async createIntegration(props: CreateIntegrationProps) {
    // Props
    const { company, key } = props;

    // Check if integration with same key already exists
    const existingIntegration = await IntegrationModel.findOne({
      where: {
        company,
        key,
      },
    });

    // If exists, then throw an error
    if (existingIntegration) {
      throw new CustomError(
        409,
        IntegrationErrorCode.INTEGRATION_ALREADY_EXISTS
      );
    }

    // Encrypt the tokenSet
    const encryptedMeta = crypto.AES.encrypt(
      JSON.stringify(props.meta),
      config.TOKEN_KEY
    ).toString();

    const createProps = {
      ...props,
      meta: encryptedMeta,
    };

    // Otherwise, create a new integration
    const integration = await IntegrationModel.create(createProps);

    return integration;
  }

  async updateIntegration(props: UpdateIntegrationProps) {
    // Props
    const { key, company, meta } = props;

    // Encrypt the tokenSet
    const encryptedMeta = crypto.AES.encrypt(
      JSON.stringify(meta),
      config.TOKEN_KEY
    ).toString();

    const updateProps = {
      meta: encryptedMeta,
    };

    // Find integration by key and company
    const integration = await IntegrationModel.findOne({
      where: { key, company },
    });

    // if integration not found, throw an error
    if (!integration) {
      throw new CustomError(404, IntegrationErrorCode.INTEGRATION_NOT_FOUND);
    }

    // Finally, update the integration
    const [, [updatedIntegration]] = await IntegrationModel.update(
      updateProps,
      {
        where: { key, company },
        returning: true,
      }
    );

    return updatedIntegration;
  }

  async deleteIntegrationByKey(props: DeleteIntegrationBykeyProps) {
    // Props
    const { key, company } = props;

    // Find and delete the integration by id and company
    const integration = await IntegrationModel.destroy({
      where: { key, company },
    });

    // if integration has been deleted, throw an error
    if (!integration) {
      throw new CustomError(404, IntegrationErrorCode.INTEGRATION_NOT_FOUND);
    }

    return integration;
  }

  async getIntegrationStatusByKey(props: GetIntegrationStatusByKeyProps) {
    // Props
    const { key, company } = props;

    // Find  the integration by key and company
    const integration = await IntegrationModel.findOne({
      attributes: { exclude: ["meta"] },
      where: { key, company },
    });

    // If no integration has been found, then throw an error
    if (!integration) {
      return { isConnected: false };
    }

    return { isConnected: true };
  }

  async getIntegrationByKey(props: GetIntegrationBykeyProps) {
    // Props
    const { key, company } = props;

    // Find  the integration by key and company
    const integration = await IntegrationModel.findOne({
      where: { key, company },
    });

    // If no integration has been found, then throw an error
    if (!integration) {
      throw new CustomError(404, IntegrationErrorCode.INTEGRATION_NOT_FOUND);
    }

    const bytes = crypto.AES.decrypt(integration.meta, config.TOKEN_KEY);
    const meta = JSON.parse(bytes.toString(crypto.enc.Utf8));

    return { meta, id: integration.id };
  }
}

export default new IntegrationService();
