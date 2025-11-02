import { fetcher } from "@/helpers/fetcher"; // adjust path
import { useQuery } from "@tanstack/react-query";

const useQueryFetcher = (
  apiEndpoint: string,
  queryKey: string,
  keyChanger?: string
) => {
  const fetchData = async () => {
    const url = `/${apiEndpoint}`;
    return fetcher(url);
  };
  const queryResult = useQuery({
    queryKey: [queryKey, keyChanger],
    queryFn: fetchData,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  return queryResult;
};

export default useQueryFetcher;
