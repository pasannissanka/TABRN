import { schemaComposer } from 'graphql-compose';
import WorkspaceSchema from './workspace.resolver';
import ViewSchema from './view.resolver';

schemaComposer.merge(WorkspaceSchema);
schemaComposer.merge(ViewSchema);

export default schemaComposer.buildSchema();
