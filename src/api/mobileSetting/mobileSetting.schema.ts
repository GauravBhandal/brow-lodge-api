import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { wrapSchema } from "../../common/joiSchemas";

const editMobileSettingSchema = wrapSchema({
  body: Joi.object().keys({
    settings: Joi.object().keys({
      allowClockInAndClockOutInRoster: Joi.boolean().allow("", null),
      isAttachmentRequired: Joi.boolean().allow("", null),
    }).allow(null),
  }),
});

export default {
  editMobileSetting: joiMiddleware(editMobileSettingSchema),
};
