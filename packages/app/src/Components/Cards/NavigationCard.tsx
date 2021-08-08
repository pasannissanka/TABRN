import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from '@headlessui/react';
import { ReactComponent as BriefcaseSVG } from '../../svg/briefcase.svg';
import { ReactComponent as ChevronRightSVG } from '../../svg/chevron-right.svg';
import { ReactComponent as DotsVerticalSVG } from '../../svg/dots-vertical.svg';

interface NavigationCardProps {
  title: string;
  content: string | React.ReactElement;
  icon?: React.ReactElement;
  action: 'link' | 'button';
  to?: string;
  onClick?: () => {};
  secondryAction?: 'button' | 'menu' | 'none';
  secondryOnClick?: () => {};
  secondryItems?: MenuItemProp[];
}

export interface MenuItemProp {
  icon: React.ReactElement;
  title: string;
  index?: number;
  onClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    key: number
  ) => void;
}

export const NavigationCard = ({
  title,
  content,
  action,
  to = '/',
  onClick,
  icon = <BriefcaseSVG />,
  secondryAction = 'none',
  secondryOnClick,
  secondryItems,
}: NavigationCardProps) => {
  const Secondry = () => {
    if (secondryAction === 'button' && secondryOnClick) {
      return (
        <div>
          <span className="flex">
            <ChevronRightSVG />
          </span>
        </div>
      );
    } else if (secondryAction === 'menu' && secondryItems) {
      return (
        <Menu as="div" className="relative inline-block">
          <Menu.Button>
            <DotsVerticalSVG />
          </Menu.Button>
          <Menu.Items className="absolute z-50 right-0 mt-2 w-48 bg-white rounded-md focus:outline-none shadow-lg divide-gray-100 divide-y origin-top-right ring-1 ring-black ring-opacity-5">
            {secondryItems.map((item, index) => {
              return (
                <MenuItem
                  key={index}
                  icon={item.icon}
                  title={item.title}
                  onClick={item.onClick}
                  index={index}
                />
              );
            })}
          </Menu.Items>
        </Menu>
      );
    } else {
      return <></>;
    }
  };

  return (
    <>
      <div className="my-3 max-w-4xl">
        <div className="px-5 py-3 w-full bg-gray-50 border rounded-md shadow-sm">
          <div className="flex justify-between">
            {action === 'link' ? (
              <Link to={to} className="flex w-full space-x-3">
                <span>{icon}</span>
                <span className="flex flex-row w-full">{title}</span>
              </Link>
            ) : (
              <div className="flex w-full space-x-3" onClick={onClick}>
                <span>{icon}</span>
                <span className="flex flex-row w-full">{title}</span>
              </div>
            )}
            <Secondry />
          </div>
          {typeof content === 'string' ? (
            <div className="mt-2 w-full text-gray-700 text-sm font-normal truncate">
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

export const MenuItem = ({ icon, title, onClick, index }: MenuItemProp) => {
  return (
    <Menu.Item>
      <div>
        <button
          className="flex px-4 py-1 w-full text-black text-base font-medium hover:bg-gray-200 bg-gray-50 focus:outline-none transition-colors duration-300 focus:ring-4 focus:ring-blue-200"
          onClick={(event) => onClick(event, index!)}
        >
          <span>{icon}</span>
          <span>{title}</span>
        </button>
      </div>
    </Menu.Item>
  );
};
