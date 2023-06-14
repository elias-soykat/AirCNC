const { NOT_FOUND } = require('../utils/status-code.util');

const notFound = (req, res, next) => {
  const error = new Error(`${NOT_FOUND.message} - ${req.originalUrl}`);
  res.status(NOT_FOUND.code);
  next(error);
};

// eslint-disable-next-line no-unused-vars
const errResponder = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : null,
  });
};

module.exports = { errResponder, notFound };
