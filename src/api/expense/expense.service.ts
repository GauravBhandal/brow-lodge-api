import { omit as _omit } from "lodash";

import ExpenseModel from "./expense.model";
import {
  CreateExpenseProps,
  UpdateExpenseProps,
  DeleteExpenseProps,
  GetExpenseByIdProps,
  GetExpensesProps,
} from "./expense.types";
import { CustomError } from "../../components/errors";
import ExpenseErrorCode from "./expense.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { StaffProfileModel } from "../staffProfile";
import { expenseAttachmentService } from "./expenseAttachment";
import { ClientProfileModel } from "../clientProfile";
import { addCientFiltersByTeams, getFilters } from "../../components/filters";
import { AttachmentModel } from "../attachment";

class ExpenseService {
  async createExpense(props: CreateExpenseProps) {
    const expense = await ExpenseModel.create(props);

    // Create attachments
    if (props.attachments && props.attachments.length) {
      await expenseAttachmentService.createBulkExpenseAttachment({
        relation: expense.id,
        attachments: props.attachments,
      });
    }
    return expense;
  }

  async updateExpense(props: UpdateExpenseProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find expense by id and company
    const expense = await ExpenseModel.findOne({
      where: { id, company },
    });

    // if expense not found, throw an error
    if (!expense) {
      throw new CustomError(
        404,
        ExpenseErrorCode.EXPENSE_NOT_FOUND
      );
    }

    // Finally, update the expense
    const [, [updatedExpense]] =
      await ExpenseModel.update(updateProps, {
        where: { id, company },
        returning: true,
      });

    // Update attachments
    if (props.attachments && props.attachments.length) {
      await expenseAttachmentService.updateBulkExpenseAttachment({
        relation: expense.id,
        attachments: props.attachments,
      });
    }
    return updatedExpense;
  }

  async deleteExpense(props: DeleteExpenseProps) {
    // Props
    const { id, company } = props;

    // Find and delete the expense by id and company
    const expense = await ExpenseModel.destroy({
      where: { id, company },
    });

    // if expense has been deleted, throw an error
    if (!expense) {
      throw new CustomError(
        404,
        ExpenseErrorCode.EXPENSE_NOT_FOUND
      );
    }

    return expense;
  }

  async getExpenseById(props: GetExpenseByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the expense by id and company
    const expense = await ExpenseModel.findOne({
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
        {
          model: ClientProfileModel,
          as: "Client",
          required: false,
        },
      ],
    });

    // If no expense has been found, then throw an error
    if (!expense) {
      throw new CustomError(
        404,
        ExpenseErrorCode.EXPENSE_NOT_FOUND
      );
    }

    return expense;
  }

  async getExpenses(props: GetExpensesProps, userId: string) {
    // Props
    const { page, pageSize, sort, where, company } = props;

    const { offset, limit } = getPagingParams(page, pageSize);
    const order = getSortingParams(sort);
    const filters = getFilters(where);
    const clientFilters = await addCientFiltersByTeams(userId, company);
  

     // func to check for optional clients that to apply team permissions or not
     const checkClientPermissions = () => {
      if (Object.keys(clientFilters).length !== 0) {
        return { right: true };
      }
    };

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
          ...clientFilters,
        },
        required: false,
        ...checkClientPermissions(),
      },
    ];

    // Count total expenses in the given company
    const count = await ExpenseModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
      include,
    });

    // Find all expenses for matching props and company
    const data = await ExpenseModel.findAll({
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

export default new ExpenseService();
