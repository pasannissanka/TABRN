import { schemaComposer } from 'graphql-compose';
import { composeMongoose } from 'graphql-compose-mongoose';
import { authMiddlewareGql } from '../helpers/auth/authenticate';
import { IUser } from '../modules/user/types/user.type';
import { WorkspaceModel } from '../modules/workspace/model/workspace.model';

export const workspaceTC = composeMongoose(WorkspaceModel, {});

workspaceTC.addResolver({
  name: 'softDeleteOne',
  args: { _id: 'MongoID!' },
  type: workspaceTC,
  description: 'Soft delete a record',
  resolve: async ({
    args,
    context,
  }: {
    args: { _id: string };
    context: { user: IUser };
  }) => {
    const data = await WorkspaceModel.findOneAndUpdate(
      {
        _id: args._id,
        userId: context.user.id,
        isDeleted: false,
      },
      {
        isDeleted: true,
      },
      {
        new: true,
      }
    ).exec();
    return data;
  },
});

schemaComposer.Query.addFields({
  workspacePagination: workspaceTC.mongooseResolvers
    .pagination()
    .wrapResolve((next) => (rp) => {
      // forcibly set this arg to logged user id
      rp.args.filter = {
        ...rp.args.filter,
        userId: rp.context.user.id,
        isDeleted: false,
      };
      return next(rp);
    })
    .withMiddlewares([authMiddlewareGql]),
  workspaceMany: workspaceTC.mongooseResolvers
    .findMany()
    .wrapResolve((next) => (rp) => {
      // forcibly set this arg to logged user id
      rp.args.filter = {
        ...rp.args.filter,
        userId: rp.context.user.id,
        isDeleted: false,
      };
      return next(rp);
    })
    .withMiddlewares([authMiddlewareGql]),
  workspaceOne: workspaceTC.mongooseResolvers
    .findOne({
      filter: {
        removeFields: [
          'userId',
          'emoji',
          'isDeleted',
          'updatedAt',
          'createdAt',
          'description',
        ],
      },
    })
    .wrapResolve((next) => (rp) => {
      // forcibly set this arg to logged user id
      rp.args.filter = {
        ...rp.args.filter,
        userId: rp.context.user.id,
        isDeleted: false,
      };
      return next(rp);
    }),
});

schemaComposer.Mutation.addFields({
  workspaceNew: workspaceTC.mongooseResolvers
    .createOne({
      record: { removeFields: ['userId', 'isDeleted'] },
    })
    .wrapResolve((next) => (rp) => {
      // forcibly set this arg to logged user id
      rp.args.record = {
        ...rp.args.record,
        userId: rp.context.user.id,
        isDeleted: false,
      };
      return next(rp);
    })
    .withMiddlewares([authMiddlewareGql]),
  workspaceUpdateOne: workspaceTC.mongooseResolvers
    .updateOne({
      record: {
        removeFields: [
          'userId',
          'isDeleted',
          '_id',
          'updatedAt',
          'createdAt',
          'slug',
        ],
      },
      filter: {
        removeFields: [
          'userId',
          'updatedAt',
          'createdAt',
          'emoji',
          'description',
          'isDeleted',
        ],
      },
    })
    .wrapResolve((next) => (rp) => {
      // forcibly set this arg to logged user id
      rp.args.record = {
        ...rp.args.record,
        userId: rp.context.user.id,
        isDeleted: false,
      };
      return next(rp);
    })
    .withMiddlewares([authMiddlewareGql]),
  workspaceDeleteOne: workspaceTC.getResolver('softDeleteOne'),
});

export default schemaComposer.buildSchema();
