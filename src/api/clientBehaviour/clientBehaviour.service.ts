import { omit as _omit } from "lodash";

import ClientBehaviourModel from "./clientBehaviour.model";
import {
  CreateClientBehaviourProps,
  UpdateClientBehaviourProps,
  DeleteClientBehaviourProps,
  GetClientBehaviourByIdProps,
  GetClientBehavioursProps,
} from "./clientBehaviour.types";
import { CustomError } from "../../components/errors";
import ClientBehaviourErrorCode from "./clientBehaviour.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { StaffProfileModel } from "../staffProfile";
import { ClientProfileModel } from "../clientProfile";
import { getFilters } from "../../components/filters";

class ClientBehaviourService {
  async createClientBehaviour(props: CreateClientBehaviourProps) {
    const clientBehaviour = await ClientBehaviourModel.create(props);
    return clientBehaviour;
  }

  async updateClientBehaviour(props: UpdateClientBehaviourProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find clientBehaviour by id and company
    const clientBehaviour = await ClientBehaviourModel.findOne({
      where: { id, company },
    });

    // if clientBehaviour not found, throw an error
    if (!clientBehaviour) {
      throw new CustomError(
        404,
        ClientBehaviourErrorCode.CLIENT_BEHAVIOUR_NOT_FOUND
      );
    }

    // Finally, update the clientBehaviour
    const [, [updatedClientBehaviour]] = await ClientBehaviourModel.update(
      updateProps,
      {
        where: { id, company },
        returning: true,
      }
    );
    return updatedClientBehaviour;
  }

  async deleteClientBehaviour(props: DeleteClientBehaviourProps) {
    // Props
    const { id, company } = props;

    // Find and delete the clientBehaviour by id and company
    const clientBehaviour = await ClientBehaviourModel.destroy({
      where: { id, company },
    });

    // if clientBehaviour has been deleted, throw an error
    if (!clientBehaviour) {
      throw new CustomError(
        404,
        ClientBehaviourErrorCode.CLIENT_BEHAVIOUR_NOT_FOUND
      );
    }

    return clientBehaviour;
  }

  async getClientBehaviourById(props: GetClientBehaviourByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the clientBehaviour by id and company
    const clientBehaviour = await ClientBehaviourModel.findOne({
      where: { id, company },
      include: [
        {
          model: CompanyModel,
        },
        {
          model: StaffProfileModel,
          as: "Staff",
        },
        {
          model: ClientProfileModel,
          as: "Client",
        },
      ],
    });

    // If no clientBehaviour has been found, then throw an error
    if (!clientBehaviour) {
      throw new CustomError(
        404,
        ClientBehaviourErrorCode.CLIENT_BEHAVIOUR_NOT_FOUND
      );
    }

    return clientBehaviour;
  }

  async getClientBehaviours(props: GetClientBehavioursProps) {
    // Props
    const { page, pageSize, sort, where, company } = props;

    const { offset, limit } = getPagingParams(page, pageSize);
    const order = getSortingParams(sort);
    const filters = getFilters(where);

    const include = [
      {
        model: CompanyModel,
      },
      {
        model: StaffProfileModel,
        as: "Staff",
        where: {
          ...filters["Staff"],
        },
      },
      {
        model: ClientProfileModel,
        as: "Client",
        where: {
          ...filters["Client"],
        },
      },
    ];

    // Count total clientBehaviours in the given company
    const count = await ClientBehaviourModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      include,
    });

    // Find all clientBehaviours for matching props and company
    const data = await ClientBehaviourModel.findAll({
      offset,
      limit,
      order,
      where: {
        company,
        ...filters["primaryFilters"],
      },
      include,
    });

    // TODO: Clean up getPagingData function
    const response = getPagingData({ count, rows: data }, page, limit);

    return response;
  }
}

export default new ClientBehaviourService();
