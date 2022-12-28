import { omit as _omit } from "lodash";
import { Op } from "sequelize";

import LegislationRegisterModel from "./legislationRegister.model";
import {
  CreateLegislationRegisterProps,
  UpdateLegislationRegisterProps,
  DeleteLegislationRegisterProps,
  GetLegislationRegisterByIdProps,
  GetLegislationRegistersProps,
} from "./legislationRegister.types";
import { CustomError } from "../../components/errors";
import LegislationRegisterErrorCode from "./legislationRegister.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { getFilters } from "../../components/filters";
import { legislationRegisterAttachmetService } from "./legislationRegisterAttachment";
import { AttachmentModel } from "../attachment";

class LegislationRegisterService {
  async createLegislationRegister(props: CreateLegislationRegisterProps) {
    // Otherwise, create a new legislationRegister
    const legislationRegister = await LegislationRegisterModel.create(props);

    // Create attachments
    if (props.attachments && props.attachments.length) {
      await legislationRegisterAttachmetService.createBulkLegislationRegisterAttachment(
        {
          relation: legislationRegister.id,
          attachments: props.attachments,
        }
      );
    }

    return legislationRegister;
  }

  async updateLegislationRegister(props: UpdateLegislationRegisterProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find legislationRegister by id and company
    const legislationRegister = await LegislationRegisterModel.findOne({
      where: { id, company },
    });

    // if legislationRegister not found, throw an error
    if (!legislationRegister) {
      throw new CustomError(
        404,
        LegislationRegisterErrorCode.LEGISLATION_REGISTER_NOT_FOUND
      );
    }

    // Finally, update the legislationRegister
    const [, [updatedLegislationRegister]] =
      await LegislationRegisterModel.update(updateProps, {
        where: { id, company },
        returning: true,
      });
    // Update attachments
    if (props.attachments) {
      await legislationRegisterAttachmetService.updateBulkLegislationRegisterAttachment(
        {
          relation: legislationRegister.id,
          attachments: props.attachments,
        }
      );
    }

    return updatedLegislationRegister;
  }

  async deleteArchiveLegislationRegister(
    props: DeleteLegislationRegisterProps
  ) {
    // Props
    const { id, company } = props;

    // Find and delete the legislationRegister by id and company
    const legislationRegister = await LegislationRegisterModel.findOne({
      where: { id, company },
    });

    // if legislationRegister has been deleted, throw an error
    if (!legislationRegister) {
      throw new CustomError(
        404,
        LegislationRegisterErrorCode.LEGISLATION_REGISTER_NOT_FOUND
      );
    }

    if (legislationRegister.archived) {
      // Check if legislationRegister already exists
      const existingLegislationRegister =
        await LegislationRegisterModel.findAll({
          where: {
            reviewedOn: legislationRegister.reviewedOn,
            domain: legislationRegister.domain,
            legislativeReference: legislationRegister.legislativeReference,
            documentReference: legislationRegister.documentReference,
            monitoringMechanism: legislationRegister.monitoringMechanism,
            company: legislationRegister.company,
            archived: false,
          },
        });

      if (existingLegislationRegister.length > 0) {
        throw new CustomError(
          409,
          LegislationRegisterErrorCode.LEGISLATION_REGISTER_ALREADY_EXISTS
        );
      }
    }

    // Finally, update the legislationRegister update the Archive state
    const [, [updatedLegislationRegister]] =
      await LegislationRegisterModel.update(
        { archived: !legislationRegister.archived },
        {
          where: { id, company },
          returning: true,
        }
      );

    return updatedLegislationRegister;
  }

  async deleteLegislationRegister(props: DeleteLegislationRegisterProps) {
    // Props
    const { id, company } = props;

    // Find and delete the legislationRegister by id and company
    const legislationRegister = await LegislationRegisterModel.destroy({
      where: { id, company },
    });

    // if legislationRegister has been deleted, throw an error
    if (!legislationRegister) {
      throw new CustomError(
        404,
        LegislationRegisterErrorCode.LEGISLATION_REGISTER_NOT_FOUND
      );
    }

    return legislationRegister;
  }

  async getLegislationRegisterById(props: GetLegislationRegisterByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the legislationRegister by id and company
    const legislationRegister = await LegislationRegisterModel.findOne({
      where: { id, company },
      include: [
        {
          model: CompanyModel,
        },
        {
          model: AttachmentModel,
          through: {
            attributes: [],
          },
        },
      ],
    });

    // If no legislationRegister has been found, then throw an error
    if (!legislationRegister) {
      throw new CustomError(
        404,
        LegislationRegisterErrorCode.LEGISLATION_REGISTER_NOT_FOUND
      );
    }

    return legislationRegister;
  }

  async getLegislationRegisters(props: GetLegislationRegistersProps) {
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

    // Count total legislationRegisters in the given company
    const count = await LegislationRegisterModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
      include,
    });

    // Find all legislationRegisters for matching props and company
    const data = await LegislationRegisterModel.findAll({
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

export default new LegislationRegisterService();
