import { message } from "antd";
import { QueryClient, QueryCache } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 3_200_000,
      keepPreviousData: true,
    },
  },
  queryCache: new QueryCache({
    onError: error => message.error({ content: error }),
  }),
});

export default queryClient;
