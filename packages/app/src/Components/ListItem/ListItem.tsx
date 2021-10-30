import { formatRelative } from 'date-fns';
import React, { useState } from 'react';
import {
  EntryFields,
  Maybe,
  Scalars,
} from '../../Types/generated-graphql-types';
import { Modal } from '../Modal/Modal';

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
      <Modal
        show={expandModal}
        onClose={() => setExpandModal(false)}
        size="full"
      >
        <button></button>
      </Modal>
    </>
  );
};
