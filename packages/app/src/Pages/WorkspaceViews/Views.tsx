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
          path: path
            .replace(':work_slug', workspaceData?.workspaceSlug as string)
            .replace(':view_slug', view_slug),
        },
      ]);
    }
    return () => {
      setNavData([...[navData[0]]]);
    };
  }, [viewData]);

  return (
    <>
      <div className="grid gap-7 grid-cols-3 mt-3">
        <div className="col-span-3 lg:col-span-2">
          {viewData?.getView?.kind === EnumDKeyViewKind.ListView ? (
            <ListView viewData={viewData?.getView}></ListView>
          ) : (
            <div></div>
          )}
        </div>
        <div className="hidden col-span-1 lg:block">Side Summary</div>
      </div>
    </>
  );
};
