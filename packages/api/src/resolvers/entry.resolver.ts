import { schemaComposer } from 'graphql-compose';
import { composeMongoose } from 'graphql-compose-mongoose';
import {
  authMiddlewareGql,
  GqlComposeAuthWrapper,
} from '../helpers/auth/authenticate';
import { defaultFieldsGQL } from '../helpers/defaults/gqlComposeDefaults';
import { EntryModel } from '../modules/entry/model/entry.model';

const EntryTC = composeMongoose(EntryModel, {
  name: 'Entries',
});

schemaComposer.Query.addFields({
  EntryFind: EntryTC.mongooseResolvers
    .findMany({
      filter: {
        removeFields: [...defaultFieldsGQL, 'emoji'],
      },
    })
    .wrapResolve(GqlComposeAuthWrapper)
    .withMiddlewares([authMiddlewareGql]),
  EntryById: EntryTC.mongooseResolvers
    .findById()
    .wrapResolve(GqlComposeAuthWrapper)
    .withMiddlewares([authMiddlewareGql]),
  EntryPaginate: EntryTC.mongooseResolvers
    .pagination()
    .wrapResolve(GqlComposeAuthWrapper)
    .withMiddlewares([authMiddlewareGql]),
  EntryCount: EntryTC.mongooseResolvers
    .count()
    .wrapResolve(GqlComposeAuthWrapper)
    .withMiddlewares([authMiddlewareGql]),
});

schemaComposer.Mutation.addFields({
  EntryCreateOne: EntryTC.mongooseResolvers
    .createOne({
      record: {
        removeFields: defaultFieldsGQL,
      },
    })
    .wrapResolve(GqlComposeAuthWrapper)
    .withMiddlewares([authMiddlewareGql]),
  EntryUpdateById: EntryTC.mongooseResolvers
    .updateById({
      record: {
        removeFields: defaultFieldsGQL,
      },
    })
    .wrapResolve(GqlComposeAuthWrapper)
    .withMiddlewares([authMiddlewareGql]),
});

export default schemaComposer.buildSchema();
