import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AuthContext } from './Context/AuthContextProvider';
import { Home } from './Pages/Home/Home';
import { Login } from './Pages/Login/Login';
import { getUser } from './Query/api';
import { IUser } from './Types/types';
import PrivateRoute from './Utils/PrivateRoute';
import PublicRoute from './Utils/PublicRoute';

function App() {
  const [user, setuser] = useState<IUser>();
  const { data, isLoading } = useQuery('loggedUser', getUser, { retry: false });

  useEffect(() => {
    if (data) {
      setuser(data);
    }
  }, [data]);

  return (
    <div className="App">
      <AuthContext.Provider
        value={{
          user: user,
          setUser: setuser,
          isLoading: isLoading,
        }}
      >
        <BrowserRouter>
          <Switch>
            <PublicRoute exact path="/login">
              <Login />
            </PublicRoute>
            <PrivateRoute path="/">
              <Home />
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
