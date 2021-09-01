import React, { useContext } from 'react';
import { NavigationCard } from '../../../Components/Cards/NavigationCard';
import { AppContext } from '../../../Context/AppContextProvider';
import {
  EntryDataFragment,
  EnumDKeyEntryKind,
  useEntriesPaginationQuery,
  useGetBookmarkEntryQuery,
} from '../../../Types/generated-graphql-types';

type ListViewProps = {
  viewData: any;
};

export const ListView = ({ viewData }: ListViewProps) => {
  const { workspaceData } = useContext(AppContext);
  const [result] = useEntriesPaginationQuery({
    variables: {
      viewId: viewData._id,
      workspaceId: workspaceData?.workspaceData?._id,
    },
    pause: !viewData && !workspaceData?.workspaceData,
    requestPolicy: 'network-only',
  });

  const { data, fetching } = result;

  console.log(data);

  return (
    <>
      {data?.entriesPagination?.items?.map((entry, idx) => {
        if (entry?.kind === EnumDKeyEntryKind.Bookmark) {
          return (
            <BookmarkListItem
              entry={entry}
              key={entry._id}
              workspaceSlug={workspaceData?.workspaceSlug!}
              viewSlug={viewData.slug}
            />
          );
        } else {
          return (
            <NavigationCard
              key={entry?._id}
              id={entry?._id}
              title={entry?.title}
              action="button"
              icon={''}
              to={`/w/${workspaceData?.workspaceSlug}/${viewData.slug}/${entry?.slug}`}
              loading={fetching}
            >
              <div className="mt-1 text-gray-700 text-base font-normal truncate">
                {entry?.description}
              </div>
            </NavigationCard>
          );
        }
      })}
    </>
  );
};

type WrapperListItemProps = {
  entry: EntryDataFragment;
  workspaceSlug: string;
  viewSlug: string;
};

export const BookmarkListItem = ({
  entry,
  workspaceSlug,
  viewSlug,
}: WrapperListItemProps) => {
  const [result] = useGetBookmarkEntryQuery({
    variables: {
      id: entry._id,
    },
    pause: !entry,
  });
  const { data, fetching } = result;

  console.log(data);
  return (
    <>
      <NavigationCard
        key={data?.getBookmarkEntry?._id}
        id={data?.getBookmarkEntry?._id}
        title={data?.getBookmarkEntry?.title}
        action="link"
        icon={''}
        to={`${data?.getBookmarkEntry?.url}`}
        loading={fetching}
      >
        <div className="mt-1 text-gray-700 text-base font-normal truncate">
          {data?.getBookmarkEntry?.description}
        </div>
      </NavigationCard>
    </>
  );
};
