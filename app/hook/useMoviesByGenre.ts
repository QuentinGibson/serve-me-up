
import { useInfiniteQuery } from "@tanstack/react-query"
import fetchMoviesByGenre from "@/lib/fetchMoviesByGenre"

export default function useMoviesByGenre(page: number, genre?: string) {
  return useInfiniteQuery<MovieResponse, Error>({
      queryKey: ['movieSearch', genre, page],
      initialPageParam: page,
      queryFn: () => fetchMoviesByGenre(genre, page),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1
      }
      return undefined
    }
  })
}