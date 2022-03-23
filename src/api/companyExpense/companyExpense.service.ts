import { omit as _omit } from "lodash";

import CompanyExpenseModel from "./companyExpense.model";
import {
  CreateCompanyExpenseProps,
  UpdateCompanyExpenseProps,
  DeleteCompanyExpenseProps,
  GetCompanyExpenseByIdProps,
  GetCompanyExpensesProps,
} from "./companyExpense.types";
import { CustomError } from "../../components/errors";
import CompanyExpenseErrorCode from "./companyExpense.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { StaffProfileModel } from "../staffProfile";
import { getFilters } from "../../components/filters";
import { companyExpenseAttachmentService } from "./companyExpenseAttachment";
import { AttachmentModel } from "../attachment";

class CompanyExpenseService {
  async createCompanyExpense(props: CreateCompanyExpenseProps) {
    const companyExpense = await CompanyExpenseModel.create(props);

    // Create attachments
    if (props.attachments && props.attachments.length) {
      await companyExpenseAttachmentService.createBulkCompanyExpenseAttachment({
        relation: companyExpense.id,
        attachments: props.attachments,
      });
    }

    return companyExpense;
  }

  async updateCompanyExpense(props: UpdateCompanyExpenseProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find companyExpense by id and company
    const companyExpense = await CompanyExpenseModel.findOne({
      where: { id, company },
    });

    // if companyExpense not found, throw an error
    if (!companyExpense) {
      throw new CustomError(
        404,
        CompanyExpenseErrorCode.COMPANY_EXPENSE_NOT_FOUND
      );
    }

    // Finally, update the companyExpense
    const [, [updatedCompanyExpense]] = await CompanyExpenseModel.update(
      updateProps,
      {
        where: { id, company },
        returning: true,
      }
    );

    // Update attachments
    if (props.attachments) {
      await companyExpenseAttachmentService.updateBulkCompanyExpenseAttachment({
        relation: companyExpense.id,
        attachments: props.attachments,
      });
    }
    return updatedCompanyExpense;
  }

  async deleteCompanyExpense(props: DeleteCompanyExpenseProps) {
    // Props
    const { id, company } = props;

    // Find and delete the companyExpense by id and company
    const companyExpense = await CompanyExpenseModel.destroy({
      where: { id, company },
    });

    // if companyExpense has been deleted, throw an error
    if (!companyExpense) {
      throw new CustomError(
        404,
        CompanyExpenseErrorCode.COMPANY_EXPENSE_NOT_FOUND
      );
    }

    return companyExpense;
  }

  async getCompanyExpenseById(props: GetCompanyExpenseByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the companyExpense by id and company
    const companyExpense = await CompanyExpenseModel.findOne({
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
          through: {
            attributes: [],
          },
        },
      ],
    });

    // If no companyExpense has been found, then throw an error
    if (!companyExpense) {
      throw new CustomError(
        404,
        CompanyExpenseErrorCode.COMPANY_EXPENSE_NOT_FOUND
      );
    }

    return companyExpense;
  }

  async getCompanyExpenses(props: GetCompanyExpensesProps, userId: string) {
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
    ];
    // Count total companyExpenses in the given company
    const count = await CompanyExpenseModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
      include,
    });

    // Find all companyExpenses for matching props and company
    const data = await CompanyExpenseModel.findAll({
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

export default new CompanyExpenseService();
