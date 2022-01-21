import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { requiredUUIDSchema, wrapSchema } from "../../common/joiSchemas";

const createDocumentLogSchema = wrapSchema({
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
});

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
  createDocumentLog: joiMiddleware(createDocumentLogSchema),
  deleteDocumentLog: joiMiddleware(deleteDocumentLogSchema),
  getDocumentLogById: joiMiddleware(getDocumentLogByIdSchema),
};
