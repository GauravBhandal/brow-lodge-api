import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import documentLogService from "./documentLog.service";
import { getFileStream } from "../../components/s3";

class DocumentLogController {
  async createDocumentLog(req: Request, res: Response) {
    const props = {
      file: req.file,
      company: req.auth.companyId,
    };

    const documentLog = await documentLogService.createDocumentLog(props);

    res.status(200).json(documentLog);
  }

  async deleteDocumentLog(req: Request, res: Response) {
    const { documentLogId } = req.params;
    const props = {
      id: documentLogId,
      company: req.auth.companyId,
    };

    await documentLogService.deleteDocumentLog(props);

    res.status(204).json();
  }

  async getdocumentLogById(req: Request, res: Response) {
    const { documentLogId } = req.params;
    const props = {
      id: documentLogId,
      company: req.auth.companyId,
    };

    const documentKey = await documentLogService.getDocumentLogById(props);

    // TODO: Check if document key exists and also add error handling
    const readStream = getFileStream(documentKey);
    readStream.pipe(res);
  }
}

export default new DocumentLogController();
