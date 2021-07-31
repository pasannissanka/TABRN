import { Router } from 'express';
import { ensureLoggedIn } from 'connect-ensure-login';
import { successResponse } from '../helpers/responses/success_response';

const router = Router();

router.get('/', ensureLoggedIn(), (req, res) => {
  successResponse(res, req.user);
});

export default router;
