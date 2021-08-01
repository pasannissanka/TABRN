import { Router } from 'express';
import passport from 'passport';
import { successResponse } from '../helpers/responses/success_response';

const router = Router();

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  console.log(req.user);
  res.redirect('http://localhost:3000/');
});

router.get('/logout', (req, res) => {
  req.logOut();
  successResponse(res, req.user);
});

export default router;
