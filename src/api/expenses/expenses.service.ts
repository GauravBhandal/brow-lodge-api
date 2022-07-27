import { omit as _omit } from "lodash";

import ExpensesModel from "./expenses.model";
import {
  CreateExpensesProps,
  UpdateExpensesProps,
  DeleteExpensesProps,
  GetExpensesByIdProps,
  GetExpensessProps,
} from "./expenses.types";
import { CustomError } from "../../components/errors";
import ExpensesErrorCode from "./expenses.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { StaffProfileModel } from "../staffProfile";
import { expensesAttachmentService } from "./expensesAttachment";
import { ClientProfileModel } from "../clientProfile";
import { addCientFiltersByTeams, getFilters } from "../../components/filters";

import { AttachmentModel } from "../attachment";

class ExpensesService {
  async createExpenses(props: CreateExpensesProps) {
    const expenses = await ExpensesModel.create(props);

    // Create attachments

    if (props.attachments && props.attachments.length) {
      await expensesAttachmentService.createBulkExpensesAttachment({
        relation: expenses.id,
        attachments: props.attachments,
      });
    }
    return expenses;
  }

  async updateExpenses(props: UpdateExpensesProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find expenses by id and company
    const expenses = await ExpensesModel.findOne({
      where: { id, company },
    });

    // if expenses not found, throw an error
    if (!expenses) {
      throw new CustomError(
        404,
        ExpensesErrorCode.EXPENSES_NOT_FOUND
      );
    }

    // Finally, update the expenses
    const [, [updatedExpenses]] =
      await ExpensesModel.update(updateProps, {
        where: { id, company },
        returning: true,
      });

    // Update attachments

    if (props.attachments && props.attachments.length) {
      await expensesAttachmentService.updateBulkExpensesAttachment({
        relation: expenses.id,
        attachments: props.attachments,
      });
    }
    return updatedExpenses;
  }

  async deleteExpenses(props: DeleteExpensesProps) {
    // Props
    const { id, company } = props;

    // Find and delete the expenses by id and company
    const expenses = await ExpensesModel.destroy({
      where: { id, company },
    });

    // if expenses has been deleted, throw an error
    if (!expenses) {
      throw new CustomError(
        404,
        ExpensesErrorCode.EXPENSES_NOT_FOUND
      );
    }

    return expenses;
  }

  async getExpensesById(props: GetExpensesByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the expenses by id and company
    const expenses = await ExpensesModel.findOne({
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

    // If no expenses has been found, then throw an error
    if (!expenses) {
      throw new CustomError(
        404,
        ExpensesErrorCode.EXPENSES_NOT_FOUND
      );
    }

    return expenses;
  }

  async getExpensess(props: GetExpensessProps, userId: string) {
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

    // Count total expensess in the given company
    const count = await ExpensesModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
      include,
    });

    // Find all expensess for matching props and company
    const data = await ExpensesModel.findAll({
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

export default new ExpensesService();
