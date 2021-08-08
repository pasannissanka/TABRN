import React from 'react';
import { useQuery } from 'react-query';
import { Link as RouterLink } from 'react-router-dom';
import { getWorkspacesList } from '../../Query/api';
import { ReactComponent as BriefcaseSVG } from '../../svg/briefcase.svg';
import { IWorkspace } from '../../Types/types';
import { DrawerDisclosure } from './DrawerDisclosure';

interface DrawerProps {
  isDrawerOpen: boolean;
}

export const Drawer = ({ isDrawerOpen }: DrawerProps) => {
  const { data } = useQuery('workspaces-all', getWorkspacesList, {
    retry: false,
    refetchOnWindowFocus: false,
  });

  return (
    <React.Fragment>
      <aside
        className={`fixed inset-y-0 z-10 flex flex-col flex-shrink-0 w-64 max-h-screen overflow-hidden transition-all transform md:z-auto md:static shadow-none
				${isDrawerOpen ? '-translate-x-full lg:translate-x-0 lg:w-0' : ''}`}
      >
        {/* Header */}
        <div className="flex flex-shrink-0 items-center justify-between p-2"></div>
        <nav className="flex-1 overflow-hidden hover:overflow-y-auto">
          <ul
            className={`p-2 overflow-hidden hidden lg:block ${
              isDrawerOpen ? 'block lg:hidden' : ''
            }`}
          >
            <li>
              <RouterLink
                to="/"
                className="flex items-center p-2 hover:bg-gray-100 rounded-md space-x-2"
              >
                <span>
                  <svg
                    className="w-6 h-6 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </span>
                <span>Home</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/timeline"
                className="flex items-center p-2 hover:bg-gray-100 rounded-md space-x-2"
              >
                <span>
                  <BriefcaseSVG className="w-6 h-6 text-gray-400" />
                </span>
                <span>Discover</span>
              </RouterLink>
            </li>
            <li>
              <DrawerDisclosure
                to="/workspace"
                title="Workspaces"
                icon={<BriefcaseSVG className="w-6 h-6 text-gray-400" />}
              >
                <ul>
                  {data?.map((workspace: IWorkspace, index) => {
                    return (
                      <li key={index}>
                        <DrawerDisclosure
                          to={`/w/${workspace.slug}`}
                          title={workspace.title}
                          icon={
                            <BriefcaseSVG className="w-6 h-6 text-gray-400" />
                          }
                        />
                      </li>
                    );
                  })}
                </ul>
              </DrawerDisclosure>
            </li>
          </ul>
        </nav>
      </aside>
    </React.Fragment>
  );
};
