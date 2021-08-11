import { Router } from 'express';
import bookmarkController from '../controllers/bookmark.controller';
import { isLoggedIn } from '../helpers/auth/authenticate';
import { catchAsync } from '../helpers/errors/catch_async';

const router = Router();

router.post('/create', isLoggedIn, catchAsync(bookmarkController.addBookmark));

router.get(
  '/w/:workspaceId/paginate',
  isLoggedIn,
  catchAsync(bookmarkController.paginate)
);

router.get(
  '/w/:workspaceId/b/:bookmarkSlug',
  isLoggedIn,
  catchAsync(bookmarkController.getBookmark)
);

router.put(
  '/:bookmarkId',
  isLoggedIn,
  catchAsync(bookmarkController.updateBookmark)
);

router.delete(
  '/:bookmarkId',
  isLoggedIn,
  catchAsync(bookmarkController.deleteBookmark)
);

export default router;
