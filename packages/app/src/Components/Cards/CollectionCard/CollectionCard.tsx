import React from 'react';
import { Collection } from '../../../Types/generated-graphql-types';
import Button from '../../Button/Button';

type CollectionCardProps = {
  data: Collection;
  children: React.ReactNode;
};

export const CollectionCard = ({ data, children }: CollectionCardProps) => {
  return (
    <>
      <div className="my-3 px-4 py-2 w-full bg-white border rounded-md">
        {/* Title */}
        <div className="flex justify-between">
          <span className="w-2/3 text-left text-lg font-medium truncate">
            {data.icon} {data.title}
          </span>
          <span>
            <Button varient="flat">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </Button>
          </span>
        </div>
        {/* Description */}
        <div className="my-1 w-full text-gray-600 text-base truncate">
          {data.description}
        </div>
        {/* Actions */}
        <div></div>
        <div className="my-1 w-full border-b"></div>

        <div className="my-2 w-full">{children}</div>
      </div>
    </>
  );
};
