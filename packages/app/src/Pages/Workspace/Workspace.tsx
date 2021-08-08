import React, { useState } from 'react';
import { useQuery } from 'react-query';
import {
  MenuItemProp,
  NavigationCard,
} from '../../Components/Cards/NavigationCard';
import { BaseModal } from '../../Components/Modal/BaseModal';
import { getWorkspacesList } from '../../Query/api';
import { ReactComponent as PlusSMSVG } from '../../svg/plus-sm.svg';
import { ReactComponent as BriefcaseSVG } from '../../svg/briefcase.svg';

interface WorkspaceProps {}

export const Workspace = (props: WorkspaceProps) => {
  const { data } = useQuery('workspaces-all', getWorkspacesList);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

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

  return (
    <>
      <div className="container mx-auto">
        <div className="grid gap-7 grid-cols-3 mt-3">
          <div className="col-span-3 lg:col-span-2">
            <div>
              <div className="flex justify-between">
                <h2 className="text-2xl font-semibold">Workspaces</h2>
                <div>
                  <button
                    className="flex px-4 py-1 w-full text-black text-base font-medium hover:bg-gray-200 bg-gray-50 rounded-md focus:outline-none shadow transition-colors duration-300 focus:ring-4 focus:ring-blue-200"
                    onClick={openModal}
                  >
                    <span>
                      <PlusSMSVG />
                    </span>
                    <span>New</span>
                  </button>
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
                  secondryAction="menu"
                  secondryItems={menuItems}
                />
              );
            })}
          </div>
          <div className="hidden col-span-1 lg:block">Side Summary</div>
        </div>
      </div>

      <BaseModal
        show={isNewModalOpen}
        onClose={closeModal}
        title="New Workspace"
      />
    </>
  );
};
