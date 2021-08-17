import { Router } from 'express';
import viewController from '../controllers/view.controller';
import { isLoggedIn } from '../helpers/auth/authenticate';
import { catchAsync } from '../helpers/errors/catch_async';

const router = Router();

router.post(
  '/w/:workspaceId/create',
  isLoggedIn,
  catchAsync(viewController.createView)
);

router.get(
  '/w/:workspaceId/all',
  isLoggedIn,
  catchAsync(viewController.getViews)
);

router.get('/:viewId', isLoggedIn, catchAsync(viewController.getView));

export default router;
