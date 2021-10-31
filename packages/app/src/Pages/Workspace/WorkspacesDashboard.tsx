import { Form, Formik, FormikProps } from 'formik';
import React, { useState } from 'react';
import Button from '../../Components/Button/Button';
import { NavigationCard } from '../../Components/Cards/NavigationCard';
import {
  DropdownButonElement,
  DropdownLinkElement,
} from '../../Components/Dropdown/Dropdown';
import ContentModal, {
  ContentModalFormikType,
} from '../../Components/Modal/ContentModal/ContentModal';
import { ConfirmationDialog } from '../../Components/Modal/Modal';
import { ReactComponent as PlusSMSVG } from '../../svg/plus-sm.svg';
import {
  EnumCollectionFieldsKind,
  useNewWorkspaceMutation,
  useUpdateWorkspaceMutation,
  useWorkspacesPaginationQuery,
} from '../../Types/generated-graphql-types';
import { IField, WorkspaceBase } from '../../Types/types';
import { NewWorkspace } from './Modals/NewWorkspace';

export interface NewWorkspaceFormikType extends ContentModalFormikType {}

interface WorkspaceProps {}

export const WorkspacesDashboard = (props: WorkspaceProps) => {
  const [result, reexecuteQuery] = useWorkspacesPaginationQuery({
    requestPolicy: 'network-only',
  });

  const { data, fetching } = result;

  const addNewWorkspace = useNewWorkspaceMutation()[1];
  const editWorkspace = useUpdateWorkspaceMutation()[1];

  const [deleteConfModal, setdeleteConfModal] = useState<{
    _id: string;
    open: boolean;
  }>({
    _id: '',
    open: false,
  });

  const [isNewModalOpen, setIsNewModalOpen] = useState<{
    type: 'edit' | 'new';
    open: boolean;
  }>({
    type: 'new',
    open: false,
  });

  const [newWorkspaceValue, setNewWorkspaceValue] = useState<{
    _id?: string;
    description: string;
    title: string;
    icon: string;
    fields?: IField[];
  } | null>({
    description: '',
    title: '',
    icon: '',
  });

  const menuItems: (DropdownButonElement | DropdownLinkElement)[] = [
    {
      title: 'Edit',
      icon: <PlusSMSVG />,
      onClick: (e, key) => {
        const ele = data?.workspacePaginate?.items?.find((v) => v._id === key);
        if (ele) {
          setNewWorkspaceValue(ele! as any);
          openModal('edit');
        }
      },
    },
    {
      title: 'Delete',
      icon: <PlusSMSVG />,
      onClick: (e, key) => {
        const ele = data?.workspacePaginate?.items?.find((v) => v._id === key);
        if (ele) {
          setdeleteConfModal({
            _id: ele._id,
            open: true,
          });
        }
      },
    },
  ];

  const openModal = (type: 'edit' | 'new') => {
    setIsNewModalOpen({
      type,
      open: true,
    });
  };

  const closeModal = () => {
    setIsNewModalOpen({
      type: isNewModalOpen.type,
      open: false,
    });
  };

  const handleNewWorkspaceSubmit = (
    value: WorkspaceBase,
    mode: 'edit' | 'new'
  ) => {
    if (value.title.length > 0 && value.description!.length > 0) {
      if (mode === 'new') {
        addNewWorkspace({
          record: {
            title: value.title,
            description: value.description,
            icon: value.icon,
            fields: value.fields as any,
          },
        }).then((result) => reexecuteQuery());
      } else if (mode === 'edit' && newWorkspaceValue !== null) {
        editWorkspace({
          filter: {
            _id: newWorkspaceValue._id,
          },
          record: {
            description: value.description,
            title: value.title,
            icon: value.icon,
            fields: value.fields.map((field) => {
              return {
                value: field.value,
                key: field.key,
                kind: field.kind,
              };
            }) as any,
          },
        }).then((result) => {
          reexecuteQuery();
          setNewWorkspaceValue(null);
        });
      }
    }
  };

  const onWorkspaceDelete = () => {
    if (deleteConfModal._id) {
      console.log('Delete');
    }
    setdeleteConfModal({
      _id: '',
      open: false,
    });
  };

  return (
    <>
      <div className="container mx-auto">
        <div className="grid gap-7 grid-cols-3 mt-3">
          <div className="col-span-3 lg:col-span-2">
            <div>
              <div className="flex justify-between">
                <h2 className="text-2xl font-semibold">Workspaces</h2>
                <div>
                  <Button
                    className="flex w-full"
                    onClick={() => openModal('new')}
                    varient="outline"
                  >
                    <span>
                      <PlusSMSVG className="flex-1 mr-1 w-5 h-5" />
                    </span>
                    <span>New</span>
                  </Button>
                </div>
              </div>
              <div className="mt-3 border"></div>
            </div>
            {data?.workspacePaginate?.items
              ?.filter((w) => w.isDeleted === false)
              .map((workspace, index) => {
                return (
                  <NavigationCard
                    key={workspace._id}
                    id={workspace._id}
                    title={workspace.title}
                    action="link"
                    icon={workspace?.icon as string}
                    to={`/w/${workspace.slug}`}
                    secondaryAction="menu"
                    secondaryItems={menuItems}
                    loading={fetching}
                  >
                    <div className="mt-1 text-gray-700 text-base font-normal truncate">
                      {workspace.description}
                    </div>
                  </NavigationCard>
                );
              })}
          </div>
          <div className="hidden col-span-1 lg:block">Side Summary</div>
        </div>
      </div>

      {isNewModalOpen.open && (
        <Formik<ContentModalFormikType>
          initialValues={
            isNewModalOpen.type === 'edit' && newWorkspaceValue !== null
              ? {
                  title: newWorkspaceValue.title,
                  description: newWorkspaceValue.description,
                  emoji: newWorkspaceValue.icon,
                  fields: newWorkspaceValue.fields!,
                }
              : {
                  title: '',
                  description: '',
                  emoji: '',
                  fields: [
                    {
                      key: 'Created on',
                      kind: EnumCollectionFieldsKind.Date,
                      value: new Date().toString(),
                    },
                  ],
                }
          }
          onSubmit={(values) => {
            console.log(values);
            handleNewWorkspaceSubmit(
              {
                title: values.title,
                description: values.description,
                icon: values.emoji,
                fields: values.fields,
              },
              isNewModalOpen.type
            );
          }}
        >
          {({ submitForm }: FormikProps<ContentModalFormikType>) => (
            <Form>
              <ContentModal<ContentModalFormikType>
                show={isNewModalOpen.open}
                onClose={closeModal}
                size="full"
                placeholder={{
                  title: 'Untitled Collection',
                  description: 'Describe Collection...',
                }}
              >
                <NewWorkspace
                  mode={isNewModalOpen.type}
                  onSubmit={(mode) => {
                    submitForm();
                  }}
                  onClose={() => closeModal()}
                />
              </ContentModal>
            </Form>
          )}
        </Formik>
      )}

      <ConfirmationDialog
        show={deleteConfModal.open}
        onClose={() =>
          setdeleteConfModal({
            _id: '',
            open: false,
          })
        }
        size="md"
        onSubmit={onWorkspaceDelete}
      >
        <div className="text-lg">Are you sure?</div>
      </ConfirmationDialog>
    </>
  );
};
