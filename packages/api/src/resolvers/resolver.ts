import { schemaComposer } from 'graphql-compose';
import { composeMongoose } from 'graphql-compose-mongoose';
import { authMiddlewareGql } from '../helpers/auth/authenticate';
import { WorkspaceModel } from '../modules/workspace/model/workspace.model';

const workspaceTC = composeMongoose(WorkspaceModel, {});

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
  workspaceUpdateOne: workspaceTC.mongooseResolvers.updateOne(),
});

const schema = schemaComposer.buildSchema();
export default schema;
