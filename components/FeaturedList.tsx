"use client"

import useFeaturedList from "@/app/hook/useFeaturedList";
import { Button } from "./ui/button";
import Link from "next/link";
import MovieCardSkeleton from "./MovieCardSkeleton";

export default function FeaturedList() {
  const { data, isPending, isError, error } = useFeaturedList();
  if (isPending) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        <MovieCardSkeleton />
      </div>
    );
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">In Theatres Now</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.map((movie, index) => (
            <div
              key={index}
              className="bg-card rounded-lg shadow-lg overflow-hidden"
            >
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
