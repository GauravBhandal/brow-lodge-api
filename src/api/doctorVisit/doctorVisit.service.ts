import { omit as _omit } from "lodash";

import DoctorVisitModel from "./doctorVisit.model";
import {
  CreateDoctorVisitProps,
  UpdateDoctorVisitProps,
  DeleteDoctorVisitProps,
  GetDoctorVisitByIdProps,
  GetDoctorVisitsProps,
} from "./doctorVisit.types";
import { CustomError } from "../../components/errors";
import DoctorVisitErrorCode from "./doctorVisit.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { StaffProfileModel } from "../staffProfile";
import { ClientProfileModel } from "../clientProfile";
import { getFilters } from "../../components/filters";

class DoctorVisitService {
  async createDoctorVisit(props: CreateDoctorVisitProps) {
    const doctorVisit = await DoctorVisitModel.create(props);
    return doctorVisit;
  }

  async updateDoctorVisit(props: UpdateDoctorVisitProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find doctorVisit by id and company
    const doctorVisit = await DoctorVisitModel.findOne({
      where: { id, company },
    });

    // if doctorVisit not found, throw an error
    if (!doctorVisit) {
      throw new CustomError(404, DoctorVisitErrorCode.DOCTOR_VISIT_NOT_FOUND);
    }

    // Finally, update the doctorVisit
    const [, [updatedDoctorVisit]] = await DoctorVisitModel.update(
      updateProps,
      {
        where: { id, company },
        returning: true,
      }
    );
    return updatedDoctorVisit;
  }

  async deleteDoctorVisit(props: DeleteDoctorVisitProps) {
    // Props
    const { id, company } = props;

    // Find and delete the doctorVisit by id and company
    const doctorVisit = await DoctorVisitModel.destroy({
      where: { id, company },
    });

    // if doctorVisit has been deleted, throw an error
    if (!doctorVisit) {
      throw new CustomError(404, DoctorVisitErrorCode.DOCTOR_VISIT_NOT_FOUND);
    }

    return doctorVisit;
  }

  async getDoctorVisitById(props: GetDoctorVisitByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the doctorVisit by id and company
    const doctorVisit = await DoctorVisitModel.findOne({
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

    // If no doctorVisit has been found, then throw an error
    if (!doctorVisit) {
      throw new CustomError(404, DoctorVisitErrorCode.DOCTOR_VISIT_NOT_FOUND);
    }

    return doctorVisit;
  }

  async getDoctorVisits(props: GetDoctorVisitsProps) {
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
        model: ClientProfileModel,
        as: "Client",
        where: {
          ...filters["Client"],
        },
      },
    ];

    // Count total doctorVisits in the given company
    const count = await DoctorVisitModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      include,
    });

    // Find all doctorVisits for matching props and company
    const data = await DoctorVisitModel.findAll({
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

export default new DoctorVisitService();
