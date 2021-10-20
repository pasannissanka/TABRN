import React, { useContext, useEffect, useState } from 'react';
import { Route, Switch, useParams, useRouteMatch } from 'react-router-dom';
import { Breadcrumbs } from '../../Components/Breadcrumbs/Breadcrumbs';
import { Modal } from '../../Components/Modal/Modal';
import { AppContext } from '../../Context/AppContextProvider';
import { BreadcrumbsContext } from '../../Context/BreadcrumbsContextProvider';
import {
  useCollectionPaginateQuery,
  useGetWorkspaceQuery,
  useNewCollectionMutation,
} from '../../Types/generated-graphql-types';
import { CollectionBase, NavDataBC } from '../../Types/types';
import { CollectionsDashboard } from '../Collection/CollectionsDashboard';
import { NewCollection } from './Modals/NewCollection';

export const WorkspaceItem = () => {
  const { work_slug } = useParams<{ work_slug: string }>();
  const { path } = useRouteMatch();
  const { setWorkspaceData } = useContext(AppContext);

  const [newActionOpen, setNewActionOpen] = useState(false);
  const [navData, setNavData] = useState<NavDataBC[]>([]);

  const createNewCollection = useNewCollectionMutation()[1];
  const [resultW] = useGetWorkspaceQuery({
    variables: {
      slug: work_slug,
    },
    requestPolicy: 'cache-first',
    pause: !work_slug,
  });

  const dataWorkspace = resultW.data?.workspaceOne;

  const [resultC, reexecuteQuery] = useCollectionPaginateQuery({
    variables: {
      filter: {
        workspaceId: dataWorkspace?._id,
      },
    },
    requestPolicy: 'network-only',
    pause: !dataWorkspace?._id,
  });

  const dataCollections = resultC.data;

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
          icon: dataWorkspace.icon as string,
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

  const handleNewCollectionSubmit = (
    data: CollectionBase,
    mode: 'edit' | 'new'
  ) => {
    if (mode === 'new') {
      console.log(data);
      if (data) {
        createNewCollection({
          record: {
            title: data.title,
            description: data.description,
            icon: data.icon,
            type: data.type,
            workspaceId: dataWorkspace?._id,
          },
        }).then(() => {
          reexecuteQuery();
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
                    {dataCollections ? (
                      <CollectionsDashboard
                        data={dataCollections}
                        workspaceId={dataWorkspace?._id}
                      />
                    ) : (
                      <div></div>
                    )}
                  </Route>
                  <Route exact path={`${path}/:collection_slug`}>
                    <div>Collection</div>
                  </Route>
                </Switch>
              </div>
            </div>
          </div>

          <Modal
            show={newActionOpen}
            onClose={() => setNewActionOpen(false)}
            title="New Collection"
            description="Use Collections to categorize your content"
            size="full"
          >
            <NewCollection
              mode={'new'}
              onClose={() => setNewActionOpen(false)}
              onSubmit={handleNewCollectionSubmit}
              data={{
                title: '',
                description: '',
                type: null,
              }}
            />
          </Modal>
        </BreadcrumbsContext.Provider>
      </div>
    </>
  );
};
