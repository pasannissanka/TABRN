import React, { useContext, useEffect } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import { AppContext } from '../../Context/AppContextProvider';
import { BreadcrumbsContext } from '../../Context/BreadcrumbsContextProvider';
import {
  EnumDKeyViewKind,
  useGetViewQuery,
} from '../../Types/generated-graphql-types';
import { ListView } from './ListView/ListView';

type ViewsProps = {
  level: number;
};

export const Views = ({ level }: ViewsProps) => {
  const { path } = useRouteMatch();

  const { workspaceData } = useContext(AppContext);
  const { navData, setNavData } = useContext(BreadcrumbsContext);

  const { view_slug } = useParams<{
    work_slug: string;
    view_slug: string;
  }>();

  const [result] = useGetViewQuery({
    requestPolicy: 'cache-first',
    variables: {
      viewSlug: view_slug,
      workspaceId: workspaceData?.workspaceData?._id,
    },
    pause: !view_slug || !workspaceData,
  });

  const viewData = result.data;

  useEffect(() => {
    if (viewData) {
      setNavData([
        ...[navData[0]],
        {
          level: 1,
          title: viewData.getView?.title!,
          description: viewData.getView?.description as string,
          path: path,
        },
      ]);
    }
    return () => {
      setNavData([...[navData[0]]]);
    };
  }, [viewData]);

  return (
    <>
      <div className="mx-auto">
        <div>
          {viewData?.getView?.kind === EnumDKeyViewKind.ListView ? (
            <ListView viewData={viewData?.getView}></ListView>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </>
  );
};
