import React from 'react';
import { Field, FieldAttributes } from 'formik';

type InputFieldProps = {
  size: string;
} & FieldAttributes<any>;

export const InputField = ({ size, ...props }: InputFieldProps) => {
  return <Field {...props} />;
};
