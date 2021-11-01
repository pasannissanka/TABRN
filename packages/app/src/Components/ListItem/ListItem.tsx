import { formatRelative } from 'date-fns';
import { Form, Formik, FormikProps } from 'formik';
import React, { useState } from 'react';
import {
  EntryFields,
  EnumEntryFieldsKind,
  Maybe,
  Scalars,
} from '../../Types/generated-graphql-types';
import ContentModal, {
  ContentModalFormikType,
} from '../Modal/ContentModal/ContentModal';

interface ItemBase {
  title: Scalars['String'];
  icon?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Scalars['MongoID']>>>;
  fields?: Maybe<Array<Maybe<EntryFields>>>;
  _id: Scalars['MongoID'];
  slug?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Date']>;
  createdAt?: Maybe<Scalars['Date']>;
}

type ListItemProps<T> = {
  data: T;
};

export interface EntryFormikType
  extends ContentModalFormikType<Maybe<EnumEntryFieldsKind>> {}

export const ListItem = <T extends ItemBase>({ data }: ListItemProps<T>) => {
  const [expandModal, setExpandModal] = useState(false);
  return (
    <>
      <div className="flex justify-between mx-2 my-2 border-b">
        <div
          className="flex my-1 w-full cursor-pointer"
          onClick={() => setExpandModal(!expandModal)}
        >
          <span className="mr-2">{data.icon}</span>
          <div className="flex flex-col w-full">
            <span>{data.title}</span>
            <div className="my-1 text-gray-500 text-base truncate">
              {data.description}
            </div>
          </div>
        </div>
        <div className="flex m-1">
          <span className=""></span>
          <div className="self-end my-1 text-gray-500 text-xs truncate">
            {formatRelative(new Date(data.updatedAt), new Date())}
          </div>
        </div>
      </div>

      <Formik<EntryFormikType>
        initialValues={{
          title: data.title,
          description: data.description!,
          icon: data.icon!,
          fields: data.fields as any,
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ resetForm }: FormikProps<EntryFormikType>) => (
          <Form>
            <ContentModal<Maybe<EnumEntryFieldsKind>, EntryFormikType>
              show={expandModal}
              onClose={() => {
                setExpandModal(false);
                resetForm();
              }}
              size="full"
              placeholder={{
                title: 'Untitled',
                description: 'Describe...',
              }}
            >
              <button>Test</button>
            </ContentModal>
          </Form>
        )}
      </Formik>
    </>
  );
};
