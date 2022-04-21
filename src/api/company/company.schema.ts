import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { wrapSchema } from "../../common/joiSchemas";

const editMyCompanySchema = wrapSchema({
  body: Joi.object().keys({
    name: Joi.string().required(),
    phone: Joi.string().allow("", null),
    address: Joi.string().allow("", null),
    attachment: Joi.string().uuid({ version: "uuidv4" }).allow("", null),
    xeroTokenSet: Joi.object()
      .keys({
        access_token: Joi.string(),
        expires_at: Joi.number(),
        id_token: Joi.string(),
        refresh_token: Joi.string(),
        scope: Joi.string(),
        session_state: Joi.string(),
        token_type: Joi.string(),
      })
      .allow(null), //TODO add the right Joi validation
  }),
});

export default {
  editMyCompany: joiMiddleware(editMyCompanySchema),
};
