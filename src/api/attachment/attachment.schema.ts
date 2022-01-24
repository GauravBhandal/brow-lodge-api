import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { requiredUUIDSchema, wrapSchema } from "../../common/joiSchemas";

const deleteAttachmentSchema = wrapSchema({
  params: Joi.object().keys({
    attachmentId: requiredUUIDSchema(),
  }),
});

const getAttachmentByIdSchema = wrapSchema({
  params: Joi.object().keys({
    attachmentId: requiredUUIDSchema(),
  }),
});

export default {
  deleteAttachment: joiMiddleware(deleteAttachmentSchema),
  getAttachmentById: joiMiddleware(getAttachmentByIdSchema),
};
