import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { wrapSchema } from "../../common/joiSchemas";

const editMobileSettingSchema = wrapSchema({
  body: Joi.object().keys({
    payload: Joi.array().items(
      Joi.object().keys({
        transport: Joi.object().keys({
          isAttachmentRequired: Joi.string().allow("", null),
        }),
      })
    ),
  }),
});

export default {
  editMobileSetting: joiMiddleware(editMobileSettingSchema),
};
