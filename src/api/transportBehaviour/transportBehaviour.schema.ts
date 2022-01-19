import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { requiredUUIDSchema, wrapSchema } from "../../common/joiSchemas";

const createTransportBehaviourSchema = wrapSchema({
  body: Joi.object().keys({
    date: Joi.date().required(),
    startTime: Joi.date().required(),
    endTime: Joi.date().required(),
    purposeOfTheJourney: Joi.string().required(),
    explainBehaviour: Joi.string().required(),
    actionsTaken: Joi.string().required(),
    responseToActions: Joi.string().required(),
    staff: requiredUUIDSchema(),
    client: requiredUUIDSchema(),
  }),
});

const editTransportBehaviourSchema = wrapSchema({
  params: Joi.object().keys({ transportBehaviourId: requiredUUIDSchema() }),
  body: Joi.object().keys({
    date: Joi.date().required(),
    startTime: Joi.date().required(),
    endTime: Joi.date().required(),
    purposeOfTheJourney: Joi.string().required(),
    explainBehaviour: Joi.string().required(),
    actionsTaken: Joi.string().required(),
    responseToActions: Joi.string().required(),
    staff: requiredUUIDSchema(),
    client: requiredUUIDSchema(),
  }),
});

const deleteTransportBehaviourSchema = wrapSchema({
  params: Joi.object().keys({
    transportBehaviourId: requiredUUIDSchema(),
  }),
});

const getTransportBehaviourByIdSchema = wrapSchema({
  params: Joi.object().keys({
    transportBehaviourId: requiredUUIDSchema(),
  }),
});

const getTransportBehaviourSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createTransportBehaviour: joiMiddleware(createTransportBehaviourSchema),
  editTransportBehaviour: joiMiddleware(editTransportBehaviourSchema),
  deleteTransportBehaviour: joiMiddleware(deleteTransportBehaviourSchema),
  getTransportBehaviourById: joiMiddleware(getTransportBehaviourByIdSchema),
  getTransportBehaviours: joiMiddleware(getTransportBehaviourSchema),
};
