import * as Joi from "joi";

export const createUserModel = Joi.object().keys({
  email: Joi.string().required(),
  name: Joi.string().required(),
  password: Joi.string().required()
});

export const updateUserModel = Joi.object().keys({
  email: Joi.string().required()
});

export const loginModel = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required()
});

export const jwtValidator = Joi.object({'authorization': Joi.string().required().regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/)}).unknown();