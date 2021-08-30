import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../../Components/Button/Button';
import { ViewsCard } from '../../Components/Cards/ViewsCard/ViewsCard';
import { AppContext } from '../../Context/AppContextProvider';
import { ReactComponent as PlusSMSVG } from '../../svg/plus-sm.svg';
import {
  useGetWorkspaceQuery,
  useViewsPaginationQuery,
} from '../../Types/generated-graphql-types';

export const WorkspaceItem = () => {
  const { work_slug } = useParams<{ work_slug: string }>();
  const { setWorkspaceData } = useContext(AppContext);

  const [result] = useGetWorkspaceQuery({
    variables: {
      slug: work_slug,
    },
    requestPolicy: 'cache-first',
    pause: !work_slug,
  });

  const { data, fetching } = result;
  const dataWorkspace = data?.workspaceOne;

  const [resultViews] = useViewsPaginationQuery({
    variables: {
      workspaceId: dataWorkspace?._id,
    },
    requestPolicy: 'cache-and-network',
    pause: fetching || !dataWorkspace?._id,
  });

  const dataViews = resultViews.data?.viewsPagination;

  useEffect(() => {
    if (dataWorkspace) {
      setWorkspaceData({
        workspaceSlug: dataWorkspace.slug!,
        workspaceData: dataWorkspace,
      });
    }
    // return () => {
    //   setWorkspaceData(undefined);
    // };
  }, [dataWorkspace]);

  return (
    <>
      <div className="container mx-auto">
        <div className="grid gap-7 grid-cols-3 mt-3">
          <div className="col-span-3 lg:col-span-2">
            <div>
              <div className="flex justify-between">
                <h2 className="text-2xl font-semibold">
                  {dataWorkspace?.emoji?.emoji} {dataWorkspace?.title}
                </h2>
              </div>
              <h4 className="line-clamp-2 my-4 text-base">
                {dataWorkspace?.description}
              </h4>
              <div className="flex gap-1 justify-end">
                <Button varient="flat" size="sm">
                  Filter
                </Button>
                <Button varient="flat" size="sm">
                  <PlusSMSVG className="flex-1 mr-1 w-5 h-5" /> New
                </Button>
              </div>
              <div className="mt-1 border"></div>
            </div>
            <div>
              {dataViews?.items
                ?.filter((view) => !view?.isDeleted)
                .map((view, idx) => {
                  return (
                    <ViewsCard
                      key={view?._id}
                      viewData={view!}
                      viewType={view?.kind!}
                    >
                      <div></div>
                    </ViewsCard>
                  );
                })}
            </div>
          </div>
          <div className="hidden col-span-1 lg:block">Side Summary</div>
        </div>
      </div>
    </>
  );
};
