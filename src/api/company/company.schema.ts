import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { wrapSchema } from "../../common/joiSchemas";

const editMyCompanySchema = wrapSchema({
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
});

export default {
  editMyCompany: joiMiddleware(editMyCompanySchema),
};
