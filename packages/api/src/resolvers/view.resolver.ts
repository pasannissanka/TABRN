import { schemaComposer } from 'graphql-compose';
import { composeWithMongooseDiscriminators } from 'graphql-compose-mongoose';
import { authMiddlewareGql } from '../helpers/auth/authenticate';
import { CalenderViewModel } from '../modules/workspace-view/model/calenderView.model';
import { ListViewModel } from '../modules/workspace-view/model/listView.model';
import { ViewModel } from '../modules/workspace-view/model/view.model';
import { workspaceTC } from './workspace.resolver';

export const ViewDTC = composeWithMongooseDiscriminators(ViewModel, {
  resolvers: {
    pagination: {
      findManyOpts: {
        filter: {
          removeFields: ['userId', 'isDeleted', 'createdAt', 'updatedAt'],
        },
      },
    },
    findOne: {
      filter: {
        removeFields: ['userId', 'isDeleted', 'createdAt', 'updatedAt'],
      },
    },
  },
});
const ListViewTC = ViewDTC.discriminator(ListViewModel, {
  resolvers: {
    createOne: {
      record: {
        removeFields: [
          'userId',
          'isDeleted',
          'createdAt',
          'updatedAt',
          'slug',
          '_id',
        ],
      },
    },
    findMany: {
      filter: {
        removeFields: [
          '_id',
          'userId',
          'isDeleted',
          'description',
          'filterProperties',
        ],
      },
    },
    findOne: {
      filter: {
        removeFields: ['userId', 'isDeleted', 'createdAt', 'updatedAt'],
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
    findMany: {
      filter: {
        removeFields: ['_id', 'userId', 'isDeleted', 'description'],
      },
    },
    findOne: {
      filter: {
        removeFields: ['userId', 'isDeleted', 'createdAt', 'updatedAt'],
      },
    },
  },
});

ViewDTC.addRelation('workspace', {
  resolver: () => workspaceTC.mongooseResolvers.findById(),
  prepareArgs: {
    _id: (source) => source.workspaceId,
  },
  projection: { workspaceId: 1 },
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
  viewListViews: ListViewTC.getResolver('findMany').wrapResolve(
    (next) => (rp) => {
      // forcibly set this arg to logged user id
      rp.args.filter = {
        ...rp.args.filter,
        userId: rp.context.user.id,
        isDeleted: false,
      };
      return next(rp);
    }
  ),
  viewCalenderViews: CalenderViewTC.getResolver('findMany').wrapResolve(
    (next) => (rp) => {
      // forcibly set this arg to logged user id
      rp.args.filter = {
        ...rp.args.filter,
        userId: rp.context.user.id,
        isDeleted: false,
      };
      return next(rp);
    }
  ),
  getView: ViewDTC.getResolver('findOne').wrapResolve((next) => (rp) => {
    // forcibly set this arg to logged user id
    rp.args.filter = {
      ...rp.args.filter,
      userId: rp.context.user.id,
      isDeleted: false,
    };
    return next(rp);
  }),
  getListView: ListViewTC.getResolver('findOne').wrapResolve((next) => (rp) => {
    // forcibly set this arg to logged user id
    rp.args.filter = {
      ...rp.args.filter,
      userId: rp.context.user.id,
      isDeleted: false,
    };
    return next(rp);
  }),
  getCalenderView: CalenderViewTC.getResolver('findOne').wrapResolve(
    (next) => (rp) => {
      // forcibly set this arg to logged user id
      rp.args.filter = {
        ...rp.args.filter,
        userId: rp.context.user.id,
        isDeleted: false,
      };
      return next(rp);
    }
  ),
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
