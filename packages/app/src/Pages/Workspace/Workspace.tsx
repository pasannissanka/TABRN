import { Form, Formik, FormikProps } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { Route, Switch, useParams, useRouteMatch } from 'react-router-dom';
import { Breadcrumbs } from '../../Components/Breadcrumbs/Breadcrumbs';
import ContentModal, {
  ContentModalFormikType,
} from '../../Components/Modal/ContentModal/ContentModal';
import { AppContext } from '../../Context/AppContextProvider';
import { BreadcrumbsContext } from '../../Context/BreadcrumbsContextProvider';
import {
  EnumCollectionType,
  useCollectionPaginateQuery,
  useGetWorkspaceQuery,
  useNewCollectionMutation,
} from '../../Types/generated-graphql-types';
import { CollectionBase, FIELD_TYPE, NavDataBC } from '../../Types/types';
import { CollectionsDashboard } from '../Collection/CollectionsDashboard';
import { NewCollection } from './Modals/NewCollection';

export interface NewWorkspaceFormikType extends ContentModalFormikType {
  collectionType: EnumCollectionType | '';
}

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

          {newActionOpen && (
            <Formik<NewWorkspaceFormikType>
              initialValues={{
                title: '',
                description: '',
                emoji: '',
                fields: [
                  {
                    key: 'Created on',
                    kind: FIELD_TYPE.DATE,
                    value: new Date().toString(),
                  },
                ],
                collectionType: '',
              }}
              onSubmit={(values) => {
                console.log(values);
              }}
            >
              {({
                resetForm,
                setFieldValue,
                submitForm,
                values,
              }: FormikProps<NewWorkspaceFormikType>) => (
                <Form>
                  <ContentModal<NewWorkspaceFormikType>
                    show={newActionOpen}
                    onClose={() => {
                      setNewActionOpen(false);
                      resetForm();
                    }}
                    size="full"
                  >
                    <NewCollection
                      mode="new"
                      setFieldValue={setFieldValue}
                      onClose={() => {
                        setNewActionOpen(false);
                        resetForm();
                      }}
                      submitForm={submitForm}
                      values={values}
                    />
                  </ContentModal>
                </Form>
              )}
            </Formik>
          )}
        </BreadcrumbsContext.Provider>
      </div>
    </>
  );
};
