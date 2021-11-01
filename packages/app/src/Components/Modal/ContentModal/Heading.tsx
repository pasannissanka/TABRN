import { Menu } from '@headlessui/react';
import EmojiPicker, { IEmojiData } from 'emoji-picker-react';
import { Field } from 'formik';
import React from 'react';
import Button from '../../Button/Button';
import { ContentModalFormikType, HeadingPlaceholder } from './ContentModal';

type ContentHeadingProps<T> = {
  values: T;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
  placeholder: HeadingPlaceholder;
};

export const ContentHeading = <T extends ContentModalFormikType<any>>({
  values,
  setFieldValue,
  placeholder,
}: ContentHeadingProps<T>) => {
  const onEmojiClick = (_: any, emojiObject: IEmojiData) => {
    setFieldValue('icon', emojiObject.emoji);
  };

  return (
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
              {values && values?.icon ? (
                <span className="m-auto text-4xl">{values.icon}</span>
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
            placeholder={placeholder.title}
          />
          <Field
            className="content w-full text-base"
            title="description"
            type="text"
            name="description"
            placeholder={placeholder.description}
          />
        </div>
      </div>
    </div>
  );
};
