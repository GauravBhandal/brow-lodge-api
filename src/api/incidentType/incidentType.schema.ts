import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { wrapSchema } from "../../common/joiSchemas";

const getIncidentTypeSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  getIncidentTypes: joiMiddleware(getIncidentTypeSchema),
};
