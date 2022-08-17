import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { wrapSchema } from "../../common/joiSchemas";

const editAlertConfigurationSchema = wrapSchema({
  body: Joi.object().keys({
    payload: Joi.array().items(
      Joi.object().keys({
        name: Joi.string().required(),
        transport: Joi.object().keys({
          primaryEmail: Joi.string().allow("", null),
          secondaryEmail: Joi.string().allow("", null),
        }),
      })
    ),
  }),
});

export default {
  editAlertConfiguration: joiMiddleware(editAlertConfigurationSchema),
};
