import React, { useContext, useEffect, useState } from 'react';
import { Route, Switch, useParams, useRouteMatch } from 'react-router-dom';
import { Breadcrumbs } from '../../Components/Breadcrumbs/Breadcrumbs';
import { Modal } from '../../Components/Modal/Modal';
import { AppContext } from '../../Context/AppContextProvider';
import { BreadcrumbsContext } from '../../Context/BreadcrumbsContextProvider';
import {
  EnumDKeyViewKind,
  useCreateNewListViewMutation,
  useGetWorkspaceQuery,
} from '../../Types/generated-graphql-types';
import { NavDataBC, WorkspaceViewBase } from '../../Types/types';
import { Views } from '../WorkspaceViews/Views';
import { WorkspaceItemDashboard } from './Dashboard/WorkspaceItemDashboard';
import { NewWorkspaceView } from './NewWorkspaceView';

export const WorkspaceItem = () => {
  const { work_slug } = useParams<{ work_slug: string }>();
  const { path } = useRouteMatch();

  const { setWorkspaceData } = useContext(AppContext);

  const [newActionOpen, setNewActionOpen] = useState(false);
  const [navData, setNavData] = useState<NavDataBC[]>([]);

  const createNewListView = useCreateNewListViewMutation()[1];

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
          actions: [
            {
              type: 'CREATE',
              title: 'New',
              action: (e, d) => {
                console.log(e, d);
                setNewActionOpen(true);
              },
            },
          ],
        },
      ]);
    }
    // return () => {
    //   setWorkspaceData(undefined);
    // };
  }, [dataWorkspace]);

  const handleNewViewSubmit = (
    data: WorkspaceViewBase,
    mode: 'edit' | 'new'
  ) => {
    if (mode === 'new') {
      console.log(data);
      if (data.kind === EnumDKeyViewKind.ListView) {
        createNewListView({
          workspaceId: dataWorkspace?._id,
          description: data.description,
          title: data.title,
        });
      }
    }
  };

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

          <Modal
            show={newActionOpen}
            onClose={() => setNewActionOpen(false)}
            title="New Workspace View"
            description="Use Workspace Views to categorize your content"
            size="full"
          >
            <NewWorkspaceView
              mode={'new'}
              onClose={() => setNewActionOpen(false)}
              onSubmit={handleNewViewSubmit}
              data={{
                title: '',
                description: '',
                kind: '',
              }}
            />
          </Modal>
        </BreadcrumbsContext.Provider>
      </div>
    </>
  );
};
