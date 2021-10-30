import React from 'react';
import { ContentModalFormikType } from './ContentModal';

type ContentFieldProps<T> = {
  values: T;
  index: number;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
};

export const ContentField = <T extends ContentModalFormikType>({
  values,
  index,
}: ContentFieldProps<T>) => {
  return (
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
        <div>{values.fields[index].key}</div>
      </div>
      <div className="flex-1 mx-2 px-2 py-1 hover:bg-gray-200 rounded-md">
        {values.fields[index].value}
      </div>
    </div>
  );
};
