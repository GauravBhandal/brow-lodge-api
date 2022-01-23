import Joi from "joi";

const environmentSchema = Joi.object().keys({
  BASE_URL: Joi.string().required(),
  PORT: Joi.number().required(),
  URL_PREFIX: Joi.string().allow("", null).default(""),

  CORS_ORIGIN: Joi.string().required(),

  DATABASE_NAME: Joi.string().required(),
  DATABASE_HOST: Joi.string().required(),
  DATABASE_USERNAME: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),

  TOKEN_KEY: Joi.string().required(),
  TOKEN_EXPIRY: Joi.string().required(),

  AWS_S3_BUCKET_NAME: Joi.string().required(),
  AWS_REGION: Joi.string().required(),
  AWS_ACCESS_KEY: Joi.string().required(),
  AWS_SECRET_KEY: Joi.string().required(),

  SENTRY_DNS: Joi.string().required(),
});

export default environmentSchema;
