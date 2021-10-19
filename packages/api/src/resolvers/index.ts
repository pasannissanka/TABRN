import { schemaComposer } from 'graphql-compose';
import WorkspaceSchema from './workspace.resolver';
import CollectionSchema from './collection.resolver';
import EntrySchema from './entry.resolver';
import TagSchema from './tag.resolver';

schemaComposer.merge(WorkspaceSchema);
schemaComposer.merge(CollectionSchema);
schemaComposer.merge(EntrySchema);
schemaComposer.merge(TagSchema);

export default schemaComposer.buildSchema();
