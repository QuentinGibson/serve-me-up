import { useInfiniteQuery } from "@tanstack/react-query";
import fetchMovieSearch from "@/lib/fetchMovieSearch";

export default function useMovieSearch(query: string, page: number) {
  return useInfiniteQuery<MovieResponse, Error>({
    queryKey: ["movieSearch", query, page],
    initialPageParam: page,
    queryFn: () => fetchMovieSearch(page, query),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });
}
