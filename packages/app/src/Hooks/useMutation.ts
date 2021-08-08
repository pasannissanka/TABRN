import { useMutation, useQueryClient } from 'react-query';
import { createNewWorkspace } from '../Query/api';

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
