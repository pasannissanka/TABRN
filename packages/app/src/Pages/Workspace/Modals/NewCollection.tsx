import React from 'react';
import Button from '../../../Components/Button/Button';
import { EnumCollectionType } from '../../../Types/generated-graphql-types';
import { NewWorkspaceFormikType } from '../Workspace';

type NewCollectionProps = {
  onClose(): void;
  mode: 'edit' | 'new';
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
  submitForm: (() => Promise<void>) & (() => Promise<any>);
  values: NewWorkspaceFormikType;
};

export const NewCollection = ({
  mode,
  onClose,
  setFieldValue,
  submitForm,
  values,
}: NewCollectionProps) => {
  return (
    <>
      <div className="grid gap-2 grid-cols-2 m-auto my-4 w-1/2">
        <GridButton
          size="lg"
          description="Use list to organize entries"
          title="List"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          }
          value={EnumCollectionType.List}
          onClick={() => {
            setFieldValue('collectionType', EnumCollectionType.List);
            submitForm();
          }}
          selected={values.collectionType === EnumCollectionType.List}
        />
        <GridButton
          size="md"
          description="Use list to organize entries"
          title="Calender"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          }
          value={EnumCollectionType.Calender}
          onClick={() => {
            setFieldValue('collectionType', EnumCollectionType.Calender);
            submitForm();
          }}
          selected={values.collectionType === EnumCollectionType.Calender}
        />
        <GridButton
          size="md"
          description="Use list to organize entries"
          title="Kanban"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          }
          value={EnumCollectionType.Kanban}
          onClick={() => {
            setFieldValue('collectionType', EnumCollectionType.Kanban);
            submitForm();
          }}
          selected={values.collectionType === EnumCollectionType.Kanban}
        />
      </div>
      <div className="flex justify-end mt-4 space-x-2">
        <Button onClick={onClose} varient="outline">
          Close
        </Button>
        {mode === 'edit' && (
          <Button type="submit" varient="primary">
            Save
          </Button>
        )}
      </div>
    </>
  );
};

type GridButtonProps = {
  title: string;
  description: string;
  size: 'lg' | 'md';
  value: any;
  icon: React.ReactNode;
  onClick: (e?: any) => void;
  selected: boolean;
};

export const GridButton = ({
  title,
  description,
  size,
  value,
  icon,
  onClick,
  selected,
}: GridButtonProps) => {
  const style = size === 'lg' ? 'col-span-2' : 'col-span-1';
  return (
    <Button
      type="button"
      varient="outline"
      className={`${style} mx-auto my-1 w-full ${selected && 'bg-gray-100'}`}
      onClick={onClick}
    >
      <div className="flex flex-col">
        <div className="flex justify-center my-1 text-lg">
          <span className="mr-2">{icon}</span>
          <span>{title}</span>
        </div>
        <div className="text-gray-500 text-xs">{description}</div>
      </div>
    </Button>
  );
};
