import { omit as _omit } from "lodash";

import ResourceModel from "./resource.model";
import {
  CreateResourceProps,
  UpdateResourceProps,
  DeleteResourceProps,
  GetResourceByIdProps,
  GetResourcesProps,
} from "./resource.types";
import { CustomError } from "../../components/errors";
import ResourceErrorCode from "./resource.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { StaffProfileModel } from "../staffProfile";

import { getFilters } from "../../components/filters";
import { AttachmentModel } from "../attachment";

class ResourceService {
  async createResource(props: CreateResourceProps) {
    const resource = await ResourceModel.create(props);
    return resource;
  }

  async updateResource(props: UpdateResourceProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find resource by id and company
    const resource = await ResourceModel.findOne({
      where: { id, company },
    });

    // if resource not found, throw an error
    if (!resource) {
      throw new CustomError(404, ResourceErrorCode.RESOURCE_NOT_FOUND);
    }

    // Finally, update the resource
    const [, [updatedResource]] = await ResourceModel.update(updateProps, {
      where: { id, company },
      returning: true,
    });
    return updatedResource;
  }

  async deleteResource(props: DeleteResourceProps) {
    // Props
    const { id, company } = props;

    // Find and delete the resource by id and company
    const resource = await ResourceModel.destroy({
      where: { id, company },
    });

    // if resource has been deleted, throw an error
    if (!resource) {
      throw new CustomError(404, ResourceErrorCode.RESOURCE_NOT_FOUND);
    }

    return resource;
  }

  async getResourceById(props: GetResourceByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the resource by id and company
    const resource = await ResourceModel.findOne({
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
          model: AttachmentModel,
          as: "Attachment",
        },
      ],
    });

    // If no resource has been found, then throw an error
    if (!resource) {
      throw new CustomError(404, ResourceErrorCode.RESOURCE_NOT_FOUND);
    }

    return resource;
  }

  async getResources(props: GetResourcesProps) {
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
        model: AttachmentModel,
        as: "Attachment",
      },
    ];

    // Count total resources in the given company
    const count = await ResourceModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      include,
    });

    // Find all resources for matching props and company
    const data = await ResourceModel.findAll({
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

export default new ResourceService();
