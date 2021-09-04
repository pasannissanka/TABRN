import React, { useContext, useEffect, useState } from 'react';
import { Route, Switch, useParams, useRouteMatch } from 'react-router-dom';
import { Breadcrumbs } from '../../Components/Breadcrumbs/Breadcrumbs';
import { AppContext } from '../../Context/AppContextProvider';
import { BreadcrumbsContext } from '../../Context/BreadcrumbsContextProvider';
import { useGetWorkspaceQuery } from '../../Types/generated-graphql-types';
import { NavDataBC } from '../../Types/types';
import { Views } from '../WorkspaceViews/Views';
import { WorkspaceItemDashboard } from './Dashboard/WorkspaceItemDashboard';

export const WorkspaceItem = () => {
  const { work_slug } = useParams<{ work_slug: string }>();
  const { setWorkspaceData } = useContext(AppContext);

  const [navData, setNavData] = useState<NavDataBC[]>([]);

  const { path } = useRouteMatch();

  const [result] = useGetWorkspaceQuery({
    variables: {
      slug: work_slug,
    },
    requestPolicy: 'cache-first',
    pause: !work_slug,
  });

  const { data } = result;
  const dataWorkspace = data?.workspaceOne;

  useEffect(() => {
    if (dataWorkspace) {
      setWorkspaceData({
        workspaceSlug: dataWorkspace.slug!,
        workspaceData: dataWorkspace,
      });
      setNavData([
        {
          level: 0,
          title: dataWorkspace.title,
          path: path.replace(':work_slug', dataWorkspace.slug as string),
          description: dataWorkspace.description as string,
          icon: dataWorkspace.emoji?.emoji!,
        },
      ]);
    }
    // return () => {
    //   setWorkspaceData(undefined);
    // };
  }, [dataWorkspace]);

  return (
    <>
      <div className="container mx-auto">
        <BreadcrumbsContext.Provider
          value={{
            navData,
            setNavData,
          }}
        >
          <div className="mt-3">
            <div className="">
              <Breadcrumbs />
              <div>
                <Switch>
                  <Route exact path={path}>
                    <WorkspaceItemDashboard />
                  </Route>
                  <Route exact path={`${path}/:view_slug`}>
                    <Views level={1} />
                  </Route>
                </Switch>
              </div>
            </div>
          </div>
        </BreadcrumbsContext.Provider>
      </div>
    </>
  );
};
