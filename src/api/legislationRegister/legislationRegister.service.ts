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

class LegislationRegisterService {
  async createLegislationRegister(props: CreateLegislationRegisterProps) {
    // Otherwise, create a new legislationRegister
    const legislationRegister = await LegislationRegisterModel.create(props);

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