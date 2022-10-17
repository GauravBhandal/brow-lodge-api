import { omit as _omit } from "lodash";

import MedicationRegisterModel from "./medicationRegister.model";
import {
  CreateMedicationRegisterProps,
  UpdateMedicationRegisterProps,
  DeleteMedicationRegisterProps,
  GetMedicationRegisterByIdProps,
  GetMedicationRegistersProps,
} from "./medicationRegister.types";
import { CustomError } from "../../components/errors";
import MedicationRegisterErrorCode from "./medicationRegister.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { ClientProfileModel } from "../clientProfile";
import { StaffProfileModel } from "../staffProfile";
import { addCientFiltersByTeams, getFilters } from "../../components/filters";

class MedicationRegisterService {
  async createMedicationRegister(props: CreateMedicationRegisterProps) {
    const medicationRegister = await MedicationRegisterModel.create(props);
    return medicationRegister;
  }

  async updateMedicationRegister(props: UpdateMedicationRegisterProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find medicationRegister by id and company
    const medicationRegister = await MedicationRegisterModel.findOne({
      where: { id, company },
    });

    // if medicationRegister not found, throw an error
    if (!medicationRegister) {
      throw new CustomError(
        404,
        MedicationRegisterErrorCode.MEDICATION_REGISTER_NOT_FOUND
      );
    }

    // Finally, update the medicationRegister
    const [, [updatedMedicationRegister]] =
      await MedicationRegisterModel.update(updateProps, {
        where: { id, company },
        returning: true,
      });
    return updatedMedicationRegister;
  }

  async deleteMedicationRegister(props: DeleteMedicationRegisterProps) {
    // Props
    const { id, company } = props;

    // Find and delete the medicationRegister by id and company
    const medicationRegister = await MedicationRegisterModel.destroy({
      where: { id, company },
    });

    // if medicationRegister has been deleted, throw an error
    if (!medicationRegister) {
      throw new CustomError(
        404,
        MedicationRegisterErrorCode.MEDICATION_REGISTER_NOT_FOUND
      );
    }

    return medicationRegister;
  }

  async getMedicationRegisterById(props: GetMedicationRegisterByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the medicationRegister by id and company
    const medicationRegister = await MedicationRegisterModel.findOne({
      where: { id, company },
      include: [
        {
          model: CompanyModel,
        },
        {
          model: ClientProfileModel,
          as: "Client",
        },
        {
          model: StaffProfileModel,
          as: "Staff",
        },
      ],
    });

    // If no medicationRegister has been found, then throw an error
    if (!medicationRegister) {
      throw new CustomError(
        404,
        MedicationRegisterErrorCode.MEDICATION_REGISTER_NOT_FOUND
      );
    }

    return medicationRegister;
  }

  async getMedicationRegisters(
    props: GetMedicationRegistersProps,
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
    // Count total medicationRegisters in the given company
    const count = await MedicationRegisterModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
      include,
    });

    // Find all medicationRegisters for matching props and company
    const data = await MedicationRegisterModel.findAll({
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

export default new MedicationRegisterService();
