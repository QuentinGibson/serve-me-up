import {useQuery} from "@tanstack/react-query"
import fetchFeaturedList from "@/lib/fetchFeaturedList"

export default function useFeaturedList() {
  return useQuery<MovieData[]>({ queryKey: ['featuredList'], queryFn: fetchFeaturedList })
}