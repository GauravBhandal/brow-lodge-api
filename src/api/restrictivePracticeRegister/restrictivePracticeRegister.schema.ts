import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import {
  requiredTimeSchema,
  requiredUUIDSchema,
  wrapSchema,
} from "../../common/joiSchemas";

const createRestrictivePracticeRegisterSchema = wrapSchema({
  body: Joi.object().keys({
    startDate: Joi.date().required(),
    endDate: Joi.date().allow(null),
    startTime: requiredTimeSchema(),
    endTime: Joi.string()
      .regex(/^([0-9]{2})\:([0-9]{2})$/)
      .allow(null),
    typeOfRestrictivePractice: Joi.string().required(),
    description: Joi.string().required(),
    administrationType: Joi.string().required(),
    behaviourOfConcerns: Joi.string().required(),
    isAuthorised: Joi.string().required(),
    reportingFrequency: Joi.string().required(),
    nextReviewDate: Joi.date().allow(null),
    client: requiredUUIDSchema(),
  }),
});

const editRestrictivePracticeRegisterSchema = wrapSchema({
  params: Joi.object().keys({
    restrictivePracticeRegisterId: requiredUUIDSchema(),
  }),
  body: Joi.object().keys({
    startDate: Joi.date().required(),
    endDate: Joi.date().allow(null),
    startTime: requiredTimeSchema(),
    endTime: Joi.string()
      .regex(/^([0-9]{2})\:([0-9]{2})$/)
      .allow(null),
    typeOfRestrictivePractice: Joi.string().required(),
    description: Joi.string().required(),
    administrationType: Joi.string().required(),
    behaviourOfConcerns: Joi.string().required(),
    isAuthorised: Joi.string().required(),
    reportingFrequency: Joi.string().required(),
    nextReviewDate: Joi.date().allow(null),
    client: requiredUUIDSchema(),
  }),
});

const deleteRestrictivePracticeRegisterSchema = wrapSchema({
  params: Joi.object().keys({
    restrictivePracticeRegisterId: requiredUUIDSchema(),
  }),
});

const deleteArchiveRestrictivePracticeRegisterSchema = wrapSchema({
  params: Joi.object().keys({
    restrictivePracticeRegisterId: requiredUUIDSchema(),
  }),
});

const getRestrictivePracticeRegisterByIdSchema = wrapSchema({
  params: Joi.object().keys({
    restrictivePracticeRegisterId: requiredUUIDSchema(),
  }),
});

const getRestrictivePracticeRegisterSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createRestrictivePracticeRegister: joiMiddleware(
    createRestrictivePracticeRegisterSchema
  ),
  editRestrictivePracticeRegister: joiMiddleware(
    editRestrictivePracticeRegisterSchema
  ),
  deleteRestrictivePracticeRegister: joiMiddleware(
    deleteRestrictivePracticeRegisterSchema
  ),
  deleteArchiveRestrictivePracticeRegister: joiMiddleware(
    deleteArchiveRestrictivePracticeRegisterSchema
  ),
  getRestrictivePracticeRegisterById: joiMiddleware(
    getRestrictivePracticeRegisterByIdSchema
  ),
  getRestrictivePracticeRegisters: joiMiddleware(
    getRestrictivePracticeRegisterSchema
  ),
};
