import { omit as _omit } from "lodash";

import ExpenseReimbursementModel from "./expenseReimbursement.model";
import {
  CreateExpenseReimbursementProps,
  UpdateExpenseReimbursementProps,
  DeleteExpenseReimbursementProps,
  GetExpenseReimbursementByIdProps,
  GetExpenseReimbursementsProps,
} from "./expenseReimbursement.types";
import { CustomError } from "../../components/errors";
import ExpenseReimbursementErrorCode from "./expenseReimbursement.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { StaffProfileModel } from "../staffProfile";
import { getFilters } from "../../components/filters";
import { expenseAttachmentService } from "./expenseAttachment";

import { AttachmentModel } from "../attachment";

class ExpenseReimbursementService {
  async createExpenseReimbursement(props: CreateExpenseReimbursementProps) {
    const expenseReimbursement = await ExpenseReimbursementModel.create(props);

    // Create attachments

    if (props.attachments && props.attachments.length) {
      await expenseAttachmentService.createBulkExpenseAttachment({
        relation: expenseReimbursement.id,
        attachments: props.attachments,
      });
    }
    return expenseReimbursement;
  }

  async updateExpenseReimbursement(props: UpdateExpenseReimbursementProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find expenseReimbursement by id and company
    const expenseReimbursement = await ExpenseReimbursementModel.findOne({
      where: { id, company },
    });

    // if expenseReimbursement not found, throw an error
    if (!expenseReimbursement) {
      throw new CustomError(
        404,
        ExpenseReimbursementErrorCode.EXPENSE_REIMBURSEMENT_NOT_FOUND
      );
    }

    // Finally, update the expenseReimbursement
    const [, [updatedExpenseReimbursement]] =
      await ExpenseReimbursementModel.update(updateProps, {
        where: { id, company },
        returning: true,
      });

    // Update attachments

    if (props.attachments && props.attachments.length) {
      await expenseAttachmentService.updateBulkExpenseAttachment({
        relation: expenseReimbursement.id,
        attachments: props.attachments,
      });
    }
    return updatedExpenseReimbursement;
  }

  async deleteExpenseReimbursement(props: DeleteExpenseReimbursementProps) {
    // Props
    const { id, company } = props;

    // Find and delete the expenseReimbursement by id and company
    const expenseReimbursement = await ExpenseReimbursementModel.destroy({
      where: { id, company },
    });

    // if expenseReimbursement has been deleted, throw an error
    if (!expenseReimbursement) {
      throw new CustomError(
        404,
        ExpenseReimbursementErrorCode.EXPENSE_REIMBURSEMENT_NOT_FOUND
      );
    }

    return expenseReimbursement;
  }

  async getExpenseReimbursementById(props: GetExpenseReimbursementByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the expenseReimbursement by id and company
    const expenseReimbursement = await ExpenseReimbursementModel.findOne({
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
        {
          model: StaffProfileModel,
          as: "Staff",
        },
      ],
    });

    // If no expenseReimbursement has been found, then throw an error
    if (!expenseReimbursement) {
      throw new CustomError(
        404,
        ExpenseReimbursementErrorCode.EXPENSE_REIMBURSEMENT_NOT_FOUND
      );
    }

    return expenseReimbursement;
  }

  async getExpenseReimbursements(props: GetExpenseReimbursementsProps) {
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

    // Count total expenseReimbursements in the given company
    const count = await ExpenseReimbursementModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
      include,
    });

    // Find all expenseReimbursements for matching props and company
    const data = await ExpenseReimbursementModel.findAll({
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

export default new ExpenseReimbursementService();
