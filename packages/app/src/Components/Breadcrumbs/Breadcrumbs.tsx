import React, { useContext } from 'react';
import { BreadcrumbsContext } from '../../Context/BreadcrumbsContextProvider';

type BreadcrumbsType = {
  children: React.ReactNode;
};

export const Breadcrumbs = ({ children }: BreadcrumbsType) => {
  const { navData } = useContext(BreadcrumbsContext);

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold">
          {navData.map((nav, idx) => {
            return (
              <span>
                {nav.icon && nav.icon}{' '}
                <span
                  className={
                    idx === navData.length - 1 ? `text-black` : `text-gray-500`
                  }
                >
                  {nav.title}
                  {idx === navData.length - 1 ? '' : '/'}
                </span>
              </span>
            );
          })}
        </h2>
      </div>
      <h4 className="line-clamp-2 my-4 text-base">
        {navData[navData.length - 1]?.description}
      </h4>
      {children}
      <div className="mt-1 border"></div>
    </div>
  );
};
