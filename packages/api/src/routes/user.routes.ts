import { Router } from 'express';
import { isLoggedIn } from '../helpers/auth/authenticate';
import { successResponse } from '../helpers/responses/success_response';

const router = Router();

router.get('/', isLoggedIn, (req, res) => {
  successResponse(res, req.user);
});

export default router;
