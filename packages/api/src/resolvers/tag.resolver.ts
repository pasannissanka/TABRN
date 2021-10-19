import { schemaComposer } from 'graphql-compose';
import { composeMongoose } from 'graphql-compose-mongoose';
import {
  authMiddlewareGql,
  GqlComposeAuthWrapper,
} from '../helpers/auth/authenticate';
import { defaultFieldsGQL } from '../helpers/defaults/gqlComposeDefaults';
import { TagModel } from '../modules/tags/model/tag.model';

const TagTC = composeMongoose(TagModel, {
  name: 'Tag',
});

schemaComposer.Query.addFields({
  TagFind: TagTC.mongooseResolvers
    .findMany({
      filter: {
        removeFields: defaultFieldsGQL,
      },
    })
    .wrapResolve(GqlComposeAuthWrapper)
    .withMiddlewares([authMiddlewareGql]),
  TagById: TagTC.mongooseResolvers
    .findById()
    .wrapResolve(GqlComposeAuthWrapper)
    .withMiddlewares([authMiddlewareGql]),
  TagPaginate: TagTC.mongooseResolvers
    .pagination()
    .wrapResolve(GqlComposeAuthWrapper)
    .withMiddlewares([authMiddlewareGql]),
  TagCount: TagTC.mongooseResolvers
    .count()
    .wrapResolve(GqlComposeAuthWrapper)
    .withMiddlewares([authMiddlewareGql]),
});

schemaComposer.Mutation.addFields({
  TagCreateOne: TagTC.mongooseResolvers
    .createOne({
      record: {
        removeFields: defaultFieldsGQL,
      },
    })
    .wrapResolve(GqlComposeAuthWrapper)
    .withMiddlewares([authMiddlewareGql]),
  TagUpdateById: TagTC.mongooseResolvers
    .updateById({
      record: {
        removeFields: defaultFieldsGQL,
      },
    })
    .wrapResolve(GqlComposeAuthWrapper)
    .withMiddlewares([authMiddlewareGql]),
});

export default schemaComposer.buildSchema();
