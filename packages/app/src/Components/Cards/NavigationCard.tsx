import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as BriefcaseSVG } from '../../svg/briefcase.svg';
import { ReactComponent as ChevronRightSVG } from '../../svg/chevron-right.svg';
import { ReactComponent as DotsVerticalSVG } from '../../svg/dots-vertical.svg';
import {
  Dropdown,
  DropdownButonElement,
  DropdownLinkElement,
} from '../Dropdown/Dropdown';

interface NavigationCardProps {
  id?: string;
  title?: string;
  children?: React.ReactNode;
  icon?: React.ReactElement;
  action: 'link' | 'button';
  to?: string;
  onClick?: () => {};
  secondaryAction?: 'button' | 'menu' | 'none';
  secondaryOnClick?: () => {};
  secondaryItems?: (DropdownButonElement | DropdownLinkElement)[];
  loading?: boolean;
}

export const NavigationCard = ({
  title,
  id,
  children,
  action,
  to = '/',
  onClick,
  loading = false,
  icon,
  secondaryAction = 'none',
  secondaryOnClick,
  secondaryItems,
}: NavigationCardProps) => {
  const Secondry = () => {
    if (secondaryAction === 'button' && secondaryOnClick && !loading) {
      return (
        <div>
          <span className="flex">
            <ChevronRightSVG />
          </span>
        </div>
      );
    } else if (secondaryAction === 'menu' && secondaryItems && !loading) {
      return (
        <Dropdown
          buttonProps={{
            varient: 'flat',
            size: 'sm',
            children: <DotsVerticalSVG />,
          }}
          items={secondaryItems}
          optKey={id}
          key={id}
        />
      );
    } else if (loading) {
      return (
        <div>
          <span className="flex w-6 h-6 bg-gray-300 rounded"></span>
        </div>
      );
    } else {
      return <></>;
    }
  };

  return (
    <>
      <div className="mx-3 my-2 max-w-full">
        <div
          className={`px-5 py-3 w-full bg-gray-50 border rounded-md shadow-sm 
          ${loading ? 'animate-pulse' : ''}
        `}
        >
          <div className="flex justify-between">
            {action === 'link' ? (
              <Link to={to} className="flex w-full text-lg space-x-3">
                <span
                  className={`${loading ? 'h-6 w-6 bg-gray-300 rounded' : ''}`}
                >
                  {icon}
                </span>
                <span
                  className={`flex flex-row ${
                    loading ? 'h-6 bg-gray-300 rounded w-[50px]' : 'w-full '
                  }`}
                >
                  {title}
                </span>
              </Link>
            ) : (
              <div className="flex w-full space-x-3" onClick={onClick}>
                <span
                  className={`${loading ? 'h-6 w-6 bg-gray-300 rounded' : ''}`}
                >
                  {icon}
                </span>
                <span
                  className={`flex flex-row ${
                    loading ? 'h-6 bg-gray-300 rounded w-72' : 'w-full '
                  }`}
                >
                  {title}
                </span>
              </div>
            )}
            <Secondry />
          </div>
          {children}
        </div>
      </div>
    </>
  );
};
