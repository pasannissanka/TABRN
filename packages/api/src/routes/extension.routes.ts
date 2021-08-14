import { Router } from 'express';
import extensionController from '../controllers/extension.controller';
import { isLoggedIn } from '../helpers/auth/authenticate';
import { catchAsync } from '../helpers/errors/catch_async';

const router = Router();

router.get(
  '/data',
  isLoggedIn,
  catchAsync(extensionController.getWorkspacesTagsKeyValue)
);

export default router;
