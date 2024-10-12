import fetchHeader from "@/fetchHeader";

export default async function fetchMovieSearch() {
  if (!process.env.NEXT_PUBLIC_TMDB_MOVIE_GENRES_URL)
    throw Error("Missing NEXT_PUBLIC_TMDB_POPULAR_MOVIES_URL");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const url = process.env.NEXT_PUBLIC_TMDB_MOVIE_GENRES_URL;
  const response = await fetch(url, fetchHeader);
  return response.json();
}
