import { useQuery } from "react-query";

import { get } from "apis/issues";

const useFetchAllIssues = () => useQuery("issues", get);

export { useFetchAllIssues };
