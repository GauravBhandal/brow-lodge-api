import Joi from "joi";

const environmentSchema = Joi.object().keys({
  PORT: Joi.number().required(),
  URL_PREFIX: Joi.string().allow("", null).default(""),

  CORS_ORIGIN: Joi.string().required(),

  DATABASE_NAME: Joi.string().required(),
  DATABASE_HOST: Joi.string().required(),
  DATABASE_USERNAME: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
});

export default environmentSchema;
