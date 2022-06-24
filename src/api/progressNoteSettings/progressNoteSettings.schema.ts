import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { wrapSchema } from "../../common/joiSchemas";

const editProgressNoteSettingsSchema = wrapSchema({
  body: Joi.object().keys({
    customFields: Joi.array()
      .items(
        Joi.object().keys({
          label: Joi.string().required(),
          isRequired: Joi.boolean().required(),
        })
      )
      .required(),
  }),
});

export default {
  editProgressNoteSettings: joiMiddleware(editProgressNoteSettingsSchema),
};
