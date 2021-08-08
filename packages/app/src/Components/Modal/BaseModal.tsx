import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Button from '../Button/Button';

export interface BaseModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  title: string;
  description: string;
  children?: React.ReactNode;
  action?: React.ReactNode;
}

export interface ModalProps extends BaseModalProps {
  size: 'md' | 'lg' | 'xl' | 'full';
}

export const BaseModal = ({
  show,
  onClose,
  title,
  description,
  children,
  action,
  size,
}: ModalProps) => {
  const width = size === 'full' ? 'max-w-4xl' : `max-w-${size}`;

  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={onClose}
        >
          <div className="px-4 min-h-screen text-center">
            <Transition.Child
              as={Fragment}
              enter="transition-opacity duration-200"
              enterFrom="opacity-0"
              enterTo="opacity-30"
              leave="transition-opacity duration-200"
              leaveFrom="opacity-40"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-40" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block align-middle h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div
                className={`inline-block align-middle my-8 p-6 w-full text-left bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all
                ${width}
              `}
              >
                <Dialog.Title
                  as="h3"
                  className="text-gray-900 text-lg font-medium leading-6"
                >
                  {title}
                </Dialog.Title>
                <Dialog.Description
                  as="p"
                  className="mt-1 text-gray-500 text-sm font-normal"
                >
                  {description}
                </Dialog.Description>
                <div className="mt-2">{children}</div>
                {action ? <div className="mt-4">{action}</div> : <></>}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
