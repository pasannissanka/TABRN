import { cacheExchange } from '@urql/exchange-graphcache';
import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Client, dedupExchange, fetchExchange, Provider } from 'urql';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

const queryClient = new QueryClient();

const client = new Client({
  url: 'http://localhost:4001/graphql',
  exchanges: [dedupExchange, cacheExchange({}), fetchExchange],
  fetchOptions: {
    credentials: 'include',
  },
});

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider value={client}>
        <App />
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
