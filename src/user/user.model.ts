import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config';

import { Schema, model } from 'mongoose';
import { Gender, Role } from './user.enum';
import { IUser } from './user.interface';
const { expiresIn, private_key } = config.jwt;

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: Object.values(Gender),
      default: Gender.OTHER,
    },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.VISITOR,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.methods.generateToken = function (): string {
  return jwt.sign({ id: this._id, role: this.role }, private_key as string, {
    expiresIn,
    algorithm: 'RS256',
  });
};

userSchema.methods.comparePassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default model<IUser>('User', userSchema);
