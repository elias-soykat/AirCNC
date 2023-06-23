import Joi from 'joi';

import { Gender, Role } from './user.enum';
import { ILogin, IUser } from './user.interface';

export const registrationValidator = Joi.object<IUser>()
  .options({ abortEarly: false, stripUnknown: true })
  .keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .min(8)
      .max(18)
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).*$/)
      .required()
      .messages({
        'string.min': 'Password must have at least {#limit} characters',
        'string.max': 'Password can have a maximum of {#limit} characters',
        'string.pattern.base':
          'Password must contain at least lowercase, uppercase, and one special character',
        'any.required': 'Password is required',
      }),
    gender: Joi.string()
      .valid(...Object.values(Gender))
      .required(),
    role: Joi.string()
      .valid(...Object.values(Role))
      .required(),
  });

export const loginValidator = Joi.object<ILogin>()
  .options({ abortEarly: false, stripUnknown: true })
  .keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
