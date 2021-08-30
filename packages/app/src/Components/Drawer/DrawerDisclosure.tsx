import React from 'react';
import { Disclosure } from '@headlessui/react';
import { NavLink } from 'react-router-dom';

type DrawerLinkProps = {
  to: string;
  icon: React.SVGProps<React.ReactSVGElement> | string;
  title: string;
};

export const DrawerLink = ({ icon, title, to }: DrawerLinkProps) => {
  return (
    <>
      <NavLink
        activeClassName="text-primary-900"
        exact={true}
        className="flex items-center p-2 hover:bg-gray-100 rounded-md space-x-2"
        to={to}
      >
        <span>{icon}</span>
        <span className="line-clamp-1">{title}</span>
      </NavLink>
    </>
  );
};

interface DrawerDisclosureProps {
  children?: React.ReactNode;
  title: string;
  to: string;
  icon: React.SVGProps<React.ReactSVGElement> | string;
  open?: boolean;
}

export const DrawerDisclosure = ({
  children,
  title,
  to,
  icon,
  open,
}: DrawerDisclosureProps) => {
  return (
    <>
      <Disclosure defaultOpen={open}>
        <div className="flex items-center justify-between w-full hover:bg-gray-100 rounded-md space-x-2">
          <DrawerLink title={title} to={to} icon={icon} />
          {children ? (
            <Disclosure.Button className="p-1 px-2 hover:bg-gray-200 rounded-md hover:shadow-sm">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-1 w-4 h-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            </Disclosure.Button>
          ) : (
            <></>
          )}
        </div>
        {children ? (
          <Disclosure.Panel className="pl-5 text-gray-500">
            {children}
          </Disclosure.Panel>
        ) : (
          <></>
        )}
      </Disclosure>
    </>
  );
};
