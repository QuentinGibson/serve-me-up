import fetchHeader from "@/fetchHeader";

export default async function fetchMovieSearch(id: string) {
  const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
  const response = await fetch(url, fetchHeader);
  const movieDetailResponse: MovieDetails = await response.json();
  return movieDetailResponse;
}
