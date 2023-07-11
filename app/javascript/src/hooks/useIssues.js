import { useQueryClient, useMutation, useQuery } from "react-query";

import { index, get, update } from "apis/issues";

const useFetchAllIssues = () => useQuery("issues", index);

const useFetchIssue = id =>
  useQuery(["issue", id], () => get(id), { enabled: id !== null });

const useUpdateIssue = id => {
  const queryClient = useQueryClient();

  return useMutation(payload => update(id, payload), {
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries("issues");
      queryClient.invalidateQueries(["issues", id]);
    },
  });
};

export { useFetchAllIssues, useFetchIssue, useUpdateIssue };
