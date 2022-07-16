import { omit as _omit } from "lodash";

import ServiceDeliveryModel from "./serviceDelivery.model";
import {
  CreateServiceDeliveryProps,
  UpdateServiceDeliveryProps,
  DeleteServiceDeliveryProps,
  GetServiceDeliveryByIdProps,
  GetServiceDeliveriesProps,
} from "./serviceDelivery.types";
import { CustomError } from "../../components/errors";
import ServiceDeliveryErrorCode from "./serviceDelivery.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { StaffProfileModel } from "../staffProfile";
import { ClientProfileModel } from "../clientProfile";
import { addCientFiltersByTeams, getFilters } from "../../components/filters";

class ServiceDeliveryService {
  async createServiceDelivery(props: CreateServiceDeliveryProps) {
    const serviceDelivery = await ServiceDeliveryModel.create(props);
    return serviceDelivery;
  }

  async updateServiceDelivery(props: UpdateServiceDeliveryProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find serviceDelivery by id and company
    const serviceDelivery = await ServiceDeliveryModel.findOne({
      where: { id, company },
    });

    // if serviceDelivery not found, throw an error
    if (!serviceDelivery) {
      throw new CustomError(
        404,
        ServiceDeliveryErrorCode.SERVICE_DELIVERY_NOT_FOUND
      );
    }

    // Finally, update the serviceDelivery
    const [, [updatedServiceDelivery]] = await ServiceDeliveryModel.update(
      updateProps,
      {
        where: { id, company },
        returning: true,
      }
    );
    return updatedServiceDelivery;
  }

  async deleteServiceDelivery(props: DeleteServiceDeliveryProps) {
    // Props
    const { id, company } = props;

    // Find and delete the serviceDelivery by id and company
    const serviceDelivery = await ServiceDeliveryModel.destroy({
      where: { id, company },
    });

    // if serviceDelivery has been deleted, throw an error
    if (!serviceDelivery) {
      throw new CustomError(
        404,
        ServiceDeliveryErrorCode.SERVICE_DELIVERY_NOT_FOUND
      );
    }

    return serviceDelivery;
  }

  async getServiceDeliveryById(props: GetServiceDeliveryByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the serviceDelivery by id and company
    const serviceDelivery = await ServiceDeliveryModel.findOne({
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

    // If no serviceDelivery has been found, then throw an error
    if (!serviceDelivery) {
      throw new CustomError(
        404,
        ServiceDeliveryErrorCode.SERVICE_DELIVERY_NOT_FOUND
      );
    }

    return serviceDelivery;
  }

  async getServiceDeliveries(props: GetServiceDeliveriesProps, userId: string) {
    // Props
    const { page, pageSize, sort, where, company } = props;

    const { offset, limit } = getPagingParams(page, pageSize);
    const order = getSortingParams(sort);
    const filters = getFilters(where);

    const clientFilters = await addCientFiltersByTeams(userId, company);

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
          ...clientFilters,
        },
      },
    ];
    // Count total serviceDeliveries in the given company
    const count = await ServiceDeliveryModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
      include,
    });

    // Find all serviceDeliveries for matching props and company
    const data = await ServiceDeliveryModel.findAll({
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

export default new ServiceDeliveryService();
