import { omit as _omit } from "lodash";
import { Op } from "sequelize";

import RestrictivePracticeRegisterModel from "./restrictivePracticeRegister.model";
import {
  CreateRestrictivePracticeRegisterProps,
  UpdateRestrictivePracticeRegisterProps,
  DeleteRestrictivePracticeRegisterProps,
  GetRestrictivePracticeRegisterByIdProps,
  GetRestrictivePracticeRegistersProps,
} from "./restrictivePracticeRegister.types";
import { CustomError } from "../../components/errors";
import RestrictivePracticeRegisterErrorCode from "./restrictivePracticeRegister.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { ClientProfileModel } from "../clientProfile";

import { addCientFiltersByTeams, getFilters } from "../../components/filters";

class RestrictivePracticeRegisterService {
  async createRestrictivePracticeRegister(
    props: CreateRestrictivePracticeRegisterProps
  ) {
    const restrictivePracticeRegister =
      await RestrictivePracticeRegisterModel.create(props);
    return restrictivePracticeRegister;
  }

  async updateRestrictivePracticeRegister(
    props: UpdateRestrictivePracticeRegisterProps
  ) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find restrictivePracticeRegister by id and company
    const restrictivePracticeRegister =
      await RestrictivePracticeRegisterModel.findOne({
        where: { id, company },
      });

    // if restrictivePracticeRegister not found, throw an error
    if (!restrictivePracticeRegister) {
      throw new CustomError(
        404,
        RestrictivePracticeRegisterErrorCode.RESTRICTIVE_PRACTICE_REGISTER_NOT_FOUND
      );
    }

    // Finally, update the restrictivePracticeRegister
    const [, [updatedRestrictivePracticeRegister]] =
      await RestrictivePracticeRegisterModel.update(updateProps, {
        where: { id, company },
        returning: true,
      });
    return updatedRestrictivePracticeRegister;
  }

  async deleteArchiveRestrictivePracticeRegister(
    props: DeleteRestrictivePracticeRegisterProps
  ) {
    // Props
    const { id, company } = props;

    // Find and delete the restrictivePracticeRegister by id and company
    const restrictivePracticeRegister =
      await RestrictivePracticeRegisterModel.findOne({
        where: { id, company },
      });

    // if restrictivePracticeRegister has been deleted, throw an error
    if (!restrictivePracticeRegister) {
      throw new CustomError(
        404,
        RestrictivePracticeRegisterErrorCode.RESTRICTIVE_PRACTICE_REGISTER_NOT_FOUND
      );
    }

    if (restrictivePracticeRegister.archived) {
      // Check if restrictivePracticeRegister already exists
      const existingRestrictivePracticeRegister =
        await RestrictivePracticeRegisterModel.findAll({
          where: {
            startDate: restrictivePracticeRegister.startDate,
            startTime: restrictivePracticeRegister.startTime,
            typeOfRestrictivePractice:
              restrictivePracticeRegister.typeOfRestrictivePractice,
            administrationType: restrictivePracticeRegister.administrationType,
            client: restrictivePracticeRegister.client,
            isAuthorised: restrictivePracticeRegister.isAuthorised,
            description: restrictivePracticeRegister.description,
            behaviourOfConcerns:
              restrictivePracticeRegister.behaviourOfConcerns,
            reportingFrequency: restrictivePracticeRegister.reportingFrequency,
            company: restrictivePracticeRegister.company,
            archived: false,
          },
        });

      if (existingRestrictivePracticeRegister.length > 0) {
        throw new CustomError(
          409,
          RestrictivePracticeRegisterErrorCode.RESTRICTIVE_PRACTICE_REGISTER_ALREADY_EXISTS
        );
      }
    }

    // Finally, update the restrictivePracticeRegister update the Archive state
    const [, [updatedRestrictivePracticeRegister]] =
      await RestrictivePracticeRegisterModel.update(
        { archived: !restrictivePracticeRegister.archived },
        {
          where: { id, company },
          returning: true,
        }
      );

    return updatedRestrictivePracticeRegister;
  }

  async deleteRestrictivePracticeRegister(
    props: DeleteRestrictivePracticeRegisterProps
  ) {
    // Props
    const { id, company } = props;

    // Find and delete the restrictivePracticeRegister by id and company
    const restrictivePracticeRegister =
      await RestrictivePracticeRegisterModel.destroy({
        where: { id, company },
      });

    // if restrictivePracticeRegister has been deleted, throw an error
    if (!restrictivePracticeRegister) {
      throw new CustomError(
        404,
        RestrictivePracticeRegisterErrorCode.RESTRICTIVE_PRACTICE_REGISTER_NOT_FOUND
      );
    }

    return restrictivePracticeRegister;
  }

  async getRestrictivePracticeRegisterById(
    props: GetRestrictivePracticeRegisterByIdProps
  ) {
    // Props
    const { id, company } = props;

    // Find  the restrictivePracticeRegister by id and company
    const restrictivePracticeRegister =
      await RestrictivePracticeRegisterModel.findOne({
        where: { id, company },
        include: [
          {
            model: CompanyModel,
          },
          {
            model: ClientProfileModel,
            as: "Client",
          },
        ],
      });

    // If no restrictivePracticeRegister has been found, then throw an error
    if (!restrictivePracticeRegister) {
      throw new CustomError(
        404,
        RestrictivePracticeRegisterErrorCode.RESTRICTIVE_PRACTICE_REGISTER_NOT_FOUND
      );
    }

    return restrictivePracticeRegister;
  }

  async getRestrictivePracticeRegisters(
    props: GetRestrictivePracticeRegistersProps,
    userId: string
  ) {
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
        model: ClientProfileModel,
        as: "Client",
        where: {
          [Op.and]: [{ ...filters["Client"] }, { ...clientFilters }],
        },
      },
    ];
    // Count total restrictivePracticeRegisters in the given company
    const count = await RestrictivePracticeRegisterModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
      include,
    });

    // Find all restrictivePracticeRegisters for matching props and company
    const data = await RestrictivePracticeRegisterModel.findAll({
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

export default new RestrictivePracticeRegisterService();
