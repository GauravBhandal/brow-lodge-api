import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { wrapSchema } from "../../common/joiSchemas";

const editRosterSettingSchema = wrapSchema({
  body: Joi.object().keys({
    settings: Joi.object()
      .keys({
        startDate: Joi.date().required(),
        rosterCycle: Joi.string().required(),
      })
      .required(),
  }),
});

export default {
  editRosterSetting: joiMiddleware(editRosterSettingSchema),
};
