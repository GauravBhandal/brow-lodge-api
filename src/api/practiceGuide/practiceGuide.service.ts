import { omit as _omit } from "lodash";

import PracticeGuideModel from "./practiceGuide.model";
import {
  CreatePracticeGuideProps,
  UpdatePracticeGuideProps,
  DeletePracticeGuideProps,
  GetPracticeGuideByIdProps,
  GetPracticeGuidesProps,
} from "./practiceGuide.types";
import { CustomError } from "../../components/errors";
import PracticeGuideErrorCode from "./practiceGuide.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { getFilters } from "../../components/filters";
import { practiceGuideAttachmentService } from "./practiceGuideAttachment";
import { AttachmentModel } from "../attachment";
import { version } from "joi";

class PracticeGuideService {
  async createPracticeGuide(props: CreatePracticeGuideProps) {
    const { name, version, company } = props;

    // Check if document already exists
    const existingPractice = await PracticeGuideModel.findOne({
      where: { name, version, company, archived: false },
    });

    // If already exists, throw an error
    if (existingPractice) {
      throw new CustomError(
        409,
        PracticeGuideErrorCode.PRACTICE_GUIDE_ALREADY_EXISTS
      );
    }

    const practiceGuide = await PracticeGuideModel.create(props);

    // Create attachments
    if (props.attachments && props.attachments.length) {
      await practiceGuideAttachmentService.createBulkPracticeGuideAttachment({
        relation: practiceGuide.id,
        attachments: props.attachments,
      });
    }
    return practiceGuide;
  }

  async updatePracticeGuide(props: UpdatePracticeGuideProps) {
    // Props
    const { name, version, id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find practiceGuide by id and company
    const practiceGuide = await PracticeGuideModel.findOne({
      where: { id, company },
    });

    // if practiceGuide not found, throw an error
    if (!practiceGuide) {
      throw new CustomError(
        404,
        PracticeGuideErrorCode.PRACTICE_GUIDE_NOT_FOUND
      );
    }

    if (
      practiceGuide.name != name ||
      practiceGuide.version != version ||
      practiceGuide.company != company
    ) {
      // Check if document already exists
      const existingPractice = await PracticeGuideModel.findOne({
        where: { name, version, company, archived: false },
      });

      // If already exists, throw an error
      if (existingPractice && existingPractice.id !== id) {
        throw new CustomError(
          409,
          PracticeGuideErrorCode.PRACTICE_GUIDE_ALREADY_EXISTS
        );
      }
    }

    // Finally, update the practiceGuide
    const [, [updatedPracticeGuide]] = await PracticeGuideModel.update(
      updateProps,
      {
        where: { id, company },
        returning: true,
      }
    );

    // Update attachments
    if (props.attachments) {
      await practiceGuideAttachmentService.updateBulkPracticeGuideAttachment({
        relation: practiceGuide.id,
        attachments: props.attachments,
      });
    }

    return updatedPracticeGuide;
  }

  async deletePracticeGuide(props: DeletePracticeGuideProps) {
    // Props
    const { id, company } = props;

    // Find and delete the practiceGuide by id and company
    const practiceGuide = await PracticeGuideModel.findOne({
      where: { id, company },
    });

    // if practiceGuide has been deleted, throw an error
    if (!practiceGuide) {
      throw new CustomError(
        404,
        PracticeGuideErrorCode.PRACTICE_GUIDE_NOT_FOUND
      );
    }

    if (practiceGuide.archived) {
      // Check if document already exists
      const existingPractice = await PracticeGuideModel.findAll({
        where: {
          name: practiceGuide.name,
          version: practiceGuide.version,
          company: practiceGuide.company,
          archived: false,
        },
      });

      if (existingPractice.length > 0) {
        throw new CustomError(
          409,
          PracticeGuideErrorCode.PRACTICE_GUIDE_ALREADY_EXISTS
        );
      }
    }

    // Finally, update the practiceGuide update the Archive state
    const [, [updatedPracticeGuide]] = await PracticeGuideModel.update(
      { archived: !practiceGuide.archived },
      {
        where: { id, company },
        returning: true,
      }
    );

    return updatedPracticeGuide;
  }

  async deleteArchivePracticeGuide(props: DeletePracticeGuideProps) {
    // Props
    const { id, company } = props;

    // Find and delete the practiceGuide by id and company
    const practiceGuide = await PracticeGuideModel.destroy({
      where: { id, company },
    });

    // if practiceGuide has been deleted, throw an error
    if (!practiceGuide) {
      throw new CustomError(
        404,
        PracticeGuideErrorCode.PRACTICE_GUIDE_NOT_FOUND
      );
    }

    return practiceGuide;
  }

  async getPracticeGuideById(props: GetPracticeGuideByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the practiceGuide by id and company
    const practiceGuide = await PracticeGuideModel.findOne({
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
      ],
    });

    // If no practiceGuide has been found, then throw an error
    if (!practiceGuide) {
      throw new CustomError(
        404,
        PracticeGuideErrorCode.PRACTICE_GUIDE_NOT_FOUND
      );
    }

    return practiceGuide;
  }

  async getPracticeGuides(props: GetPracticeGuidesProps, userId: string) {
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

    // Count total practiceGuides in the given company
    const count = await PracticeGuideModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
      include,
    });

    // Find all practiceGuides for matching props and company
    const data = await PracticeGuideModel.findAll({
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

export default new PracticeGuideService();
