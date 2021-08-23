import { schemaComposer } from 'graphql-compose';
import WorkspaceSchema from './workspace.resolver';
import ViewSchema from './view.resolver';
import EntrySchema from './entry.resolver';

schemaComposer.merge(WorkspaceSchema);
schemaComposer.merge(ViewSchema);
schemaComposer.merge(EntrySchema);

export default schemaComposer.buildSchema();
