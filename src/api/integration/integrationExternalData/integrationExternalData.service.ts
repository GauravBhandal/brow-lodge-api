import { omit as _omit } from "lodash";

import IntegrationExternalDataModel from "./integrationExternalData.model";
import {
  CreateOrUpdateIntegrationExternalDataProps,
  GetIntegrationExternalDataProps,
} from "./integrationExternalData.types";
import { CustomError } from "../../../components/errors";
import IntegrationExternalDataErrorCode from "./integrationExternalData.error";
import { CompanyModel } from "../../company";
import IntegrationModel from "../integration.model";

class IntegrationExternalDataService {
  async createOrUpdateIntegrationExternalData(
    props: CreateOrUpdateIntegrationExternalDataProps
  ) {
    // Props
    const { company, integration, type } = props;

    // Check if integrationExternalData with same integration id already exists
    const existingIntegrationExternalData =
      await IntegrationExternalDataModel.findOne({
        where: {
          company,
          integration,
          type,
        },
      });

    // If exists, then throw an error
    if (existingIntegrationExternalData) {
      const updateProps = _omit(props, ["integration", "company", "type"]);

      const [, [updatedIntegrationExternalData]] =
        await IntegrationExternalDataModel.update(updateProps, {
          where: { integration, company, type },
          returning: true,
        });

      return updatedIntegrationExternalData;
    } else {
      // Otherwise, create a new integrationExternalData
      const integrationExternalData = await IntegrationExternalDataModel.create(
        props
      );

      return integrationExternalData;
    }
  }

  async getIntegrationExternalData(props: GetIntegrationExternalDataProps) {
    // Props
    const { integration, company, type } = props;

    // Find  the integrationExternalData by integration and company
    const integrationExternalData = await IntegrationExternalDataModel.findOne({
      where: { integration, company, type },
      include: [
        {
          model: CompanyModel,
        },
        {
          model: IntegrationModel,
          as: "Integration",
        },
      ],
    });

    // If no integrationExternalData has been found, then throw an error
    if (!integrationExternalData) {
      throw new CustomError(
        404,
        IntegrationExternalDataErrorCode.INTEGRATION_EXTERNAL_DATA_NOT_FOUND
      );
    }

    return integrationExternalData;
  }
}

export default new IntegrationExternalDataService();
