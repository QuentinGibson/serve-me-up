import fetchHeader from "@/fetchHeader";

export default async function fetchFeaturedList() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1`,
      fetchHeader,
    );
    const json = await response.json();
    const movies = json.results.slice(0, 6);
    return movies;
  } catch (error) {
    console.error("Error fetching featured movies", error);
    return [];
  }
}
