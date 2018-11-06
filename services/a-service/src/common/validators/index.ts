import * as Joi from 'joi';

export const jwtValidator = Joi.object({'authorization': Joi.string().required().regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/)}).unknown();