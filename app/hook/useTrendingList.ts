import { useQuery } from "@tanstack/react-query";
import fetchTrendingMoviesDay from "@/lib/fetchTrendingMovies";

export default function useTrendingList(period: string) {
  return useQuery<MovieData[]>({
    queryKey: ["trendingMovies", period],
    queryFn: () => fetchTrendingMoviesDay(period),
  });
}
