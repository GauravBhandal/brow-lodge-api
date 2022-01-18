import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { requiredUUIDSchema, wrapSchema } from "../../common/joiSchemas";

const createOxygenSaturationLogSchema = wrapSchema({
  body: Joi.object().keys({
    date: Joi.date().required(),
    time: Joi.date().required(),
    reading: Joi.number().required(),
    probePlacement: Joi.string().required(),
    suctioningRequired: Joi.boolean().required(),
    staff: requiredUUIDSchema(),
    client: requiredUUIDSchema(),
    typeOfSuctioning: Joi.string().allow(""),
    suctionAmount: Joi.string().allow(""),
    secretionDescription: Joi.string().allow(""),
    readingPostSuctioning: Joi.number(),
  }),
});

const editOxygenSaturationLogSchema = wrapSchema({
  params: Joi.object().keys({ oxygenSaturationLogId: requiredUUIDSchema() }),
  body: Joi.object().keys({
    date: Joi.date().required(),
    time: Joi.date().required(),
    reading: Joi.number().required(),
    probePlacement: Joi.string().required(),
    suctioningRequired: Joi.boolean().required(),
    staff: requiredUUIDSchema(),
    client: requiredUUIDSchema(),
    typeOfSuctioning: Joi.string().allow(""),
    suctionAmount: Joi.string().allow(""),
    secretionDescription: Joi.string().allow(""),
    readingPostSuctioning: Joi.number(),
  }),
});

const deleteOxygenSaturationLogSchema = wrapSchema({
  params: Joi.object().keys({
    oxygenSaturationLogId: requiredUUIDSchema(),
  }),
});

const getOxygenSaturationLogByIdSchema = wrapSchema({
  params: Joi.object().keys({
    oxygenSaturationLogId: requiredUUIDSchema(),
  }),
});

const getOxygenSaturationLogSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createOxygenSaturationLog: joiMiddleware(createOxygenSaturationLogSchema),
  editOxygenSaturationLog: joiMiddleware(editOxygenSaturationLogSchema),
  deleteOxygenSaturationLog: joiMiddleware(deleteOxygenSaturationLogSchema),
  getOxygenSaturationLogById: joiMiddleware(getOxygenSaturationLogByIdSchema),
  getOxygenSaturationLogs: joiMiddleware(getOxygenSaturationLogSchema),
};
