import { cacheExchange } from '@urql/exchange-graphcache';
import React from 'react';
import ReactDOM from 'react-dom';
import { Client, dedupExchange, fetchExchange, Provider } from 'urql';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import schema from './Graphql/schema.json';
import { IntrospectionData } from '@urql/exchange-graphcache/dist/types/ast';

const client = new Client({
  url: 'http://localhost:4001/graphql',
  exchanges: [
    dedupExchange,
    cacheExchange({
      schema: schema as IntrospectionData,
      keys: {
        PaginationInfo: () => null,
        WorkspaceEmoji: () => null,
      },
    }),
    fetchExchange,
  ],
  fetchOptions: {
    credentials: 'include',
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider value={client}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
