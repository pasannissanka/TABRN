import { FieldArray, useFormikContext } from 'formik';
import React from 'react';
import { FIELD_TYPE } from '../../../Types/types';
import { BaseModal, BaseModalProps } from '../BaseModal';
import { ContentField } from './ContentField';
import { FieldButton } from './FieldButton';
import { ContentHeading } from './Heading';
import { PrimaryActionButtons } from './PrimaryActionButtons';

export interface ContentModalProps extends BaseModalProps {}

export interface IField {
  kind: FIELD_TYPE;
  value: string;
  key: string;
}

export interface ContentModalFormikType {
  title: string;
  description: string;
  emoji: string;
  fields: IField[];
}

const ContentModal = <T extends ContentModalFormikType>({
  children,
  onClose,
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
                                kind: FIELD_TYPE.STRING,
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
