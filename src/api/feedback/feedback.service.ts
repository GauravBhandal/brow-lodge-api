import { omit as _omit } from "lodash";

import FeedbackModel from "./feedback.model";
import {
  CreateFeedbackProps,
  UpdateFeedbackProps,
  DeleteFeedbackProps,
  GetFeedbackByIdProps,
  GetFeedbacksProps,
} from "./feedback.types";
import { CustomError } from "../../components/errors";
import FeedbackErrorCode from "./feedback.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { StaffProfileModel } from "../staffProfile";

import { getFilters } from "../../components/filters";
import { feedbackAttachmentService } from "./feedbackAttachment";
import { AttachmentModel } from "../attachment";

class FeedbackService {
  async createFeedback(props: CreateFeedbackProps) {
    const feedback = await FeedbackModel.create(props);
    // Create attachments
    if (props.attachments && props.attachments.length) {
      await feedbackAttachmentService.createBulkFeedbackAttachment({
        relation: feedback.id,
        attachments: props.attachments,
      });
    }
    return feedback;
  }

  async updateFeedback(props: UpdateFeedbackProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find feedback by id and company
    const feedback = await FeedbackModel.findOne({
      where: { id, company },
    });

    // if feedback not found, throw an error
    if (!feedback) {
      throw new CustomError(404, FeedbackErrorCode.FEEDBACK_NOT_FOUND);
    }

    // Finally, update the feedback
    const [, [updatedFeedback]] = await FeedbackModel.update(updateProps, {
      where: { id, company },
      returning: true,
    });
    // Update attachments
    if (props.attachments) {
      await feedbackAttachmentService.updateBulkFeedbackAttachment({
        relation: feedback.id,
        attachments: props.attachments,
      });
    }
    return updatedFeedback;
  }

  async deleteArchiveFeedback(props: DeleteFeedbackProps) {
    // Props
    const { id, company } = props;

    // Find and delete the feedback by id and company
    const feedback = await FeedbackModel.findOne({
      where: { id, company },
    });

    // if feedback has been deleted, throw an error
    if (!feedback) {
      throw new CustomError(404, FeedbackErrorCode.FEEDBACK_NOT_FOUND);
    }

    // Finally, update the feedback update the Archive state
    const [, [updatedFeedback]] = await FeedbackModel.update(
      { archived: !feedback.archived },
      {
        where: { id, company },
        returning: true,
      }
    );

    return updatedFeedback;
  }

  async deleteFeedback(props: DeleteFeedbackProps) {
    // Props
    const { id, company } = props;

    // Find and delete the feedback by id and company
    const feedback = await FeedbackModel.destroy({
      where: { id, company },
    });

    // if feedback has been deleted, throw an error
    if (!feedback) {
      throw new CustomError(404, FeedbackErrorCode.FEEDBACK_NOT_FOUND);
    }

    return feedback;
  }

  async getFeedbackById(props: GetFeedbackByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the feedback by id and company
    const feedback = await FeedbackModel.findOne({
      where: { id, company },
      include: [
        {
          model: CompanyModel,
        },
        {
          model: StaffProfileModel,
          as: "Staff",
          required: false,
        },
        {
          model: AttachmentModel,
          through: {
            attributes: [],
          },
        },
      ],
    });

    // If no feedback has been found, then throw an error
    if (!feedback) {
      throw new CustomError(404, FeedbackErrorCode.FEEDBACK_NOT_FOUND);
    }

    return feedback;
  }

  async getFeedbacks(props: GetFeedbacksProps) {
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
        required: false,
      },
    ];

    // Count total feedbacks in the given company
    const count = await FeedbackModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
      include,
    });

    // Find all feedbacks for matching props and company
    const data = await FeedbackModel.findAll({
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

export default new FeedbackService();
