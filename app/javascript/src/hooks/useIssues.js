import { useQueryClient, useMutation, useQuery } from "react-query";

import { index, get, create, update, search, destroy } from "apis/issues";

const useFetchAllIssues = () => useQuery(["issues"], index);

const useFetchIssue = id =>
  useQuery(["issue", id], () => get(id), { enabled: id !== null });

const useCreateIssue = () => {
  const queryClient = useQueryClient();

  return useMutation(create, {
    onSuccess: () => queryClient.invalidateQueries(["issues"]),
  });
};

const useUpdateIssue = () => {
  const queryClient = useQueryClient();

  return useMutation(({ id, payload }) => update(id, payload), {
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries(["issues"]);
      queryClient.invalidateQueries(["issue", id]);
    },
  });
};

const useSearchIssue = searchQuery =>
  useQuery(["issues", searchQuery], () => search(searchQuery), {
    enabled: !!searchQuery,
    keepPreviousData: false,
  });

const useDestroyIssue = () => {
  const queryClient = useQueryClient();

  return useMutation(destroy, {
    onSuccess: (_, id) => {
      queryClient.invalidateQueries(["issues"]);
      queryClient.removeQueries(["issues", id]);
    },
  });
};

export {
  useFetchAllIssues,
  useFetchIssue,
  useUpdateIssue,
  useCreateIssue,
  useSearchIssue,
  useDestroyIssue,
};
