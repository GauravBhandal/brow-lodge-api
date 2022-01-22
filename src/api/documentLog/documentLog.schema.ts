import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { requiredUUIDSchema, wrapSchema } from "../../common/joiSchemas";

const deleteDocumentLogSchema = wrapSchema({
  params: Joi.object().keys({
    documentLogId: requiredUUIDSchema(),
  }),
});

const getDocumentLogByIdSchema = wrapSchema({
  params: Joi.object().keys({
    documentLogId: requiredUUIDSchema(),
  }),
});

export default {
  deleteDocumentLog: joiMiddleware(deleteDocumentLogSchema),
  getDocumentLogById: joiMiddleware(getDocumentLogByIdSchema),
};
