import useTrendingList from "@/app/hook/useTrendingList"
import { Button } from "./ui/button";
import Link from "next/link";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react";
import { Star } from "lucide-react";
import MovieCardSkeleton from "./MovieCardSkeleton";

export default function TrendingMoviesList() {
  const [trendingPeriod, setTrendingPeriod] = useState('week')
  const { data, isPending, isError, error } = useTrendingList(trendingPeriod);
  if (isPending) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">

        <MovieCardSkeleton isTrending={true} />
      </div>
    );
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Trending Movies</h2>
            <Select value={trendingPeriod} onValueChange={setTrendingPeriod}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Of the Day</SelectItem>
                <SelectItem value="week">Of the Week</SelectItem>
              </SelectContent>
            </Select>
          </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {data.map((movie) => (
            <Card key={movie.id}>
                <CardHeader>
                  <CardTitle>{movie.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <img 
                    src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}${movie.backdrop_path}`} 
                    alt={`${movie.title} poster`} 
                    className="w-full h-40 object-cover rounded-md"
                  />
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span>{movie.vote_average.toFixed(1)}</span>
                  </div>
                  <Link href={`/movies/${movie.id}`}>
                    <Button variant="outline" size="sm">View Details</Button>
                  </Link>
                </CardFooter>
              </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
