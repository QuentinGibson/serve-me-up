'use client'

import useMovieDetails from "@/app/hook/useMovieDetails";
import {Star, Clock, Calendar, Search} from 'lucide-react'
import Image from 'next/image'
import { Tag } from "./ui/Tagline";
import { Input } from "./ui/input";
import router from "next/router";
import { FormEvent, useState } from "react";
import { Button } from "./ui/button";
import { useSearchParams } from "next/navigation";

export default function MovieDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const {data: movie, isError, error, isPending} = useMovieDetails(params.id);
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || "";
  const [inputValue, setInputValue] = useState(query);
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() !== query) {
      router.push(`?q=${encodeURIComponent(inputValue.trim())}`);
    }
  };

  if (isPending) {
    return (
      <p>Loading...</p>
    )
  }

  if (isError) {
    return (
      <p>{error.message}</p>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
<div className="flex justify-end">
          <form onSubmit={onSubmit} className="mb-8">
            <div className="flex items-center space-x-2">
              <Input
                type="search"
                placeholder="Search movies..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-grow"
              />
              <Button type="submit">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </form>
        </div>
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

          <span className="text-lg text-muted-foreground mb-6">{movie.status}</span>
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
          <div className="mb-4 space-y-2">
            {movie.genres.map((genre) => (
              <div className="flex" key={genre.id}>
                <Tag>{genre.name}</Tag>
              </div>
            ))}
          </div>
          <p className="text-lg mb-6">{movie.overview}</p>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">User Reviews</h2>
        <p className="text-gray-500">
          User reviews will be implemented in a future update.
        </p>
      </div>
    </div>
  );
}
