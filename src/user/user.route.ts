import { Router } from 'express';
import user from './user.controller';

const router = Router();

router.route('/registration').post(user.registrationUser);
router.route('/login').post(user.loginUser);

export default router;
