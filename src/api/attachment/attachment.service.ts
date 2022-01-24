import { omit as _omit } from "lodash";

import AttachmentModel from "./attachment.model";
import {
  CreateAttachmentProps,
  DeleteAttachmentProps,
  GetAttachmentByIdProps,
} from "./attachment.types";
import { CustomError } from "../../components/errors";
import AttachmentErrorCode from "./attachment.error";
import { uploadFile } from "../../components/s3";
import { removeFileFromLocal } from "../../components/upload";

class AttachmentService {
  async createAttachment(props: CreateAttachmentProps) {
    const { file, company } = props;

    // multer failed to upload file to server
    if (!file) {
      throw new CustomError(500, "FAILED_TO_UPLOAD");
    }

    // Upload file to S3
    const uploadedFile = await uploadFile(file, company);

    // Create a new attachment in database
    const createProps = {
      company,
      name: file.originalname,
      meme: file.mimetype,
      url: uploadedFile.Key,
    };

    const attachment = await AttachmentModel.create(createProps);

    // Delete file from local server TODO: Delete this if upload to S3 failed
    await removeFileFromLocal(file.path);

    return attachment;
  }

  async deleteAttachment(props: DeleteAttachmentProps) {
    // Props
    const { id, company } = props;

    // Find and delete the attachment by id and company
    const attachment = await AttachmentModel.destroy({
      where: { id, company },
    });

    // if attachment has been deleted, throw an error
    if (!attachment) {
      throw new CustomError(404, AttachmentErrorCode.ATTACHMENT_NOT_FOUND);
    }

    return attachment;
  }

  async getAttachmentById(props: GetAttachmentByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the attachment by id and company
    const attachment = await AttachmentModel.findOne({
      where: { id, company },
    });

    // If no attachment has been found, then throw an error
    if (!attachment) {
      throw new CustomError(404, AttachmentErrorCode.ATTACHMENT_NOT_FOUND);
    }

    return attachment;
  }
}

export default new AttachmentService();
