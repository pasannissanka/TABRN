import React from 'react';
import { CollectionCard } from '../../Components/Cards/CollectionCard/CollectionCard';
import { ListItem } from '../../Components/ListItem/ListItem';
import { useCollectionPaginateQuery } from '../../Types/generated-graphql-types';

type CollectionsDashboardProps = {
  workspaceId: string;
};

export const CollectionsDashboard = ({
  workspaceId,
}: CollectionsDashboardProps) => {
  const [result] = useCollectionPaginateQuery({
    variables: {
      filter: {
        workspaceId: workspaceId,
      },
    },
    requestPolicy: 'cache-and-network',
    pause: !workspaceId,
  });

  const { data } = result;

  console.log(data);

  return (
    <>
      <div>
        {data?.collectionPaginate?.items?.map((collection) => {
          return (
            <CollectionCard data={collection} key={collection._id}>
              <ListItem<any> data={{}} />
            </CollectionCard>
          );
        })}
      </div>
    </>
  );
};
