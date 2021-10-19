import { schemaComposer } from 'graphql-compose';
import WorkspaceSchema from './workspace.resolver';
import CollectionSchema from './collection.resolver';
import EntrySchema from './entry.resolver';

schemaComposer.merge(WorkspaceSchema);
schemaComposer.merge(CollectionSchema);
schemaComposer.merge(EntrySchema);

export default schemaComposer.buildSchema();
