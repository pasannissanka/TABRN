import { Router } from 'express';
import workspaceController from '../controllers/workspace.controller';
import { isLoggedIn } from '../helpers/auth/authenticate';
import { catchAsync } from '../helpers/errors/catch_async';

const router = Router();

router.post(
  '/create',
  isLoggedIn,
  catchAsync(workspaceController.createNewWorkspace)
);

router.get(
  '/all',
  isLoggedIn,
  catchAsync(workspaceController.getAllWorkspaces)
);

router.get('/:slug', isLoggedIn, catchAsync(workspaceController.getWorkspace));

router.put(
  '/:workspaceId',
  isLoggedIn,
  catchAsync(workspaceController.updateWorkspace)
);

router.delete(
  '/:workspaceId',
  isLoggedIn,
  catchAsync(workspaceController.deleteWorkspace)
);

router.patch(
  '/:workspaceId',
  isLoggedIn,
  catchAsync(workspaceController.restoreWorkspace)
);

export default router;
