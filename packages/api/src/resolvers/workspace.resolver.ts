import { schemaComposer } from 'graphql-compose';
import { composeMongoose } from 'graphql-compose-mongoose';
import {
  authMiddlewareGql,
  GqlComposeAuthWrapper,
} from '../helpers/auth/authenticate';
import {
  defaultFieldsGQL as defaultFields,
  defaultFilterFields,
} from '../helpers/defaults/gqlComposeDefaults';
import { WorkspaceModel } from '../modules/workspace/model/workspace.model';

const WorkspaceTC = composeMongoose(WorkspaceModel, {
  name: 'Workspace',
});

schemaComposer.Query.addFields({
  workspaceFind: WorkspaceTC.mongooseResolvers
    .findMany({
      filter: { removeFields: [...defaultFilterFields, 'emoji'] },
    })
    .wrapResolve(GqlComposeAuthWrapper)
    .withMiddlewares([authMiddlewareGql]),
  workspaceById: WorkspaceTC.mongooseResolvers
    .findById()
    .wrapResolve(GqlComposeAuthWrapper)
    .withMiddlewares([authMiddlewareGql]),
  workspaceOne: WorkspaceTC.mongooseResolvers
    .findOne({
      filter: { removeFields: [...defaultFilterFields, 'emoji'] },
    })
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
  workspaceUpdate: WorkspaceTC.mongooseResolvers
    .updateOne({
      filter: { removeFields: [...defaultFilterFields, 'emoji'] },
      record: {
        removeFields: defaultFields,
      },
    })
    .wrapResolve(GqlComposeAuthWrapper)
    .withMiddlewares([authMiddlewareGql]),
});

export default schemaComposer.buildSchema();
