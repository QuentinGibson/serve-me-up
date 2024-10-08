
import { useQuery } from "@tanstack/react-query"
import fetchMovieDetails from "@/lib/fetchMovieDetails"

export default function useMovieDetails(id: string) {
  return useQuery<MovieDetails, Error>({
      queryKey: ['movieSearch', id], queryFn: () => fetchMovieDetails(id),
  })
}