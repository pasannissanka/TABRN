import { schemaComposer } from 'graphql-compose';
import ViewSchema from './view.resolver';
import EntrySchema from './entry.resolver';

schemaComposer.merge(ViewSchema);
schemaComposer.merge(EntrySchema);

export default schemaComposer.buildSchema();
