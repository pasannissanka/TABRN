import { schemaComposer } from 'graphql-compose';
import { composeWithMongooseDiscriminators } from 'graphql-compose-mongoose';
import { ViewModel } from '../modules/workspace-view/model/view.model';
import { ListViewModel } from '../modules/workspace-view/model/listView.model';
import { CalenderViewModel } from '../modules/workspace-view/model/calenderView.model';
import { authMiddlewareGql } from '../helpers/auth/authenticate';

const ViewDTC = composeWithMongooseDiscriminators(ViewModel);
const ListViewTC = ViewDTC.discriminator(ListViewModel, {
  resolvers: {
    createOne: {
      record: {
        removeFields: [
          'userId',
          'isDeleted',
          'createdAt',
          'slug',
          '_id',
          'updatedAt',
        ],
      },
    },
  },
});
const CalenderViewTC = ViewDTC.discriminator(CalenderViewModel, {
  resolvers: {
    createOne: {
      record: {
        removeFields: [
          'userId',
          'isDeleted',
          'createdAt',
          'slug',
          '_id',
          'updatedAt',
        ],
      },
    },
  },
});

schemaComposer.Query.addFields({
  viewsPagination: ViewDTC.getResolver('pagination')
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
  createListView: ListViewTC.getResolver('createOne')
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
  createCalenderView: CalenderViewTC.getResolver('createOne')
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
});

export default schemaComposer.buildSchema();
