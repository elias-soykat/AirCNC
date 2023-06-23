import { Document } from 'mongoose';
import { Gender, Role } from './user.enum';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  gender: Gender;
  role: Role;
  generateToken: () => string;
  comparePassword: (enteredPassword: string) => Promise<boolean>;
}

export interface ILogin {
  email: string;
  password: string;
}
