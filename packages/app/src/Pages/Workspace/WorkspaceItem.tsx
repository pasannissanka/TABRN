import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Button from '../../Components/Button/Button';
import { getWorkspace } from '../../Query/api';
import { ReactComponent as PlusSMSVG } from '../../svg/plus-sm.svg';

export const WorkspaceItem = () => {
  const { work_slug } = useParams<{ work_slug: string }>();

  const { data } = useQuery(['workspaces-all', work_slug], () =>
    getWorkspace(work_slug)
  );

  console.log(data);

  return (
    <>
      <div className="container mx-auto">
        <div className="grid gap-7 grid-cols-3 mt-3">
          <div className="col-span-3 lg:col-span-2">
            <div>
              <div className="flex justify-between">
                <h2 className="text-2xl font-semibold">
                  {data?.emoji?.emoji} {data?.title}
                </h2>
              </div>
              <h4 className="line-clamp-2 my-4 text-base">
                {data?.description}
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
          </div>
          <div className="hidden col-span-1 lg:block">Side Summary</div>
        </div>
      </div>
    </>
  );
};
