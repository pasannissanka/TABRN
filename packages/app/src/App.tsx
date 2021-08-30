import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AuthContext } from './Context/AuthContextProvider';
import { useFetch } from './Hooks/useFetch';
import { Home } from './Pages/Home/Home';
import { Login } from './Pages/Login/Login';
import { IResponse, IUser } from './Types/types';
import PrivateRoute from './Utils/PrivateRoute';
import PublicRoute from './Utils/PublicRoute';

function App() {
  const [user, setUser] = useState<IUser>();
  const { data, isLoading } = useFetch<IResponse<IUser>>(
    'http://localhost:4001/user',
    {
      method: 'GET',
      credentials: 'include',
    }
  );

  useEffect(() => {
    if (data) {
      setUser(data.data);
    }
  }, [data]);

  const getRoutes = () => {
    return (
      <AuthContext.Provider
        value={{
          user,
          setUser,
          isLoading,
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
    );
  };

  return (
    <div className="App">
      {
        <Suspense fallback={<div>loading...</div>}>
          {!data ? <div>Authenticating...</div> : getRoutes()}
        </Suspense>
      }
    </div>
  );
}

export default App;
