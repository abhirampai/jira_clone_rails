import { useQuery } from "react-query";

import { index, get } from "apis/issues";

const useFetchAllIssues = () => useQuery("issues", index);

const useFetchIssue = id =>
  useQuery(["issue", id], () => get(id), { enabled: id !== null });

export { useFetchAllIssues, useFetchIssue };
