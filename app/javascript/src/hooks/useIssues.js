import { useQueryClient, useMutation, useQuery } from "react-query";

import { index, get, update } from "apis/issues";

const useFetchAllIssues = () => useQuery(["issues"], index);

const useFetchIssue = id =>
  useQuery(["issue", id], () => get(id), { enabled: id !== null });

const useUpdateIssue = () => {
  const queryClient = useQueryClient();

  return useMutation(({ id, payload }) => update(id, payload), {
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries(["issues"]);
      queryClient.invalidateQueries(["issue", id]);
    },
  });
};

export { useFetchAllIssues, useFetchIssue, useUpdateIssue };
