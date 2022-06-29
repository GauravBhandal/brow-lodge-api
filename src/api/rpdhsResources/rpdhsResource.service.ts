import { omit as _omit } from "lodash";

import RpdhsResourceModel from "./rpdhsResource.model";
import {
  CreateRpdhsResourceProps,
  UpdateRpdhsResourceProps,
  DeleteRpdhsResourceProps,
  GetRpdhsResourceByIdProps,
  GetRpdhsResourcesProps,
} from "./rpdhsResource.types";
import { CustomError } from "../../components/errors";
import RpdhsResourceErrorCode from "./rpdhsResource.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { getFilters } from "../../components/filters";
import { rpdhsResourceAttachmentService } from "./rpdhsResourceAttachment";
import { AttachmentModel } from "../attachment";

class RpdhsResourceService {
  async createRpdhsResource(props: CreateRpdhsResourceProps) {
    const rpdhsResource = await RpdhsResourceModel.create(props);

    // Create attachments
    if (props.attachments && props.attachments.length) {
      await rpdhsResourceAttachmentService.createBulkRpdhsResourceAttachment({
        relation: rpdhsResource.id,
        attachments: props.attachments,
      });
    }
    return rpdhsResource;
  }

  async updateRpdhsResource(props: UpdateRpdhsResourceProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find rpdhsResource by id and company
    const rpdhsResource = await RpdhsResourceModel.findOne({
      where: { id, company },
    });

    // if rpdhsResource not found, throw an error
    if (!rpdhsResource) {
      throw new CustomError(404, RpdhsResourceErrorCode.PROCESS_NOT_FOUND);
    }

    // Finally, update the rpdhsResource
    const [, [updatedRpdhsResource]] = await RpdhsResourceModel.update(
      updateProps,
      {
        where: { id, company },
        returning: true,
      }
    );

    // Update attachments
    if (props.attachments) {
      await rpdhsResourceAttachmentService.updateBulkRpdhsResourceAttachment({
        relation: rpdhsResource.id,
        attachments: props.attachments,
      });
    }

    return updatedRpdhsResource;
  }

  async deleteRpdhsResource(props: DeleteRpdhsResourceProps) {
    // Props
    const { id, company } = props;

    // Find and delete the rpdhsResource by id and company
    const rpdhsResource = await RpdhsResourceModel.destroy({
      where: { id, company },
    });

    // if rpdhsResource has been deleted, throw an error
    if (!rpdhsResource) {
      throw new CustomError(404, RpdhsResourceErrorCode.PROCESS_NOT_FOUND);
    }

    return rpdhsResource;
  }

  async getRpdhsResourceById(props: GetRpdhsResourceByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the rpdhsResource by id and company
    const rpdhsResource = await RpdhsResourceModel.findOne({
      where: { id, company },
      include: [
        {
          model: AttachmentModel,
          through: {
            attributes: [],
          },
        },
        {
          model: CompanyModel,
        },
      ],
    });

    // If no rpdhsResource has been found, then throw an error
    if (!rpdhsResource) {
      throw new CustomError(404, RpdhsResourceErrorCode.PROCESS_NOT_FOUND);
    }

    return rpdhsResource;
  }

  async getRpdhsResources(props: GetRpdhsResourcesProps, userId: string) {
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

    // Count total rpdhsResources in the given company
    const count = await RpdhsResourceModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
      include,
    });

    // Find all rpdhsResources for matching props and company
    const data = await RpdhsResourceModel.findAll({
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

export default new RpdhsResourceService();
