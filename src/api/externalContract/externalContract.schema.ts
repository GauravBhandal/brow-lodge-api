import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import {
  requiredUUIDSchema,
  wrapSchema,
  requiredTimeSchema,
} from "../../common/joiSchemas";

const createExternalContractSchema = wrapSchema({
  body: Joi.object().keys({
    date: Joi.date().required(),
    nextReviewDate: Joi.date().allow(null),
    name: Joi.string().required(),
    notes: Joi.string().allow(null),
    staff: requiredUUIDSchema(),
    attachments: Joi.array()
      .items(Joi.string().uuid({ version: "uuidv4" }))
      .required(),
  }),
});

const editExternalContractSchema = wrapSchema({
  params: Joi.object().keys({
    externalContractId: requiredUUIDSchema(),
  }),
  body: Joi.object().keys({
    date: Joi.date().required(),
    nextReviewDate: Joi.date().allow(null),
    name: Joi.string().required(),
    notes: Joi.string().allow(null),
    staff: requiredUUIDSchema(),
    attachments: Joi.array()
      .items(Joi.string().uuid({ version: "uuidv4" }))
      .required(),
  }),
});

const deleteExternalContractSchema = wrapSchema({
  params: Joi.object().keys({
    externalContractId: requiredUUIDSchema(),
  }),
});

const getExternalContractByIdSchema = wrapSchema({
  params: Joi.object().keys({
    externalContractId: requiredUUIDSchema(),
  }),
});

const getExternalContractSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createExternalContract: joiMiddleware(createExternalContractSchema),
  editExternalContract: joiMiddleware(editExternalContractSchema),
  deleteExternalContract: joiMiddleware(deleteExternalContractSchema),
  getExternalContractById: joiMiddleware(getExternalContractByIdSchema),
  getExternalContracts: joiMiddleware(getExternalContractSchema),
};
