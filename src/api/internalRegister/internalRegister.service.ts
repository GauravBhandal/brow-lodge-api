import { omit as _omit } from "lodash";

import InternalRegisterModel from "./internalRegister.model";
import {
  CreateInternalRegisterProps,
  UpdateInternalRegisterProps,
  DeleteInternalRegisterProps,
  GetInternalRegisterByIdProps,
  GetInternalRegistersProps,
} from "./internalRegister.types";
import { CustomError } from "../../components/errors";
import InternalRegisterErrorCode from "./internalRegister.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { getFilters } from "../../components/filters";
import { internalRegisterAttachmentService } from "./internalRegisterAttachment";
import { AttachmentModel } from "../attachment";

class InternalRegisterService {
  async createInternalRegister(props: CreateInternalRegisterProps) {
    const internalRegister = await InternalRegisterModel.create(props);

    // Create attachments
    if (props.attachments && props.attachments.length) {
      await internalRegisterAttachmentService.createBulkInternalRegisterAttachment(
        {
          relation: internalRegister.id,
          attachments: props.attachments,
        }
      );
    }
    return internalRegister;
  }

  async updateInternalRegister(props: UpdateInternalRegisterProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find internalRegister by id and company
    const internalRegister = await InternalRegisterModel.findOne({
      where: { id, company },
    });

    // if internalRegister not found, throw an error
    if (!internalRegister) {
      throw new CustomError(
        404,
        InternalRegisterErrorCode.INTERNAL_REGISTER_NOT_FOUND
      );
    }

    // Finally, update the internalRegister
    const [, [updatedInternalRegister]] = await InternalRegisterModel.update(
      updateProps,
      {
        where: { id, company },
        returning: true,
      }
    );

    // Update attachments
    if (props.attachments) {
      await internalRegisterAttachmentService.updateBulkInternalRegisterAttachment(
        {
          relation: internalRegister.id,
          attachments: props.attachments,
        }
      );
    }

    return updatedInternalRegister;
  }

  async deleteArchiveInternalRegister(props: DeleteInternalRegisterProps) {
    // Props
    const { id, company } = props;

    // Find and delete the internalRegister by id and company
    const internalRegister = await InternalRegisterModel.findOne({
      where: { id, company },
    });

    // if internalRegister has been deleted, throw an error
    if (!internalRegister) {
      throw new CustomError(
        404,
        InternalRegisterErrorCode.INTERNAL_REGISTER_NOT_FOUND
      );
    }

    if (internalRegister.archived) {
      // Check if internalRegister already exists
      const existingInternalRegister = await InternalRegisterModel.findAll({
        where: {
          name: internalRegister.name,
          version: internalRegister.version,
          company: internalRegister.company,
          archived: false,
        },
      });

      if (existingInternalRegister.length > 0) {
        throw new CustomError(
          409,
          InternalRegisterErrorCode.INTERNAL_REGISTER_ALREADY_EXISTS
        );
      }
    }

    // Finally, update the internalRegister update the Archive state
    const [, [updatedInternalRegister]] = await InternalRegisterModel.update(
      { archived: !internalRegister.archived },
      {
        where: { id, company },
        returning: true,
      }
    );

    return updatedInternalRegister;
  }

  async deleteInternalRegister(props: DeleteInternalRegisterProps) {
    // Props
    const { id, company } = props;

    // Find and delete the internalRegister by id and company
    const internalRegister = await InternalRegisterModel.destroy({
      where: { id, company },
    });

    // if internalRegister has been deleted, throw an error
    if (!internalRegister) {
      throw new CustomError(
        404,
        InternalRegisterErrorCode.INTERNAL_REGISTER_NOT_FOUND
      );
    }

    return internalRegister;
  }

  async getInternalRegisterById(props: GetInternalRegisterByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the internalRegister by id and company
    const internalRegister = await InternalRegisterModel.findOne({
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

    // If no internalRegister has been found, then throw an error
    if (!internalRegister) {
      throw new CustomError(
        404,
        InternalRegisterErrorCode.INTERNAL_REGISTER_NOT_FOUND
      );
    }

    return internalRegister;
  }

  async getInternalRegisters(props: GetInternalRegistersProps, userId: string) {
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

    // Count total internalRegisters in the given company
    const count = await InternalRegisterModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
      include,
    });

    // Find all internalRegisters for matching props and company
    const data = await InternalRegisterModel.findAll({
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

export default new InternalRegisterService();
