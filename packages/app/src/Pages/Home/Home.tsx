import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { AppBar } from '../../Components/AppBar/AppBar';
import { Drawer } from '../../Components/Drawer/Drawer';
import { Workspace } from '../../Pages/Workspace/Workspace';

export const Home = () => {
  const [isDrawerOpen, setDrawerOpenState] = useState(false);

  const handelDrawer = () => {
    setDrawerOpenState(!isDrawerOpen);
  };

  return (
    <React.Fragment>
      <div className="h-screen bg-gray-50 overflow-y-hidden">
        <AppBar isDrawerOpen={isDrawerOpen} handleDrawerOpen={handelDrawer} />
        <div className="content-container flex flex-1 overflow-hidden">
          <Drawer isDrawerOpen={isDrawerOpen} />
          <main className="flex-1 p-5 max-h-full overflow-hidden overflow-y-scroll">
            <Switch>
              <Route exact path="/">
                <div>Dashboard</div>
              </Route>
              <Route exact path="/timeline">
                <div>Timeline</div>
              </Route>
              <Route exact path="/readlist">
                <div>Read List</div>
              </Route>
              <Route exact path="/workspace">
                <Workspace />
              </Route>
              <Route path="*">
                <div>Not Found</div>
              </Route>
            </Switch>
          </main>
        </div>
      </div>
    </React.Fragment>
  );
};
