import { schemaComposer } from 'graphql-compose';
import { composeWithMongooseDiscriminators } from 'graphql-compose-mongoose';
import { authMiddlewareGql } from '../helpers/auth/authenticate';
import { BookmarkModel } from '../modules/workspace-entry/model/bookmark.model';
import { EntryModel } from '../modules/workspace-entry/model/entry.model';
import { NoteModel } from '../modules/workspace-entry/model/note.model';
import { ViewDTC } from './view.resolver';
import { workspaceTC } from './workspace.resolver';

// Mongoose Resolver options
const EntryDTC = composeWithMongooseDiscriminators(EntryModel, {
  resolvers: {
    pagination: {
      findManyOpts: {
        filter: {
          removeFields: ['userId', 'isDeleted', 'createdAt', 'updatedAt'],
        },
      },
    },
  },
});
const BookmarkTC = EntryDTC.discriminator(BookmarkModel, {
  resolvers: {
    pagination: {
      findManyOpts: {
        filter: {
          removeFields: [
            'userId',
            'isDeleted',
            'createdAt',
            'updatedAt',
            'linkData',
          ],
        },
      },
    },
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
        removeFields: [
          'userId',
          'isDeleted',
          'description',
          'filterProperties',
        ],
      },
    },
  },
});
const NoteTC = EntryDTC.discriminator(NoteModel, {
  resolvers: {
    pagination: {
      findManyOpts: {
        filter: {
          removeFields: ['userId', 'isDeleted', 'createdAt', 'updatedAt'],
        },
      },
    },
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
        removeFields: ['_id', 'userId', 'isDeleted', 'description', 'linkData'],
      },
    },
  },
});

// Reationships
EntryDTC.addRelation('workspace', {
  resolver: () => workspaceTC.mongooseResolvers.findById(),
  prepareArgs: {
    _id: (source) => source.workspaceId,
  },
  projection: { workspaceId: 1 },
});

EntryDTC.addRelation('view', {
  resolver: () => ViewDTC.getResolver('findById'),
  prepareArgs: {
    _id: (source) => source.viewId,
  },
  projection: { viewId: 1 },
});

// Query/ Mutation resolvers
schemaComposer.Query.addFields({
  entriesPagination: EntryDTC.getResolver('pagination')
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
  bookmarksPagination: BookmarkTC.getResolver('pagination').wrapResolve(
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
  viewBookmarkEntries: BookmarkTC.getResolver('findMany').wrapResolve(
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
  getBookmarkEntry: BookmarkTC.getResolver('findOne').wrapResolve(
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
  notesPagination: NoteTC.getResolver('pagination').wrapResolve(
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
  viewNoteEntries: NoteTC.getResolver('findMany').wrapResolve(
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
  getNoteEntry: NoteTC.getResolver('findOne').wrapResolve((next) => (rp) => {
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
  createNote: NoteTC.getResolver('createOne')
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
  createBookmark: BookmarkTC.getResolver('createOne')
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
