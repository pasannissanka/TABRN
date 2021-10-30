import React from 'react';
import { Field, FieldAttributes } from 'formik';

type InputFieldProps = {
  // size: string;
  title: string;
} & FieldAttributes<any>;

export const InputField = ({ title, className, ...props }: InputFieldProps) => {
  return (
    <>
      <div className="flex my-2 w-full">
        <span className="mt-2 mx-2 w-1/4 text-base font-medium">{title}</span>
        <Field className={`w-3/4 mx-2 normal ${className}`} {...props} />
      </div>
    </>
  );
};
