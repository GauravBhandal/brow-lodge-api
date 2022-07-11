import { omit as _omit } from "lodash";

import ParticipantExpenseModel from "./participantExpense.model";
import {
  CreateParticipantExpenseProps,
  UpdateParticipantExpenseProps,
  DeleteParticipantExpenseProps,
  GetParticipantExpenseByIdProps,
  GetParticipantExpensesProps,
} from "./participantExpense.types";
import { CustomError } from "../../components/errors";
import ParticipantExpenseErrorCode from "./participantExpense.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { StaffProfileModel } from "../staffProfile";
import { ClientProfileModel } from "../clientProfile";
import { addCientFiltersByTeams, getFilters } from "../../components/filters";
import { participantExpenseAttachmentService } from "./participantExpenseAttachment";
import { AttachmentModel } from "../attachment";

class ParticipantExpenseService {
  async createParticipantExpense(props: CreateParticipantExpenseProps) {
    const participantExpense = await ParticipantExpenseModel.create(props);

    // Create attachments
    if (props.attachments && props.attachments.length) {
      await participantExpenseAttachmentService.createBulkParticipantExpenseAttachment({
        relation: participantExpense.id,
        attachments: props.attachments,
      });
    }
    return participantExpense;
  }

  async updateParticipantExpense(props: UpdateParticipantExpenseProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find participantExpense by id and company
    const participantExpense = await ParticipantExpenseModel.findOne({
      where: { id, company },
    });

    // if participantExpense not found, throw an error
    if (!participantExpense) {
      throw new CustomError(404, ParticipantExpenseErrorCode.PARTICIPANT_EXPENSE);
    }

    // Finally, update the participantExpense
    const [, [updatedParticipantExpense]] = await ParticipantExpenseModel.update(
      updateProps,
      {
        where: { id, company },
        returning: true,
      }
    );

    // Update attachments
    if (props.attachments) {
      await participantExpenseAttachmentService.updateBulkParticipantExpenseAttachment({
        relation: participantExpense.id,
        attachments: props.attachments,
      });
    }

    return updatedParticipantExpense;
  }

  async deleteParticipantExpense(props: DeleteParticipantExpenseProps) {
    // Props
    const { id, company } = props;

    // Find and delete the participantExpense by id and company
    const participantExpense = await ParticipantExpenseModel.destroy({
      where: { id, company },
    });

    // if participantExpense has been deleted, throw an error
    if (!participantExpense) {
      throw new CustomError(404, ParticipantExpenseErrorCode.PARTICIPANT_EXPENSE);
    }

    return participantExpense;
  }

  async getParticipantExpenseById(props: GetParticipantExpenseByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the participantExpense by id and company
    const participantExpense = await ParticipantExpenseModel.findOne({
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
        },
      ],
    });

    // If no participantExpense has been found, then throw an error
    if (!participantExpense) {
      throw new CustomError(404, ParticipantExpenseErrorCode.PARTICIPANT_EXPENSE);
    }

    return participantExpense;
  }

  async getParticipantExpenses(props: GetParticipantExpensesProps, userId: string) {
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

    // Count total participantExpenses in the given company
    const count = await ParticipantExpenseModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
      include,
    });

    // Find all participantExpenses for matching props and company
    const data = await ParticipantExpenseModel.findAll({
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

export default new ParticipantExpenseService();
