import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AppContext } from '../../Context/AppContextProvider';
import {
  useViewsPaginationQuery,
  useWorkspacesPaginationQuery,
} from '../../Types/generated-graphql-types';
import { DrawerDisclosure, DrawerLink } from './DrawerDisclosure';

interface DrawerProps {
  isDrawerOpen: boolean;
}

export const Drawer = ({ isDrawerOpen }: DrawerProps) => {
  const { workspaceData } = useContext(AppContext);
  const location = useLocation();
  const [isWorkspace, setIsWorkspace] = useState(false);

  const [result] = useWorkspacesPaginationQuery({
    requestPolicy: 'cache-and-network',
  });
  const { data, fetching } = result;

  const [resultViews] = useViewsPaginationQuery({
    variables: {
      workspaceId: workspaceData?.workspaceData?._id,
    },
    requestPolicy: 'network-only',
    pause: !workspaceData?.workspaceSlug && !workspaceData?.workspaceData?._id,
  });
  const dataViews = resultViews.data;

  useEffect(() => {
    if (location.pathname.startsWith('/w/')) {
      setIsWorkspace(true);
    } else {
      setIsWorkspace(false);
    }
  }, [location]);

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
              <DrawerLink to="/" title="Home" icon="🏠" />
            </li>
            <li>
              <DrawerLink title="Discover" to="/discover" icon="🔭" />
            </li>
            <li>
              <DrawerDisclosure to="/workspace" title="Workspaces" icon="💼">
                <ul>
                  {data?.workspacePagination?.items?.map((workspace, index) => {
                    return (
                      <li key={index}>
                        <DrawerDisclosure
                          to={`/w/${workspace.slug}`}
                          title={workspace.title}
                          icon={workspace.emoji?.emoji!}
                        />
                      </li>
                    );
                  })}
                </ul>
              </DrawerDisclosure>
            </li>
            {isWorkspace && workspaceData && dataViews ? (
              <li>
                <DrawerDisclosure
                  to={`/w/${workspaceData?.workspaceSlug}`}
                  title={workspaceData?.workspaceData?.title as string}
                  icon={workspaceData.workspaceData?.emoji?.emoji!}
                  open={true}
                >
                  <ul>
                    {dataViews?.viewsPagination?.items?.map(
                      (workspaceView, index) => {
                        return (
                          <li key={index}>
                            <DrawerDisclosure
                              to={`/w/${workspaceData?.workspaceSlug}/${workspaceView?.slug}`}
                              title={workspaceView?.title as string}
                              icon=""
                            />
                          </li>
                        );
                      }
                    )}
                  </ul>
                </DrawerDisclosure>
              </li>
            ) : (
              <></>
            )}
          </ul>
        </nav>
      </aside>
    </React.Fragment>
  );
};
