import * as Joi from '@hapi/joi';

export default Joi.object({
  APP_TITLE: Joi.string().required(),
  APP_DESCRIPTION: Joi.string().required(),
  APP_VERSION: Joi.string().default('1.0'),
  APP_PORT: Joi.number().default(3000),
  APP_KEY: Joi.string().default('123456'),
  DATABASE_HOST: Joi.string().default('http://127.0.0.1'),
  DATABASE_PORT: Joi.number().default(27017),
  DATABASE_USER: Joi.string().default('root'),
  DATABASE_PASSWORD: Joi.string().default('root'),
  DATABASE_NAME: Joi.string().default('pieces-management'),
  DATABASE_TZ: Joi.string().default('Brazil/East'),
});
