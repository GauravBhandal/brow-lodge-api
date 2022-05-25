import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import {
  requiredUUIDSchema,
  wrapSchema,
  requiredTimeSchema,
} from "../../common/joiSchemas";

const createSeizureLogSchema = wrapSchema({
  body: Joi.object().keys({
    date: Joi.date().required(),
    startTime: requiredTimeSchema(),
    endTime: requiredTimeSchema(),
    seizure: Joi.string().required(),
    recovery: Joi.string().required(),
    comments: Joi.string().allow(""),
    staff: requiredUUIDSchema(),
    client: requiredUUIDSchema(),
  }),
});

const editSeizureLogSchema = wrapSchema({
  params: Joi.object().keys({ seizureLogId: requiredUUIDSchema() }),
  body: Joi.object().keys({
    date: Joi.date().required(),
    startTime: requiredTimeSchema(),
    endTime: requiredTimeSchema(),
    seizure: Joi.string().required(),
    recovery: Joi.string().required(),
    comments: Joi.string().allow(""),
    staff: requiredUUIDSchema(),
    client: requiredUUIDSchema(),
  }),
});

const deleteSeizureLogSchema = wrapSchema({
  params: Joi.object().keys({
    seizureLogId: requiredUUIDSchema(),
  }),
});

const getSeizureLogByIdSchema = wrapSchema({
  params: Joi.object().keys({
    seizureLogId: requiredUUIDSchema(),
  }),
});

const getSeizureLogSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createSeizureLog: joiMiddleware(createSeizureLogSchema),
  editSeizureLog: joiMiddleware(editSeizureLogSchema),
  deleteSeizureLog: joiMiddleware(deleteSeizureLogSchema),
  getSeizureLogById: joiMiddleware(getSeizureLogByIdSchema),
  getSeizureLogs: joiMiddleware(getSeizureLogSchema),
};
