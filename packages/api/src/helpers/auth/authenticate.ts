import { NextFunction, Request, Response } from 'express';
import { GraphQLResolveInfo } from 'graphql';
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

export async function authMiddlewareGql(
  resolve: (
    source: any,
    args: any,
    context: any,
    info: GraphQLResolveInfo
  ) => any,
  source: any,
  args: any,
  context: any,
  info: GraphQLResolveInfo
) {
  if (context.user) {
    return resolve(source, args, context, info);
  }
  throw new Error('You must be authorized');
}
