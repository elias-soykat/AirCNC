import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';

import HTTP_STATUS from '../utils/status-code.util';
const { UNAUTHORIZED } = HTTP_STATUS;

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers.authorization;
  if (auth) {
    const token = auth.split(' ')[1];
    if (!token)
      return res.status(UNAUTHORIZED.code).json({ message: UNAUTHORIZED.message });

    try {
      const user: any = jwt.verify(token, config.jwt.public_key as string);
      // req.user = { userId: user.id, role: user.role };

      return next();
    } catch (error) {
      return res.status(UNAUTHORIZED.code).json({ message: UNAUTHORIZED.message });
    }
  }

  return res.status(UNAUTHORIZED.code).json({ message: UNAUTHORIZED.message });
};

export default authenticate;
