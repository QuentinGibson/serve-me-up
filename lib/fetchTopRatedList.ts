

import fetchHeader from "@/fetchHeader"

export default async function fetchTopRatedList() {
  try {
    if (!process.env.NEXT_PUBLIC_TMDB_TOP_RATED_MOVIES_URL) throw Error("Missing NEXT_PUBLIC_TMDB_POPULAR_MOVIES_URL")
    const response = await fetch(process.env.NEXT_PUBLIC_TMDB_TOP_RATED_MOVIES_URL, fetchHeader)

    const json =  await response.json()
    const movies = json.results.slice(0, 6)
    return movies
  } catch (error) {
    console.error("Error fetching featured movies", error)
    return []
  }
}