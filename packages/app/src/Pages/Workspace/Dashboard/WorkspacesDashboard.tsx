import React, { useState } from 'react';
import Button from '../../../Components/Button/Button';
import { NavigationCard } from '../../../Components/Cards/NavigationCard';
import {
  DropdownButonElement,
  DropdownLinkElement,
} from '../../../Components/Dropdown/Dropdown';
import { ConfirmationDialog, Modal } from '../../../Components/Modal/Modal';
import {
  useDeleteWorkspaceMutation,
  useNewWorkspaceMutation,
  useUpdateWorkspaceMutation,
  useWorkspacesPaginationQuery,
  WorkspaceDataFragment,
} from '../../../Types/generated-graphql-types';
import { ReactComponent as PlusSMSVG } from '../../../svg/plus-sm.svg';
import { NewWorkspace } from './NewWorkspace';
import { WorkspaceBase } from '../../../Types/types';

interface WorkspaceProps {}

export const WorkspaceDashboard = (props: WorkspaceProps) => {
  const [result, reexecuteQuery] = useWorkspacesPaginationQuery({
    requestPolicy: 'network-only',
  });

  const { data, fetching } = result;

  const [_, addNewWorkspace] = useNewWorkspaceMutation();
  const [__, editWorkspace] = useUpdateWorkspaceMutation();
  const [___, deleteWorkspace] = useDeleteWorkspaceMutation();

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
    colorCode: string;
  }>({
    description: '',
    title: '',
    colorCode: '',
  });

  const menuItems: (DropdownButonElement | DropdownLinkElement)[] = [
    {
      title: 'Edit',
      icon: <PlusSMSVG />,
      onClick: (e, key) => {
        console.log(e, key);
        const ele = data?.workspacePagination?.items?.find(
          (v) => v._id === key
        );
        console.log(ele);
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
        console.log(e, key);
        const ele = data?.workspacePagination?.items?.find(
          (v) => v._id === key
        );
        console.log(ele);
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

  const onWorkspaceSubmit = (value: WorkspaceBase, mode: 'edit' | 'new') => {
    closeModal();
    if (value.title.length > 0 && value.description!.length > 0) {
      if (mode === 'new') {
        setNewWorkspaceValue(value as any);
        addNewWorkspace({
          record: {
            title: value.title,
            description: value.description,
            emoji: value.emoji,
          },
        }).then((result) => reexecuteQuery());
      } else if (mode === 'edit') {
        editWorkspace({
          filter: {
            _id: newWorkspaceValue._id,
          },
          record: {
            description: value.description,
            title: value.title,
            emoji: {
              emoji: value.emoji?.emoji,
              activeSkinTone: value.emoji?.activeSkinTone,
              names: value.emoji?.names,
              originalUnified: value.emoji?.originalUnified,
              unified: value.emoji?.unified,
            },
          },
        }).then((result) => reexecuteQuery());
      }
    }
    setNewWorkspaceValue({
      description: '',
      title: '',
      colorCode: '',
    });
  };

  const onWorkspaceDelete = () => {
    if (deleteConfModal._id) {
      deleteWorkspace({
        id: deleteConfModal._id,
      }).then((result) => reexecuteQuery());
    }
    setdeleteConfModal({
      _id: '',
      open: false,
    });
  };

  console.log(newWorkspaceValue);

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
            {data?.workspacePagination?.items
              ?.filter((w) => w.isDeleted === false)
              .map((workspace, index) => {
                return (
                  <NavigationCard
                    key={workspace._id}
                    id={workspace._id}
                    title={workspace.title}
                    action="link"
                    icon={workspace?.emoji?.emoji as string}
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

      {isNewModalOpen.type === 'new' ? (
        <Modal
          show={isNewModalOpen.open}
          onClose={() => closeModal()}
          title="New Workspace"
          description="Use Workspaces to Organize your bookmarks"
          size="lg"
        >
          <NewWorkspace
            mode={isNewModalOpen.type}
            newWorkspaceValue={newWorkspaceValue}
            onSubmit={onWorkspaceSubmit}
            onClose={() => closeModal()}
          />
        </Modal>
      ) : isNewModalOpen.type === 'edit' ? (
        <Modal
          show={isNewModalOpen.open}
          onClose={() => closeModal()}
          title="Edit Workspace"
          description="Use Workspaces to Organize your bookmarks"
          size="lg"
        >
          <NewWorkspace
            mode={isNewModalOpen.type}
            newWorkspaceValue={newWorkspaceValue}
            onSubmit={onWorkspaceSubmit}
            onClose={() => closeModal()}
          />
        </Modal>
      ) : (
        <></>
      )}

      <ConfirmationDialog
        show={deleteConfModal.open}
        onClose={() =>
          setdeleteConfModal({
            _id: '',
            open: false,
          })
        }
        onSubmit={onWorkspaceDelete}
        title="Are you sure?"
        description="You will not be able to undo this action."
      />
    </>
  );
};
