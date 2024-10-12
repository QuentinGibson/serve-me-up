import { useQuery } from "@tanstack/react-query";
import fetchMovieGenres from "@/lib/fetchMovieGenres";

export default function useMovieGenres() {
  return useQuery<GenreResponse>({
    queryKey: ["movieGenres"],
    queryFn: fetchMovieGenres,
  });
}
