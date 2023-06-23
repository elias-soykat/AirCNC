import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';

import err from '../utils/error.util';
import logger from '../utils/logger.util';
import HTTP_STATUS from '../utils/status-code.util';

import { loginValidator, registrationValidator } from './users.validator';
const {
  UNPROCESSABLE,
  CONFLICT,
  REGISTRATION,
  NOT_FOUND,
  UNAUTHORIZED,
  INTERNAL_SERVER,
} = HTTP_STATUS;

import userService from './user.service';



export default {
  registrationUser: async (req: Request, res: Response) => {
    try {
      const { error } = registrationValidator.validate(req.body);
      if (error) {
        return err.response({ res, err: UNPROCESSABLE, details: error.details });
      }

      const isExists = await userService.isUserExists(req.body.email);
      if (isExists) return res.status(CONFLICT.code).json({ message: CONFLICT.message });

      req.body.password = await bcrypt.hash(req.body.password, 10);

      const user = await userService.createUser(req.body);
      const token = user.generateToken();

      const { password, ...newUser } = user.toJSON();
      return res.status(REGISTRATION.code).json({ data: { ...newUser, token } });
    } catch (err) {
      logger.error(err);
      return res.status(INTERNAL_SERVER.code).json({
        message: INTERNAL_SERVER.message,
      });
    }
  },

  loginUser: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const { error } = loginValidator.validate(req.body);
      if (error) {
        return err.response({ res, err: UNPROCESSABLE, details: error.details });
      }

      const user = await userService.getUserByEmail(email);
      if (!user) return res.status(NOT_FOUND.code).json({ message: NOT_FOUND.message });

      const isPasswordMatch = await user.comparePassword(password);
      if (!isPasswordMatch) {
        return res.status(UNAUTHORIZED.code).json({ message: UNAUTHORIZED.message });
      }

      const token = user.generateToken();
      return res.json({ data: { token } });
    } catch (error) {
      logger.error(error);
      return res.status(INTERNAL_SERVER.code).json({
        message: INTERNAL_SERVER.message,
      });
    }
  },
};
