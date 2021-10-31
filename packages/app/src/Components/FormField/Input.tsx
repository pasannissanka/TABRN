import React from 'react';
import { Field, FieldAttributes } from 'formik';

type InputFieldProps = {
  // size: string;
  title: string;
} & FieldAttributes<any>;

export const InputField = ({
  title,
  className,
  name,
  ...props
}: InputFieldProps) => {
  return (
    <>
      <div className="flex flex-col w-full">
        <label
          className="mt-2 mx-2 text-gray-500 text-xs"
          htmlFor={`${name}-field`}
        >
          {title}
        </label>
        <Field
          id={`${name}-field`}
          className={`normal ${className}`}
          {...props}
          name={name}
        />
      </div>
    </>
  );
};
