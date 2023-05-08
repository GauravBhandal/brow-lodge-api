import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { wrapSchema } from "../../common/joiSchemas";

const editMobileSettingSchema = wrapSchema({
  body: Joi.object().keys({
    payload: Joi.array().items(
      Joi.object().keys({
        transport: Joi.object().keys({
          isClockRequired: Joi.boolean().allow("", null),
          isAttachmentRequired: Joi.boolean().allow("", null),
        }),
      })
    ),
  }),
});

export default {
  editMobileSetting: joiMiddleware(editMobileSettingSchema),
};
