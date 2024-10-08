'use client'

import Image from "next/image"
import { Star, Clock, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// This is a mock function. You'll need to implement the actual data fetching logic.
async function getMovieDetails(id: string) {
  // Fetch movie details from TMDB API
  return {
    title: "Inception",
    poster_path: "/placeholder.svg",
    release_date: "2010-07-16",
    runtime: 148,
    genres: ["Action", "Science Fiction", "Adventure"],
    overview: "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible: \"inception\", the implantation of another person's idea into a target's subconscious.",
    vote_average: 8.4,
    cast: [
      { name: "Leonardo DiCaprio", character: "Cobb", profile_path: "/placeholder.svg" },
      { name: "Joseph Gordon-Levitt", character: "Arthur", profile_path: "/placeholder.svg" },
      { name: "Ellen Page", character: "Ariadne", profile_path: "/placeholder.svg" },
      { name: "Tom Hardy", character: "Eames", profile_path: "/placeholder.svg" },
    ]
  }
}

export async function MovieDetailsComponent({ params }: { params: { id: string } }) {
  const movie = await getMovieDetails(params.id)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={500}
            height={750}
            className="rounded-lg shadow-lg w-full"
          />
        </div>
        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-400 mr-1" />
              <span>{movie.vote_average.toFixed(1)}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-1" />
              <span>{movie.runtime} min</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-1" />
              <span>{new Date(movie.release_date).getFullYear()}</span>
            </div>
          </div>
          <div className="mb-4">
            {movie.genres.map((genre) => (
              <Badge key={genre} variant="secondary" className="mr-2">
                {genre}
              </Badge>
            ))}
          </div>
          <p className="text-lg mb-6">{movie.overview}</p>
          <h2 className="text-2xl font-semibold mb-4">Cast</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {movie.cast.map((actor) => (
              <Card key={actor.name}>
                <CardContent className="p-4">
                  <Avatar className="w-20 h-20 mx-auto mb-2">
                    <AvatarImage src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`} alt={actor.name} />
                    <AvatarFallback>{actor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-center">{actor.name}</h3>
                  <p className="text-sm text-center text-gray-500">{actor.character}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">User Reviews</h2>
        <p className="text-gray-500">User reviews will be implemented in a future update.</p>
      </div>
    </div>
  )
}