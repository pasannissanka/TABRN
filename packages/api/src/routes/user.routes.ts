import { Router } from 'express';
import { AppError } from '../helpers/errors/app_error';
import { successResponse } from '../helpers/responses/success_response';

const router = Router();

router.get('/', (req, res) => {
  if (req.user) {
    successResponse(res, req.user);
  } else {
    throw new AppError('Not Authenticated', 404);
  }
});

export default router;
