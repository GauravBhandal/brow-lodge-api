import { omit as _omit } from "lodash";

import ProcessModel from "./process.model";
import {
  CreateProcessProps,
  UpdateProcessProps,
  DeleteProcessProps,
  GetProcessByIdProps,
  GetProcessesProps,
} from "./process.types";
import { CustomError } from "../../components/errors";
import ProcessErrorCode from "./process.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { getFilters } from "../../components/filters";
import { processAttachmentService } from "./processAttachment";
import { AttachmentModel } from "../attachment";

class ProcessService {
  async createProcess(props: CreateProcessProps) {
    const process = await ProcessModel.create(props);

    // Create attachments
    if (props.attachments && props.attachments.length) {
      await processAttachmentService.createBulkProcessAttachment({
        relation: process.id,
        attachments: props.attachments,
      });
    }
    return process;
  }

  async updateProcess(props: UpdateProcessProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find process by id and company
    const process = await ProcessModel.findOne({
      where: { id, company },
    });

    // if process not found, throw an error
    if (!process) {
      throw new CustomError(404, ProcessErrorCode.PROCESS_NOT_FOUND);
    }

    // Finally, update the process
    const [, [updatedProcess]] = await ProcessModel.update(updateProps, {
      where: { id, company },
      returning: true,
    });

    // Update attachments
    if (props.attachments) {
      await processAttachmentService.updateBulkProcessAttachment({
        relation: process.id,
        attachments: props.attachments,
      });
    }

    return updatedProcess;
  }

  async deleteProcess(props: DeleteProcessProps) {
    // Props
    const { id, company } = props;

    // Find and delete the process by id and company
    const process = await ProcessModel.destroy({
      where: { id, company },
    });

    // if process has been deleted, throw an error
    if (!process) {
      throw new CustomError(404, ProcessErrorCode.PROCESS_NOT_FOUND);
    }

    return process;
  }

  async getProcessById(props: GetProcessByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the process by id and company
    const process = await ProcessModel.findOne({
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

    // If no process has been found, then throw an error
    if (!process) {
      throw new CustomError(404, ProcessErrorCode.PROCESS_NOT_FOUND);
    }

    return process;
  }

  async getProcesses(props: GetProcessesProps, userId: string) {
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

    // Count total processes in the given company
    const count = await ProcessModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
      include,
    });

    // Find all processes for matching props and company
    const data = await ProcessModel.findAll({
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

export default new ProcessService();
