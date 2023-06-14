const bcrypt = require('bcryptjs');
const logger = require('../utils/logger.util');
const userService = require('./users.service');
const err = require('../utils/error.util');

const {
  UNPROCESSABLE,
  INTERNAL_SERVER,
  CONFLICT,
  REGISTRATION,
  NOT_FOUND,
  UNAUTHORIZED,
} = require('../utils/status-code.util');
const { registrationValidator, loginValidator } = require('./users.validator');

module.exports = {
  registrationUser: async (req, res) => {
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
      const newUser = user.toJSON();
      delete newUser.password;

      return res.status(REGISTRATION.code).json({ data: { ...newUser, token } });
    } catch (error) {
      logger.error(error);
      return res.status(INTERNAL_SERVER.code).json({
        message: INTERNAL_SERVER.message,
      });
    }
  },

  loginUser: async (req, res) => {
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
