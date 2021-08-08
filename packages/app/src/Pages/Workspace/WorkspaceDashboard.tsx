import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Button from '../../Components/Button/Button';
import {
  MenuItemProp,
  NavigationCard,
} from '../../Components/Cards/NavigationCard';
import { ConfirmationDialog, Modal } from '../../Components/Modal/Modal';
import {
  useMutateWorkspace,
  useMutateWorkspaceDelete,
  useMutateWorkspaceUpdate,
} from '../../Hooks/useMutation';
import { getWorkspacesList } from '../../Query/api';
import { ReactComponent as BriefcaseSVG } from '../../svg/briefcase.svg';
import { ReactComponent as PlusSMSVG } from '../../svg/plus-sm.svg';
import { WorkspaceBase } from '../../Types/types';
import { NewWorkspace } from './NewWorkspace';

interface WorkspaceProps {}

export const WorkspaceDashboard = (props: WorkspaceProps) => {
  const { data } = useQuery('workspaces-all', getWorkspacesList, {
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
  const addMutation = useMutateWorkspace();
  const editMutation = useMutateWorkspaceUpdate();
  const deleteMutation = useMutateWorkspaceDelete();

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

  const menuItems: MenuItemProp[] = [
    {
      title: 'Edit',
      type: 'edit',
      icon: <PlusSMSVG />,
      onClick: (e, key) => {
        console.log(e, key);
        const ele = data?.find((v) => v._id === key);
        console.log(ele);
        if (ele) {
          setNewWorkspaceValue(ele! as any);
          openModal('edit');
        }
      },
    },
    {
      title: 'Delete',
      type: 'delete',
      icon: <PlusSMSVG />,
      onClick: (e, key) => {
        console.log(e, key);
        const ele = data?.find((v) => v._id === key);
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
    if (value.title.length > 0 && value.description.length > 0) {
      if (mode === 'new') {
        setNewWorkspaceValue(value as any);
        addMutation.mutate(value);
      } else if (mode === 'edit') {
        editMutation.mutate({
          _id: newWorkspaceValue._id!,
          ...value,
        });
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
      deleteMutation.mutate(deleteConfModal._id);
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
            {data?.map((workspace, index) => {
              return (
                <NavigationCard
                  key={workspace._id}
                  id={workspace._id}
                  title={workspace.title}
                  content={workspace.description}
                  action="link"
                  icon={<BriefcaseSVG />}
                  to={`/w/${workspace.slug}`}
                  secondaryAction="menu"
                  secondaryItems={menuItems}
                />
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
