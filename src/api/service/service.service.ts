import { omit as _omit } from "lodash";
import { Op } from "sequelize";

import ServiceModel from "./service.model";
import {
  CreateServiceProps,
  UpdateServiceProps,
  DeleteServiceProps,
  GetServiceByIdProps,
  GetServicesProps,
} from "./service.types";
import { CustomError } from "../../components/errors";
import ServiceErrorCode from "./service.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { getFilters } from "../../components/filters";
import makeMoment from "../../components/moment";

class ServiceService {
  async createService(props: CreateServiceProps) {
    // Props
    const { company, code } = props;

    // Check if service with same code already exists
    const existingService = await ServiceModel.findOne({
      where: {
        company,
        code: {
          [Op.iLike]: `${code}`,
        },
      },
    });

    // If exists, then throw an error
    if (existingService) {
      throw new CustomError(409, ServiceErrorCode.SERVICE_ALREADY_EXISTS);
    }

    // Otherwise, create a new service
    const service = await ServiceModel.create(props);

    return service;
  }

  async updateService(props: UpdateServiceProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find service by id and company
    const service = await ServiceModel.findOne({
      where: { id, company },
    });

    // if service not found, throw an error
    if (!service) {
      throw new CustomError(404, ServiceErrorCode.SERVICE_NOT_FOUND);
    }

    if (service.code.toLowerCase() !== props.code.toLowerCase()) {
      // Check if service with same code already exists
      const existingService = await ServiceModel.findOne({
        where: {
          code: {
            [Op.iLike]: `${props.code}`,
          },
          company,
        },
      });

      // If exists, then throw an error
      if (existingService) {
        throw new CustomError(409, ServiceErrorCode.SERVICE_ALREADY_EXISTS);
      }
    }

    // Finally, update the service
    const [, [updatedService]] = await ServiceModel.update(updateProps, {
      where: { id, company },
      returning: true,
    });

    return updatedService;
  }

  async deleteService(props: DeleteServiceProps) {
    // Props
    const { id, company } = props;

    // Find and delete the service by id and company
    const service = await ServiceModel.destroy({
      where: { id, company },
    });

    // if service has been deleted, throw an error
    if (!service) {
      throw new CustomError(404, ServiceErrorCode.SERVICE_NOT_FOUND);
    }

    return service;
  }

  async getServiceById(props: GetServiceByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the service by id and company
    const service = await ServiceModel.findOne({
      where: { id, company },
      include: [
        {
          model: CompanyModel,
        },
      ],
    });

    // If no service has been found, then throw an error
    if (!service) {
      throw new CustomError(404, ServiceErrorCode.SERVICE_NOT_FOUND);
    }

    return service;
  }

  async getServices(props: GetServicesProps) {
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

    // Count total services in the given company
    const count = await ServiceModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
      include,
    });

    // Find all services for matching props and company
    const data = await ServiceModel.findAll({
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

  async getEffectiveService(props: GetServicesProps) {
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

    // Count total services in the given company
    const count = await ServiceModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
      include,
    });

    // Find all services for matching props and company
    const data = await ServiceModel.findAll({
      offset,
      limit,
      order,
      where: {
        company,
        ...filters["primaryFilters"],
        effectiveDate: {
          [Op.or]: {
            [Op.lte]: makeMoment().endOf("day").format(),
            [Op.eq]: null,
          },
        },
      },
      include,
    });

    const response = getPagingData({ count, rows: data }, page, limit);

    return response;
  }
}

export default new ServiceService();
