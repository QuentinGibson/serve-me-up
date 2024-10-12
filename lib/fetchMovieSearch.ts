import fetchHeader from "@/fetchHeader";

export default async function fetchMovieSearch(
  pageParam: unknown,
  query: string,
) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${pageParam}`;
  const response = await fetch(url, fetchHeader);
  return response.json();
}
