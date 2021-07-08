const { Joi } = require('celebrate');

const urlRegexp = /http[s]{0,1}:\/\/(www\.){0,1}[\w\-.~:/?#[\]@!$&'()*+,;=]{5,}/i;

const idParamValidation = {
  params: Joi.object().keys({
    id: Joi.string().required().hex().length(24),
  }),
};

const createCardValidation = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(urlRegexp),
  }),
};

const createUserValidation = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(urlRegexp),
  }),
};

const changeProfileValidation = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
};

const changeAvatarValidation = {
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(urlRegexp),
  }),
};

const loginValidation = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
};

module.exports = {
  idParamValidation,
  createCardValidation,
  createUserValidation,
  changeProfileValidation,
  changeAvatarValidation,
  loginValidation,
};
