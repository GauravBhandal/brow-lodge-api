import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import attachmentService from "./attachment.service";
import { getFileStream } from "../../components/s3";

class AttachmentController {
  async createAttachment(req: Request, res: Response) {
    const props = {
      file: req.file,
      company: req.auth.companyId,
    };

    const attachment = await attachmentService.createAttachment(props);

    res.status(200).json(attachment);
  }

  async deleteAttachment(req: Request, res: Response) {
    const { attachmentId } = req.params;
    const props = {
      id: attachmentId,
      company: req.auth.companyId,
    };

    await attachmentService.deleteAttachment(props);

    res.status(204).json();
  }

  async getattachmentById(req: Request, res: Response) {
    const { attachmentId } = req.params;
    const props = {
      id: attachmentId,
      company: req.auth.companyId,
    };

    const attachment = await attachmentService.getAttachmentById(props);

    // TODO: Check if attachment key exists and also add error handling
    const readStream = getFileStream(attachment.url);
    readStream.pipe(res);
  }
}

export default new AttachmentController();
