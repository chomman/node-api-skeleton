import * as Joi from "joi";

export const createMemberModel = Joi.object().keys({
  name: Joi.string().required()
});

export const updateMemberModel = Joi.object().keys({
  name: Joi.string().required()
});
