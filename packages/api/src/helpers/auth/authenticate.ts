import { NextFunction, Request, Response } from 'express';
import { GraphQLResolveInfo } from 'graphql';
import { ResolverResolveParams, ResolverRpCb } from 'graphql-compose';
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

export const GqlComposeAuthWrapper =
  (next: ResolverRpCb<any, any, any>) =>
  (rp: ResolverResolveParams<any, any, any>) => {
    // forcibly set this arg to logged user id
    rp.args.record = {
      ...rp.args.record,
      userId: rp.context.user.id,
      isDeleted: false,
    };
    return next(rp);
  };
