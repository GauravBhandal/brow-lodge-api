import { omit as _omit } from "lodash";

import TransportBehaviourModel from "./transportBehaviour.model";
import {
  CreateTransportBehaviourProps,
  UpdateTransportBehaviourProps,
  DeleteTransportBehaviourProps,
  GetTransportBehaviourByIdProps,
  GetTransportBehavioursProps,
} from "./transportBehaviour.types";
import { CustomError } from "../../components/errors";
import TransportBehaviourErrorCode from "./transportBehaviour.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { StaffProfileModel } from "../staffProfile";
import { ClientProfileModel } from "../clientProfile";
import { getFilters } from "../../components/filters";

class TransportBehaviourService {
  async createTransportBehaviour(props: CreateTransportBehaviourProps) {
    const transportBehaviour = await TransportBehaviourModel.create(props);
    return transportBehaviour;
  }

  async updateTransportBehaviour(props: UpdateTransportBehaviourProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find transportBehaviour by id and company
    const transportBehaviour = await TransportBehaviourModel.findOne({
      where: { id, company },
    });

    // if transportBehaviour not found, throw an error
    if (!transportBehaviour) {
      throw new CustomError(
        404,
        TransportBehaviourErrorCode.TRANSPORT_BEHAVIOUR_NOT_FOUND
      );
    }

    // Finally, update the transportBehaviour
    const [, [updatedTransportBehaviour]] =
      await TransportBehaviourModel.update(updateProps, {
        where: { id, company },
        returning: true,
      });
    return updatedTransportBehaviour;
  }

  async deleteTransportBehaviour(props: DeleteTransportBehaviourProps) {
    // Props
    const { id, company } = props;

    // Find and delete the transportBehaviour by id and company
    const transportBehaviour = await TransportBehaviourModel.destroy({
      where: { id, company },
    });

    // if transportBehaviour has been deleted, throw an error
    if (!transportBehaviour) {
      throw new CustomError(
        404,
        TransportBehaviourErrorCode.TRANSPORT_BEHAVIOUR_NOT_FOUND
      );
    }

    return transportBehaviour;
  }

  async getTransportBehaviourById(props: GetTransportBehaviourByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the transportBehaviour by id and company
    const transportBehaviour = await TransportBehaviourModel.findOne({
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

    // If no transportBehaviour has been found, then throw an error
    if (!transportBehaviour) {
      throw new CustomError(
        404,
        TransportBehaviourErrorCode.TRANSPORT_BEHAVIOUR_NOT_FOUND
      );
    }

    return transportBehaviour;
  }

  async getTransportBehaviours(props: GetTransportBehavioursProps) {
    // Props
    const { page, pageSize, sort, where, company } = props;

    const { offset, limit } = getPagingParams(page, pageSize);
    const order = getSortingParams(sort);
    const filters = getFilters(where);

    // Count total transportBehaviours in the given company
    const count = await TransportBehaviourModel.count({
      where: {
        company,
        ...filters,
      },
    });

    // Find all transportBehaviours for matching props and company
    const data = await TransportBehaviourModel.findAll({
      offset,
      limit,
      order,
      where: {
        company,
        ...filters,
      },
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

    // TODO: Clean up getPagingData function
    const response = getPagingData({ count, rows: data }, page, limit);

    return response;
  }
}

export default new TransportBehaviourService();
