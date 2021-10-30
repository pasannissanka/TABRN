import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';

export interface BaseModalProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size: 'md' | 'lg' | 'xl' | 'full';
}

export const BaseModal = ({
  show,
  onClose,
  children,
  size,
}: BaseModalProps) => {
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
            <span
              className="inline-block align-middle h-screen"
              aria-hidden="true"
            ></span>
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
                className={`inline-block align-middle p-2 w-full text-left bg-white rounded-2xl shadow-xl transform transition-all
                ${width}
              `}
              >
                {children}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
