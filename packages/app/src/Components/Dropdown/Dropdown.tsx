import { Menu, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import Button, { ButtonProps } from '../Button/Button';

export type DropdownLinkElement = {
  to: string;
  title: string;
  icon?: React.ReactElement;
};

export type DropdownButonElement = {
  onClick: (event?: any, optKey?: string) => void;
  title: string;
  icon?: React.ReactElement;
};

export type DropdownProps = {
  buttonProps: ButtonProps;
  items: (DropdownButonElement | DropdownLinkElement)[];
  optKey?: string;
};

export const Dropdown = ({ buttonProps, items, optKey }: DropdownProps) => {
  return (
    <>
      <Menu as="div" className="relative inline-block">
        <Menu.Button as={Button} {...buttonProps}></Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="ring-primary-700 absolute z-50 right-0 mt-2 bg-white rounded-md focus:outline-none shadow-lg ring-1 ring-opacity-5">
            {items.map((item, idx) => {
              const { title, icon } = item;
              return (
                <Fragment key={idx}>
                  {'to' in item ? (
                    <Menu.Item
                      as={NavLink}
                      className="block px-4 py-2 hover:bg-gray-100 rounded-md transition"
                      to={item.to}
                      key={idx}
                    >
                      <div className="flex">
                        {icon ? <span>{icon}</span> : <></>}
                        <span>{title}</span>
                      </div>
                    </Menu.Item>
                  ) : (
                    <Menu.Item
                      as={Button}
                      varient="flat"
                      onClick={(e) => item.onClick(e, optKey)}
                      key={idx}
                      className="w-full"
                    >
                      <div className="flex gap-4 justify-start w-28 text-base">
                        {icon ? <span>{icon}</span> : <></>}
                        <span>{title}</span>
                      </div>
                    </Menu.Item>
                  )}
                </Fragment>
              );
            })}
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};
