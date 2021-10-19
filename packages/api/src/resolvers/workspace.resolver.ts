import { schemaComposer } from 'graphql-compose';
import { composeMongoose } from 'graphql-compose-mongoose';
import {
  authMiddlewareGql,
  GqlComposeAuthWrapper,
} from '../helpers/auth/authenticate';
import { defaultFieldsGQL as defaultFields } from '../helpers/defaults/gqlComposeDefaults';
import { WorkspaceModel } from '../modules/workspace/model/workspace.model';

const WorkspaceTC = composeMongoose(WorkspaceModel, {
  name: 'Workspaces',
});

schemaComposer.Query.addFields({
  workspaceFind: WorkspaceTC.mongooseResolvers
    .findMany({
      filter: {
        removeFields: [...defaultFields, 'emoji'],
      },
    })
    .wrapResolve(GqlComposeAuthWrapper)
    .withMiddlewares([authMiddlewareGql]),
  workspaceById: WorkspaceTC.mongooseResolvers
    .findById()
    .wrapResolve(GqlComposeAuthWrapper)
    .withMiddlewares([authMiddlewareGql]),
  workspacePaginate: WorkspaceTC.mongooseResolvers
    .pagination()
    .wrapResolve(GqlComposeAuthWrapper)
    .withMiddlewares([authMiddlewareGql]),
  workspaceCount: WorkspaceTC.mongooseResolvers
    .count()
    .wrapResolve(GqlComposeAuthWrapper)
    .withMiddlewares([authMiddlewareGql]),
});

schemaComposer.Mutation.addFields({
  workspaceCreateOne: WorkspaceTC.mongooseResolvers
    .createOne({
      record: {
        removeFields: defaultFields,
      },
    })
    .wrapResolve(GqlComposeAuthWrapper)
    .withMiddlewares([authMiddlewareGql]),
  workspaceUpdateById: WorkspaceTC.mongooseResolvers
    .updateById({
      record: {
        removeFields: defaultFields,
      },
    })
    .wrapResolve(GqlComposeAuthWrapper)
    .withMiddlewares([authMiddlewareGql]),
});

export default schemaComposer.buildSchema();
