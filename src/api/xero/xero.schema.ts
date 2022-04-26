import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { wrapSchema } from "../../common/joiSchemas";

const callbackXeroSchema = wrapSchema({
  body: Joi.object().keys({
    url: Joi.string().required().trim(),
  }),
});

export default {
  callbackXero: joiMiddleware(callbackXeroSchema),
};
