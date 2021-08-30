import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../../Components/Button/Button';
import { AppContext } from '../../Context/AppContextProvider';
import {
  EnumDKeyViewKind,
  useGetViewQuery,
} from '../../Types/generated-graphql-types';
import { ListView } from './ListView/ListView';
import { ReactComponent as PlusSMSVG } from '../../svg/plus-sm.svg';

export const Views = () => {
  const { view_slug, work_slug } =
    useParams<{ work_slug: string; view_slug: string }>();
  const { workspaceData } = useContext(AppContext);

  const [result] = useGetViewQuery({
    requestPolicy: 'cache-first',
    variables: {
      viewSlug: view_slug,
      workspaceId: workspaceData?.workspaceData?._id,
    },
    pause: !view_slug || !workspaceData,
  });

  const viewData = result.data;

  return (
    <>
      <div className="container mx-auto">
        <div className="grid gap-7 grid-cols-3 mt-3">
          <div className="col-span-3 lg:col-span-2">
            <div>
              <div className="flex justify-between">
                <h2 className="text-2xl font-semibold">
                  {workspaceData?.workspaceData?.emoji?.emoji}{' '}
                  <span className="text-gray-500 font-medium">
                    {workspaceData?.workspaceData?.title}/
                  </span>{' '}
                  {viewData?.getView?.title}
                </h2>
              </div>
              <h4 className="line-clamp-2 my-4 text-base">
                {viewData?.getView?.description}
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
              {viewData?.getView?.kind === EnumDKeyViewKind.ListView ? (
                <ListView></ListView>
              ) : (
                <div></div>
              )}
            </div>
          </div>
          <div className="hidden col-span-1 lg:block">Side Summary</div>
        </div>
      </div>
    </>
  );
};
