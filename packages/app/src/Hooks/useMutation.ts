import { useMutation, useQueryClient } from 'react-query';
import {
  createNewWorkspace,
  deleteWorkspace,
  updateWorkspace,
} from '../Query/api';

export const useMutateWorkspace = () => {
  const queryClient = useQueryClient();

  return useMutation(createNewWorkspace, {
    // Notice the second argument is the variables object that the `mutate` function receives

    onSuccess: () => {
      // TODO Optimization use setQueryData
      queryClient.invalidateQueries({
        queryKey: 'workspaces-all',
      });
    },
  });
};

export const useMutateWorkspaceUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation(updateWorkspace, {
    // Notice the second argument is the variables object that the `mutate` function receives

    onSuccess: () => {
      // TODO Optimization use setQueryData
      queryClient.invalidateQueries({
        queryKey: 'workspaces-all',
      });
    },
  });
};

export const useMutateWorkspaceDelete = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteWorkspace, {
    // Notice the second argument is the variables object that the `mutate` function receives

    onSuccess: () => {
      // TODO Optimization use setQueryData
      queryClient.invalidateQueries({
        queryKey: 'workspaces-all',
      });
    },
  });
};
