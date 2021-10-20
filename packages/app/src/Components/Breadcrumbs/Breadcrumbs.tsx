import React, { useContext } from 'react';
import { BreadcrumbsContext } from '../../Context/BreadcrumbsContextProvider';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import { ReactComponent as PlusSMSVG } from '../../svg/plus-sm.svg';

type BreadcrumbsType = {};

export const Breadcrumbs = (props: BreadcrumbsType) => {
  const { navData } = useContext(BreadcrumbsContext);

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold">
          {navData.map((nav, idx) => {
            return (
              <span key={idx}>
                {nav.icon && nav.icon}{' '}
                <Link
                  to={nav.path}
                  className={
                    idx === navData.length - 1 ? `text-black` : `text-gray-500`
                  }
                >
                  {nav.title}
                  {idx === navData.length - 1 ? '' : '/'}
                </Link>
              </span>
            );
          })}
        </h2>
      </div>
      <h4 className="line-clamp-2 my-4 text-base">
        {navData[navData.length - 1]?.description}
      </h4>
      <div className="flex gap-1 justify-end">
        {navData[navData.length - 1]?.actions?.map((action, idx) => {
          return (
            <Button
              varient="flat"
              size="sm"
              onClick={(e) => action.action(e, navData[navData.length - 1])}
              key={idx}
            >
              {action.type === 'CREATE' ? (
                <PlusSMSVG className="flex-1 mr-1 w-5 h-5" />
              ) : (
                <PlusSMSVG className="flex-1 mr-1 w-5 h-5" />
              )}{' '}
              {action.title}
            </Button>
          );
        })}
      </div>
      <div className="mt-1 border"></div>
    </div>
  );
};
