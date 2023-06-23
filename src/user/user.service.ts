import { IUser } from './user.interface';
import User from './user.model';

export default {
  isUserExists: async (email: string) => User.exists({ email }),
  createUser: async (user: IUser) => User.create(user),
  getUserByEmail: async (email: string) => User.findOne({ email }),
  deleteUsers: async () => User.deleteMany(),
};
