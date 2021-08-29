import React from 'react';
import { ViewInterface } from '../../../Types/generated-graphql-types';
import Button from '../../Button/Button';
import { ReactComponent as PlusSMSVG } from '../../../svg/plus-sm.svg';

type ViewsCardProps = {
  viewType: string;
  viewData: ViewInterface;
  children: React.ReactNode;
};

export const ViewsCard = ({ viewType, viewData, ...props }: ViewsCardProps) => {
  return (
    <>
      <div className="mx-2 my-2 px-2 py-2 w-full max-w-full">
        <div className="flex">
          <h3 className="text-xl font-semibold">{viewData.title}</h3>
        </div>
        <h4 className="line-clamp-2 my-2 text-base">{viewData.description}</h4>
        <div className="flex gap-1 justify-end">
          <Button varient="flat" size="sm">
            <PlusSMSVG className="flex-1 w-5 h-5" />
          </Button>
        </div>
        <div className="mt-1 border"></div>
        <div className="my-2">{props.children}</div>
      </div>
    </>
  );
};
