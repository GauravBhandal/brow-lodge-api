import { omit as _omit } from "lodash";

import DocumentLogModel from "./documentLog.model";
import {
  CreateDocumentLogProps,
  DeleteDocumentLogProps,
  GetDocumentLogByIdProps,
} from "./documentLog.types";
import { CustomError } from "../../components/errors";
import DocumentLogErrorCode from "./documentLog.error";
import { uploadFile } from "../../components/s3";
import { removeFileFromLocal } from "../../components/upload";

class DocumentLogService {
  async createDocumentLog(props: CreateDocumentLogProps) {
    const { file, company } = props;

    // multer failed to upload file to server
    if (!file) {
      throw new CustomError(500, "FAILED_TO_UPLOAD");
    }

    // Upload file to S3
    const uploadedFile = await uploadFile(file, company);

    // Create a new document in database
    const createProps = {
      company,
      name: file.originalname,
      meme: file.mimetype,
      url: uploadedFile.Key,
    };
    const documentLog = await DocumentLogModel.create(createProps);

    // Delete file from local server
    await removeFileFromLocal(file.path);

    return documentLog;
  }

  async deleteDocumentLog(props: DeleteDocumentLogProps) {
    // Props
    const { id, company } = props;

    // Find and delete the documentLog by id and company
    const documentLog = await DocumentLogModel.destroy({
      where: { id, company },
    });

    // if documentLog has been deleted, throw an error
    if (!documentLog) {
      throw new CustomError(404, DocumentLogErrorCode.DOCUMENT_LOG_NOT_FOUND);
    }

    return documentLog;
  }

  async getDocumentLogById(props: GetDocumentLogByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the documentLog by id and company
    const documentLog = await DocumentLogModel.findOne({
      where: { id, company },
    });

    // If no documentLog has been found, then throw an error
    if (!documentLog) {
      throw new CustomError(404, DocumentLogErrorCode.DOCUMENT_LOG_NOT_FOUND);
    }

    return documentLog;
  }
}

export default new DocumentLogService();
