import fetchHeader  from "@/fetchHeader";

export default async function fetchMoviesByGenre(genre? : string, page: number) {
  const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc${genre ? `&with_genres=${genre}` : ''}`
  const response = await fetch(url, fetchHeader);
  const json = response.json()
  return json
}