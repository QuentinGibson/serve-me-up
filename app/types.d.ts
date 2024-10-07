interface MovieData {
  original_title: string
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

interface MovieResponse {
  page: number
  results: MovieData[]
  total_pages: number
  total_results: number
}