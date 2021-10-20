import React from 'react';
import {
  EntryFields,
  Maybe,
  Scalars,
} from '../../Types/generated-graphql-types';

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
  return (
    <>
      <div className="flex justify-between mx-2 my-2">
        <div className="flex my-1 w-full">
          <span className="mr-2">{data.icon}</span>
          <div className="flex flex-col w-full">
            <span>{data.title}</span>
            <div className="my-1 text-gray-500 text-base truncate">
              {data.description}
            </div>
          </div>
        </div>
        <div className="flex">
          <span className=""></span>
          <div className="self-end my-1 text-gray-500 text-xs truncate">
            {data.createdAt}
          </div>
        </div>
      </div>
    </>
  );
};
