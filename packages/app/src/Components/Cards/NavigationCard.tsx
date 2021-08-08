import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from '@headlessui/react';
import { ReactComponent as BriefcaseSVG } from '../../svg/briefcase.svg';
import { ReactComponent as ChevronRightSVG } from '../../svg/chevron-right.svg';
import { ReactComponent as DotsVerticalSVG } from '../../svg/dots-vertical.svg';

interface NavigationCardProps {
  id?: string;
  title?: string;
  content?: string | React.ReactElement;
  icon?: React.ReactElement;

  action: 'link' | 'button';
  to?: string;
  onClick?: () => {};

  secondaryAction?: 'button' | 'menu' | 'none';
  secondaryOnClick?: () => {};
  secondaryItems?: MenuItemProp[];
  loading?: boolean;
}

export interface MenuItemProp {
  icon: React.ReactElement;
  id?: string;
  type: string;
  title: string;
  index?: number;
  onClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    key: string
  ) => void;
}

export const NavigationCard = ({
  title,
  id,
  content,
  action,
  to = '/',
  onClick,
  loading = false,
  icon = loading ? undefined : <BriefcaseSVG />,
  secondaryAction = 'none',
  secondaryOnClick,
  secondaryItems,
}: NavigationCardProps) => {
  useEffect(() => {
    if (loading) {
      title = '';
      content = '';
    }
  }, [loading]);

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
        <Menu as="div" className="relative inline-block">
          <Menu.Button>
            <DotsVerticalSVG />
          </Menu.Button>
          <Menu.Items className="absolute z-50 right-0 mt-2 w-48 bg-white rounded-md focus:outline-none shadow-lg divide-gray-100 divide-y origin-top-right ring-1 ring-black ring-opacity-5">
            {secondaryItems.map((item, index) => {
              return <MenuItem key={index} id={id!} {...item} index={index} />;
            })}
          </Menu.Items>
        </Menu>
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
      <div className="my-3 max-w-4xl">
        <div
          className={`px-5 py-3 w-full bg-gray-50 border rounded-md shadow-sm 
          ${loading ? 'animate-pulse' : ''}
        `}
        >
          <div className="flex justify-between">
            {action === 'link' ? (
              <Link to={to} className="flex w-full space-x-3">
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
          {typeof content === 'string' || loading ? (
            <div
              className={`mt-2  text-gray-700 text-sm font-normal truncate
              ${loading ? 'h-6 bg-gray-300 rounded w-full' : 'w-full '}`}
            >
              {content}
            </div>
          ) : (
            content
          )}
        </div>
      </div>
    </>
  );
};

export const MenuItem = ({ icon, title, onClick, id }: MenuItemProp) => {
  return (
    <Menu.Item>
      <div>
        <button
          className="flex px-4 py-1 w-full text-black text-base font-medium hover:bg-gray-200 bg-gray-50 focus:outline-none transition-colors duration-300 focus:ring-4 focus:ring-blue-200"
          onClick={(event) => onClick(event, id!)}
        >
          <span>{icon}</span>
          <span>{title}</span>
        </button>
      </div>
    </Menu.Item>
  );
};
