import React, { useContext, useEffect, useState } from 'react';
import { Route, Switch, useParams, useRouteMatch } from 'react-router-dom';
import { Breadcrumbs } from '../../Components/Breadcrumbs/Breadcrumbs';
import Button from '../../Components/Button/Button';
import { AppContext } from '../../Context/AppContextProvider';
import { BreadcrumbsContext } from '../../Context/BreadcrumbsContextProvider';
import { ReactComponent as PlusSMSVG } from '../../svg/plus-sm.svg';
import { useGetWorkspaceQuery } from '../../Types/generated-graphql-types';
import { NavDataBC } from '../../Types/types';
import { Views } from '../Views/Views';

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
          path: path,
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
          <div className="grid gap-7 grid-cols-3 mt-3">
            <div className="col-span-3 lg:col-span-2">
              <Breadcrumbs>
                <div className="flex gap-1 justify-end">
                  <Button varient="flat" size="sm">
                    Filter
                  </Button>
                  <Button varient="flat" size="sm">
                    <PlusSMSVG className="flex-1 mr-1 w-5 h-5" /> New
                  </Button>
                </div>
              </Breadcrumbs>
              <div>
                <Switch>
                  <Route exact path={path}>
                    test
                  </Route>
                  <Route exact path={`${path}/:view_slug`}>
                    <Views level={1} />
                  </Route>
                </Switch>
              </div>
            </div>
            <div className="hidden col-span-1 lg:block">Side Summary</div>
          </div>
        </BreadcrumbsContext.Provider>
      </div>
    </>
  );
};
