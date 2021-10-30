import { Menu } from '@headlessui/react';
import EmojiPicker, { IEmojiData } from 'emoji-picker-react';
import { Field, useFormikContext } from 'formik';
import React from 'react';
import Button from '../Button/Button';
import { BaseModal, BaseModalProps } from './BaseModal';

export interface ContentModalProps extends BaseModalProps {}

export interface ContentModalFormikType {
  title: string;
  description: string;
  emoji: string;
}

export const ContentModal = ({
  children,
  onClose,
  ...props
}: ContentModalProps) => {
  const formikContext = useFormikContext<ContentModalFormikType>();

  const { values, setFieldValue } = formikContext;

  const onEmojiClick = (_: any, emojiObject: IEmojiData) => {
    setFieldValue('emoji', emojiObject.emoji);
  };

  return (
    <>
      <BaseModal onClose={onClose} {...props}>
        <div className="m-2">
          {/* PrimaryActionButton */}
          <div className="flex justify-between my-2">
            <Button varient="flat-white" size="sm" type="button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                />
              </svg>
            </Button>
            <Button
              varient="flat-white"
              size="sm"
              onClick={onClose}
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Button>
          </div>
          <div className="my-2">
            {/* Top Panel */}
            <div className="mx-auto w-10/12">
              {/* Heading */}
              <div className="flex my-2 py-2 text-gray-500 border-b-2">
                <div className="flex my-3 w-full">
                  <Menu as="div" className="relative inline-block mx-2">
                    <Menu.Button
                      as={Button}
                      varient="flat-white"
                      size="sm"
                      type="button"
                      className="max-h-14"
                    >
                      <span className="flex flex-col">
                        {values && values?.emoji ? (
                          <span className="m-auto text-4xl">
                            {values.emoji}
                          </span>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="m-auto w-9 h-9"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                            />
                          </svg>
                        )}
                        {/* <span className="text-gray-600 text-sm">Select icon</span> */}
                      </span>
                    </Menu.Button>
                    <Menu.Items className="ring-primary-700 absolute z-50 mt-2 bg-white rounded-md focus:outline-none shadow-lg ring-1 ring-opacity-5">
                      <EmojiPicker
                        onEmojiClick={onEmojiClick}
                        native={true}
                        pickerStyle={{ boxShadow: 'none' }}
                      />
                    </Menu.Items>
                  </Menu>
                  <div className="flex-1 flex-col">
                    <Field
                      className="content w-full text-2xl"
                      title="title"
                      type="text"
                      name="title"
                      placeholder="Untitled Collection"
                    />
                    <Field
                      className="content w-full text-base"
                      title="description"
                      type="text"
                      name="description"
                      placeholder="Describe Collection..."
                    />
                  </div>
                </div>
              </div>
              {/* Fields */}
              <div className="flex my-2 py-2 text-gray-500 border-b-2">
                <div className="flex my-3 w-full">
                  <span className="mx-3 w-9"></span>
                  <div className="flex-1 flex-col mx-2">
                    {/* Field */}
                    <div className="flex my-3 w-full text-black">
                      <div className="flex align-middle px-2 py-1 w-3/12 hover:bg-gray-200 rounded-md">
                        <span className="mr-2 my-auto">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </span>
                        <div>Created</div>
                      </div>
                      <div className="flex-1 mx-2 px-2 py-1 hover:bg-gray-200 rounded-md">
                        {new Date().toDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-auto my-2 py-2 w-10/12">{children}</div>
        </div>
      </BaseModal>
    </>
  );
};
