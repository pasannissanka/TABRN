import { FieldArray, useFormikContext } from 'formik';
import React from 'react';
import { IField } from '../../../Types/types';
import { BaseModal, BaseModalProps } from '../BaseModal';
import { ContentField } from './ContentField';
import { FieldButton } from './FieldButton';
import { ContentHeading } from './Heading';
import { PrimaryActionButtons } from './PrimaryActionButtons';

export interface HeadingPlaceholder {
  title: string;
  description: string;
}

export interface ContentModalProps extends BaseModalProps {
  placeholder: HeadingPlaceholder;
}
export interface ContentModalFormikType<T extends any> {
  title: string;
  description: string;
  icon: string;
  fields: IField<T>[];
}

const ContentModal = <J extends any, T extends ContentModalFormikType<J>>({
  children,
  onClose,
  placeholder,
  ...props
}: ContentModalProps) => {
  const formikContext = useFormikContext<T>();

  const { values, setFieldValue } = formikContext;

  return (
    <>
      <BaseModal onClose={onClose} {...props}>
        <div className="m-2">
          {/* PrimaryActionButton */}
          <PrimaryActionButtons onClose={onClose} />
          <div className="my-2">
            {/* Top Panel */}
            <div className="mx-auto w-10/12">
              {/* Heading */}
              <ContentHeading<T>
                values={values}
                setFieldValue={setFieldValue}
                placeholder={placeholder}
              />
              {/* Fields */}
              <div className="flex my-2 py-2 text-gray-500 border-b-2">
                <div className="flex my-3 w-full">
                  <span className="mx-3 w-9"></span>
                  {/* Field */}
                  <FieldArray name="fields">
                    {({ insert }) => (
                      <div className="flex-1 flex-col">
                        {values &&
                          values.fields &&
                          values.fields.map((field, idx) => (
                            <ContentField
                              values={values}
                              setFieldValue={setFieldValue}
                              index={idx}
                              key={idx}
                            />
                          ))}
                        <div className="w-3/12">
                          <FieldButton
                            onClick={(e) => {
                              insert(values.fields.length, {
                                key: 'Field',
                                kind: 'string',
                                value: '',
                              });
                            }}
                            label="Add Field"
                            svg={
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
                                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                />
                              </svg>
                            }
                          />
                        </div>
                      </div>
                    )}
                  </FieldArray>
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

export default ContentModal;
