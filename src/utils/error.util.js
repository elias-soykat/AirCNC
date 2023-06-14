const { replace } = require('lodash');

module.exports = {
  validationMessage: (err) =>
    err.reduce(
      // eslint-disable-next-line no-return-assign, no-param-reassign
      (obj, item) => (obj[item.path[0]] = replace(item.message, /"/g, '')),
      {}
    ),
  response({ res, err, details }) {
    const { code, message } = err;
    return res.status(code).json({ message, value: this.validationMessage(details) });
  },
};
