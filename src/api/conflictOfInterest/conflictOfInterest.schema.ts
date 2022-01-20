import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { requiredUUIDSchema, wrapSchema } from "../../common/joiSchemas";

const createConflictOfInterestSchema = wrapSchema({
  body: Joi.object().keys({
    date: Joi.date().required(),
    conflictDescription: Joi.string().required(),
    mitigationStrategy: Joi.string().required(),
    staff: requiredUUIDSchema(),
  }),
});

const editConflictOfInterestSchema = wrapSchema({
  params: Joi.object().keys({ conflictOfInterestId: requiredUUIDSchema() }),
  body: Joi.object().keys({
    date: Joi.date().required(),
    conflictDescription: Joi.string().required(),
    mitigationStrategy: Joi.string().required(),
    staff: requiredUUIDSchema(),
  }),
});

const deleteConflictOfInterestSchema = wrapSchema({
  params: Joi.object().keys({
    conflictOfInterestId: requiredUUIDSchema(),
  }),
});

const getConflictOfInterestByIdSchema = wrapSchema({
  params: Joi.object().keys({
    conflictOfInterestId: requiredUUIDSchema(),
  }),
});

const getConflictOfInterestSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createConflictOfInterest: joiMiddleware(createConflictOfInterestSchema),
  editConflictOfInterest: joiMiddleware(editConflictOfInterestSchema),
  deleteConflictOfInterest: joiMiddleware(deleteConflictOfInterestSchema),
  getConflictOfInterestById: joiMiddleware(getConflictOfInterestByIdSchema),
  getConflictOfInterests: joiMiddleware(getConflictOfInterestSchema),
};
