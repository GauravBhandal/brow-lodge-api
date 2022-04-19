import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { wrapSchema } from "../../common/joiSchemas";

const editMyCompanySchema = wrapSchema({
  body: Joi.object().keys({
    name: Joi.string().required(),
    phone: Joi.string().allow("", null),
    address: Joi.string().allow("", null),
    website: Joi.string().allow("", null),
    email: Joi.string().allow("", null),
    ndisRegistrationNumber: Joi.string().allow("", null),
    timezone: Joi.string().allow("", null),
    attachment: Joi.string().uuid({ version: "uuidv4" }).allow("", null),
  }),
});

export default {
  editMyCompany: joiMiddleware(editMyCompanySchema),
};
