const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { model, Schema } = require('mongoose');
const { gender, role } = require('./users.enum');
const {
  jwt: { private_key, expiresIn },
} = require('../config/config');

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    gender: {
      type: String,
      enum: Object.values(gender),
      default: gender.OTHER,
    },
    role: {
      type: String,
      enum: Object.values(role),
      default: role.VISITOR,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id, role: this.role }, private_key, {
    expiresIn,
    algorithm: 'RS256',
  });
};

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = model('User', userSchema);
