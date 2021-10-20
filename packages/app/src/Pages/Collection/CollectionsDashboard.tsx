import React from 'react';
import { CollectionCard } from '../../Components/Cards/CollectionCard/CollectionCard';
import { ListItem } from '../../Components/ListItem/ListItem';
import {
  Collection,
  CollectionPaginateQuery,
  Entry,
  EnumCollectionType,
  useEntryPaginateQuery,
} from '../../Types/generated-graphql-types';

type CollectionsDashboardProps = {
  data: CollectionPaginateQuery;
  workspaceId: string;
};

export const CollectionsDashboard = ({
  data,
  workspaceId,
}: CollectionsDashboardProps) => {
  console.log(data);

  return (
    <>
      <div>
        {data?.collectionPaginate?.items?.map((collection) => {
          return (
            <CollectionCard data={collection} key={collection._id}>
              {collection.type === EnumCollectionType.List ? (
                <ListCollectionView
                  data={collection}
                  workspaceId={workspaceId}
                />
              ) : collection.type === EnumCollectionType.Calender ? (
                <div>Calender view</div>
              ) : (
                <div>Kanban view</div>
              )}
            </CollectionCard>
          );
        })}
      </div>
    </>
  );
};

type ListCollectionViewProps = {
  data: Collection;
  workspaceId: string;
};

export const ListCollectionView = ({
  data,
  workspaceId,
}: ListCollectionViewProps) => {
  const [result] = useEntryPaginateQuery({
    variables: {
      filter: {
        workspaceId: workspaceId,
        collectionId: data._id,
      },
    },
  });

  return (
    <>
      <div className="h-72 overflow-auto">
        {result.data?.EntryPaginate?.items?.map((entry) => (
          <ListItem<Entry> data={entry} />
        ))}
      </div>
    </>
  );
};
