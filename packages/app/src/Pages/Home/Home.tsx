import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { AppBar } from '../../Components/AppBar/AppBar';
import { Drawer } from '../../Components/Drawer/Drawer';
import { AppContext } from '../../Context/AppContextProvider';
import { AppContextState, WorkspaceState } from '../../Types/types';
import { WorkspacesDashboard } from '../Workspace/WorkspacesDashboard';
import { WorkspaceItem } from '../Workspace/Workspace';

export const Home = () => {
  const [isDrawerOpen, setDrawerOpenState] = useState(false);
  const [workspaceData, setWorkspaceData] = useState<WorkspaceState>();
  const handelDrawer = () => {
    setDrawerOpenState(!isDrawerOpen);
  };

  const appStateInit: AppContextState = { workspaceData, setWorkspaceData };

  return (
    <React.Fragment>
      <AppContext.Provider value={appStateInit}>
        <div className="h-screen bg-gray-50 overflow-y-hidden">
          <AppBar isDrawerOpen={isDrawerOpen} handleDrawerOpen={handelDrawer} />
          <div className="content-container flex overflow-hidden overflow-y-scroll">
            <Drawer isDrawerOpen={isDrawerOpen} />
            <main className="flex-1 p-5 max-h-full">
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
                  <WorkspacesDashboard />
                </Route>
                <Route path="/w/:work_slug">
                  <WorkspaceItem />
                </Route>
                <Route path="*">
                  <div>Not Found</div>
                </Route>
              </Switch>
            </main>
          </div>
        </div>
      </AppContext.Provider>
    </React.Fragment>
  );
};
