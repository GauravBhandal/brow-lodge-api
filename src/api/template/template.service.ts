import { omit as _omit } from "lodash";

import TemplateModel from "./template.model";
import {
  CreateTemplateProps,
  UpdateTemplateProps,
  DeleteTemplateProps,
  GetTemplateByIdProps,
  GetTemplatesProps,
} from "./template.types";
import { CustomError } from "../../components/errors";
import TemplateErrorCode from "./template.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { getFilters } from "../../components/filters";
import { templateAttachmentService } from "./templateAttachment";
import { AttachmentModel } from "../attachment";

class TemplateService {
  async createTemplate(props: CreateTemplateProps) {
    const template = await TemplateModel.create(props);

    // Create attachments
    if (props.attachments && props.attachments.length) {
      await templateAttachmentService.createBulkTemplateAttachment({
        relation: template.id,
        attachments: props.attachments,
      });
    }
    return template;
  }

  async updateTemplate(props: UpdateTemplateProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find template by id and company
    const template = await TemplateModel.findOne({
      where: { id, company },
    });

    // if template not found, throw an error
    if (!template) {
      throw new CustomError(404, TemplateErrorCode.TEMPLATE_NOT_FOUND);
    }

    // Finally, update the template
    const [, [updatedTemplate]] = await TemplateModel.update(updateProps, {
      where: { id, company },
      returning: true,
    });

    // Update attachments
    if (props.attachments) {
      await templateAttachmentService.updateBulkTemplateAttachment({
        relation: template.id,
        attachments: props.attachments,
      });
    }

    return updatedTemplate;
  }

  async deleteTemplate(props: DeleteTemplateProps) {
    // Props
    const { id, company } = props;

    // Find and delete the template by id and company
    const template = await TemplateModel.destroy({
      where: { id, company },
    });

    // if template has been deleted, throw an error
    if (!template) {
      throw new CustomError(404, TemplateErrorCode.TEMPLATE_NOT_FOUND);
    }

    return template;
  }

  async getTemplateById(props: GetTemplateByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the template by id and company
    const template = await TemplateModel.findOne({
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

    // If no template has been found, then throw an error
    if (!template) {
      throw new CustomError(404, TemplateErrorCode.TEMPLATE_NOT_FOUND);
    }

    return template;
  }

  async getTemplates(props: GetTemplatesProps, userId: string) {
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

    // Count total templates in the given company
    const count = await TemplateModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
      include,
    });

    // Find all templates for matching props and company
    const data = await TemplateModel.findAll({
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

export default new TemplateService();
