import { Router } from 'express';
import viewController from '../controllers/view.controller';
import { isLoggedIn } from '../helpers/auth/authenticate';
import { catchAsync } from '../helpers/errors/catch_async';

const router = Router();

router.post(
  '/w/:workspaceId/create/listview',
  isLoggedIn,
  catchAsync(viewController.createViewListView)
);

router.post(
  '/w/:workspaceId/create/calender',
  isLoggedIn,
  catchAsync(viewController.createViewCalender)
);

router.get(
  '/w/:workspaceId/paginate',
  isLoggedIn,
  catchAsync(viewController.getViews)
);

router.get('/:viewId', isLoggedIn, catchAsync(viewController.getView));

export default router;
