const jwt = require('jsonwebtoken');
const { UNAUTHORIZED } = require('../utils/status-code.util');
const {
  jwt: { public_key },
} = require('../config/config');

module.exports = async (req, res, next) => {
  const auth = req.headers.authorization;
  if (auth) {
    const token = auth.split(' ')[1];
    if (!token)
      return res.status(UNAUTHORIZED.code).json({ message: UNAUTHORIZED.message });

    const user = jwt.verify(token, public_key);
    req.user = { userId: user.id, role: user.role };

    return next();
  }

  return res.status(UNAUTHORIZED.code).json({ message: UNAUTHORIZED.message });
};
