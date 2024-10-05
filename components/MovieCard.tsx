import { Link } from "lucide-react";
import { Button } from "./ui/button";

export default function MovieCard(movie: MovieData) {
  return (
    <>
              <img
                src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}${movie.backdrop_path}`}
                alt="Movie poster"
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold mb-2">{movie.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {movie.overview}
                </p>
                <Link href={`/movies/${movie.id}`}>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </Link>
              </div>
              </>
  )
}