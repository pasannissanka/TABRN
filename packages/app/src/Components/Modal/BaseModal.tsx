import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

interface BaseModalProps {
  show: boolean;
  onClose: () => void;
  title: string;
  icon?: React.ReactElement;
}

export const BaseModal = ({ show, onClose, title }: BaseModalProps) => {
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
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
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
              <div className="inline-block align-middle my-8 p-6 w-full max-w-md text-left bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-gray-900 text-lg font-medium leading-6"
                >
                  {title}
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-gray-500 text-sm">
                    Your payment has been successfully submitted. We’ve sent
                    your an email with all of the details of your order.
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-blue-900 text-sm font-medium bg-blue-100 hover:bg-blue-200 border border-transparent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={onClose}
                  >
                    Got it, thanks!
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
