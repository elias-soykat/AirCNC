const User = require('./users.model');

module.exports = {
  isUserExists: async (email) => User.exists({ email }),
  createUser: async (user) => User.create(user),
  getUserByEmail: async (email) => User.findOne({ email }),
};
