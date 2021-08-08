import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getWorkspace } from '../../Query/api';

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
                <h2 className="text-2xl font-semibold">{data?.title}</h2>
                {/* <div>
                  <Button className="flex w-full" varient="outline">
                    <span>
                      <PlusSMSVG className="flex-1 mr-1 w-5 h-5" />
                    </span>
                    <span>New</span>
                  </Button>
                </div> */}
              </div>
              <div className="mt-3 border"></div>
            </div>
          </div>
          <div className="hidden col-span-1 lg:block">Side Summary</div>
        </div>
      </div>
    </>
  );
};
