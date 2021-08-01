import React from 'react';
import { QueryClient, useQuery } from 'react-query';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AuthContext } from './Context/AuthContextProvider';
import { Login } from './Pages/Login/Login';
import { getUser } from './Query/api';
import PrivateRoute from './Utils/PrivateRoute';
import PublicRoute from './Utils/PublicRoute';

const queryClient = new QueryClient();

function App() {
  const { data, isLoading } = useQuery('loggedUser', getUser, { retry: false });

  return (
    <div className="App">
      <AuthContext.Provider
        value={{
          user: data,
          isLoading: isLoading,
        }}
      >
        <BrowserRouter>
          <Switch>
            <PublicRoute exact path="/login">
              <Login />
            </PublicRoute>
            <PrivateRoute exact path="/">
              HERE
            </PrivateRoute>
            <Route path="*">
              <div>NOT FOUND</div>
            </Route>
          </Switch>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
