import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import {
  requiredUUIDSchema,
  wrapSchema,
  requiredTimeSchema,
} from "../../common/joiSchemas";

const createClientBehaviourSchema = wrapSchema({
  body: Joi.object().keys({
    date: Joi.date().required(),
    startTime: requiredTimeSchema(),
    endTime: requiredTimeSchema(),
    antecedents: Joi.string().required(),
    behaviour: Joi.string().required(),
    consequences: Joi.string().required(),
    staff: requiredUUIDSchema(),
    client: requiredUUIDSchema(),
  }),
});

const editClientBehaviourSchema = wrapSchema({
  params: Joi.object().keys({ clientBehaviourId: requiredUUIDSchema() }),
  body: Joi.object().keys({
    date: Joi.date().required(),
    startTime: requiredTimeSchema(),
    endTime: requiredTimeSchema(),
    antecedents: Joi.string().required(),
    behaviour: Joi.string().required(),
    consequences: Joi.string().required(),
    staff: requiredUUIDSchema(),
    client: requiredUUIDSchema(),
  }),
});

const deleteClientBehaviourSchema = wrapSchema({
  params: Joi.object().keys({
    clientBehaviourId: requiredUUIDSchema(),
  }),
});

const getClientBehaviourByIdSchema = wrapSchema({
  params: Joi.object().keys({
    clientBehaviourId: requiredUUIDSchema(),
  }),
});

const getClientBehaviourSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createClientBehaviour: joiMiddleware(createClientBehaviourSchema),
  editClientBehaviour: joiMiddleware(editClientBehaviourSchema),
  deleteClientBehaviour: joiMiddleware(deleteClientBehaviourSchema),
  getClientBehaviourById: joiMiddleware(getClientBehaviourByIdSchema),
  getClientBehaviours: joiMiddleware(getClientBehaviourSchema),
};
