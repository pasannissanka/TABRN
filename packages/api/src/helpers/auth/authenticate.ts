import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/app_error';

export async function isLoggedIn(
  req: Request,
  _: Response,
  next: NextFunction
) {
  if (req.user) {
    next();
  } else {
    next(new AppError('Unauthorized', 401));
  }
}
