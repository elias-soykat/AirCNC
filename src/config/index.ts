import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT ?? 4000,
  db: {
    user: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    name: process.env.DB_NAME,
  },
  jwt: {
    expiresIn: process.env.JWT_EXPIRES_IN ?? '1d',
    public_key: process.env.JWT_PUBLIC_KEY,
    private_key: process.env.JWT_PRIVATE_KEY,
  },
};
