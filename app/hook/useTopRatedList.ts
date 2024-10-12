import { useQuery } from "@tanstack/react-query";
import fetchTopRatedList from "@/lib/fetchTopRatedList";

export default function useTopRatedList() {
  return useQuery<MovieData[]>({
    queryKey: ["topRatedList"],
    queryFn: fetchTopRatedList,
  });
}
