import fetchHeader from "@/fetchHeader"

export default async function fetchTrendingMovies(period: string) {
    if (!process.env.NEXT_PUBLIC_TMDB_TRENDING_MOVIES_WEEK_URL || !process.env.NEXT_PUBLIC_TMDB_TRENDING_MOVIES_DAY_URL) throw Error("Missing NEXT_PUBLIC_TMDB_POPULAR_MOVIES_URL")
  const url =
    period === "day"
    ? process.env.NEXT_PUBLIC_TMDB_TRENDING_MOVIES_DAY_URL
    : process.env.NEXT_PUBLIC_TMDB_TRENDING_MOVIES_WEEK_URL
  try {
    const response = await fetch(url, fetchHeader)

    const json =  await response.json()
    const movies = json.results.slice(0, 6)
    return movies
  } catch (error) {
    console.error("Error fetching featured movies", error)
    return []
  }
}