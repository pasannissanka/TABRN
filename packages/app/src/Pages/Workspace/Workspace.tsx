import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import {
  MenuItemProp,
  NavigationCard,
} from '../../Components/Cards/NavigationCard';
import { BaseModal } from '../../Components/Modal/BaseModal';
import { getWorkspacesList } from '../../Query/api';
import { ReactComponent as PlusSMSVG } from '../../svg/plus-sm.svg';
import { ReactComponent as BriefcaseSVG } from '../../svg/briefcase.svg';
import Button from '../../Components/Button/Button';
import { Modal } from '../../Components/Modal/Modal';
import { NewWorkspace } from './NewWorkspace';
import { WorkspaceBase } from '../../Types/types';
import { useMutateWorkspace } from '../../Hooks/useMutation';

interface WorkspaceProps {}

export const Workspace = (props: WorkspaceProps) => {
  const { data } = useQuery('workspaces-all', getWorkspacesList);
  const mutation = useMutateWorkspace();

  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [newWorkspaceValue, setNewWorkspaceValue] = useState<WorkspaceBase>({
    description: '',
    title: '',
    colorCode: '',
  });

  const menuItems: MenuItemProp[] = [
    {
      title: 'Edit',
      icon: <PlusSMSVG />,
      onClick: (e, i) => {
        console.log(i);
      },
    },
    {
      title: 'Edit',
      icon: <PlusSMSVG />,
      onClick: (e, i) => {
        console.log(i);
      },
    },
    {
      title: 'Edit',
      icon: <PlusSMSVG />,
      onClick: (e, i) => {
        console.log(i);
      },
    },
  ];

  const openModal = () => {
    setIsNewModalOpen(true);
  };

  const closeModal = () => {
    setIsNewModalOpen(false);
  };

  const onNewWorkspaceSubmit = (value: WorkspaceBase) => {
    if (value) {
      setNewWorkspaceValue(value);
      mutation.mutate(value);
    }
    closeModal();
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
                    onClick={openModal}
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
                  title={workspace.title}
                  content={workspace.description}
                  action="link"
                  icon={<BriefcaseSVG />}
                  to={`/workspace/${workspace.slug}`}
                  secondaryAction="menu"
                  secondaryItems={menuItems}
                />
              );
            })}
          </div>
          <div className="hidden col-span-1 lg:block">Side Summary</div>
        </div>
      </div>

      <Modal
        show={isNewModalOpen}
        onClose={closeModal}
        title="New Workspace"
        description="Use Workspaces to Organize your bookmarks"
        size="lg"
      >
        <NewWorkspace
          newWorkspaceValue={newWorkspaceValue}
          onSubmit={onNewWorkspaceSubmit}
        />
      </Modal>
    </>
  );
};
