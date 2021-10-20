import React, { useState } from 'react';
import Button from '../../Components/Button/Button';
import { CollectionCard } from '../../Components/Cards/CollectionCard/CollectionCard';
import { ListItem } from '../../Components/ListItem/ListItem';
import {
  Collection,
  CollectionPaginateQuery,
  Entry,
  EnumCollectionType,
  useEntryPaginateQuery,
} from '../../Types/generated-graphql-types';
import { ReactComponent as PlusSMSVG } from '../../svg/plus-sm.svg';
import { Modal } from '../../Components/Modal/Modal';

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
  const [newModal, setNewModal] = useState(false);

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
      {/* Actions */}
      <div className="my-1 w-full border-b">
        <div className="flex justify-end my-1">
          <Button
            size="sm"
            varient="flat-white"
            onClick={() => setNewModal(!newModal)}
          >
            <PlusSMSVG className="flex-1 mr-1 w-5 h-5" />
            New
          </Button>
        </div>
      </div>
      {/* Body */}
      <div className="h-72 overflow-auto">
        {result.data?.EntryPaginate?.items?.map((entry) => (
          <ListItem<Entry> data={entry} />
        ))}
      </div>
      <Modal
        show={newModal}
        onClose={() => setNewModal(false)}
        title="New Entry"
        description="Use Collections to categorize your content"
        size="full"
      >
        <button></button>
      </Modal>
    </>
  );
};
