import React from 'react';

type ListItemProps<T> = {
  data: T;
};

export const ListItem = <T extends any>({ data }: ListItemProps<T>) => {
  return <div></div>;
};
