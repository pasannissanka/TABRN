import { schemaComposer } from 'graphql-compose';
import { composeMongoose } from 'graphql-compose-mongoose';
import {
  authMiddlewareGql,
  GqlComposeAuthWrapper,
} from '../helpers/auth/authenticate';
import { defaultFieldsGQL } from '../helpers/defaults/gqlComposeDefaults';
import { CollectionModel } from '../modules/collection/model/collection.model';

const CollectionTC = composeMongoose(CollectionModel, {
  name: 'Collections',
});

schemaComposer.Query.addFields({
  collectionFind: CollectionTC.mongooseResolvers
    .findMany({
      filter: {
        removeFields: [...defaultFieldsGQL, 'emoji'],
      },
    })
    .wrapResolve(GqlComposeAuthWrapper)
    .withMiddlewares([authMiddlewareGql]),
  collectionById: CollectionTC.mongooseResolvers
    .findById()
    .wrapResolve(GqlComposeAuthWrapper)
    .withMiddlewares([authMiddlewareGql]),
  collectionPaginate: CollectionTC.mongooseResolvers
    .pagination()
    .wrapResolve(GqlComposeAuthWrapper)
    .withMiddlewares([authMiddlewareGql]),
  collectionCount: CollectionTC.mongooseResolvers
    .count()
    .wrapResolve(GqlComposeAuthWrapper)
    .withMiddlewares([authMiddlewareGql]),
});

schemaComposer.Mutation.addFields({
  collectionCreateOne: CollectionTC.mongooseResolvers
    .createOne({
      record: {
        removeFields: defaultFieldsGQL,
      },
    })
    .wrapResolve(GqlComposeAuthWrapper)
    .withMiddlewares([authMiddlewareGql]),
  collectionUpdateById: CollectionTC.mongooseResolvers
    .updateById({
      record: {
        removeFields: defaultFieldsGQL,
      },
    })
    .wrapResolve(GqlComposeAuthWrapper)
    .withMiddlewares([authMiddlewareGql]),
});

export default schemaComposer.buildSchema();
