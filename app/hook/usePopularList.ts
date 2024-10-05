import { useQuery } from "@tanstack/react-query"
import fetchPopularList from "@/lib/fetchPopularList"

export default function usePopularList() {
  return useQuery<MovieData[]>({ queryKey: ['popularList'], queryFn: fetchPopularList })
}