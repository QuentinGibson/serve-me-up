"use client";

import { FormEvent, useState, useEffect, Fragment } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Search, Star } from "lucide-react";
import useMovieSearch from "@/app/hook/useMovieSearch";
import { Input } from "./ui/input";

export default function PageComponent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [currentPage, setCurrentPage] = useState(1);
  const [inputValue, setInputValue] = useState(query);
  const router = useRouter();

  const {
    data,
    isLoading,
    isFetchingNextPage,
    isFetchPreviousPageError,
    isFetching,
    status,
    error,
    isError,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    refetch
  } = useMovieSearch(query, currentPage);

const totalPages = data?.pages[0]?.total_pages || 0;
  useEffect(() => {
    if (query) refetch()
  }, [refetch, query, currentPage]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() !== query) {
      router.push(`?q=${encodeURIComponent(inputValue.trim())}`);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return status === "pending" ? (
    <p>Loading...</p>
  ) : status === "error" ? (
    <p>Error: {error.message}</p>
  ) : (
    <>
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

        <div className="space-y-6">
          {data.pages.map((group, i) => (
            <Fragment key={i}>
              {group.results.map((movie) => (
                <Card
                  key={movie.id}
                  className="flex flex-col md:flex-row overflow-hidden"
                >
                  <div className="md:w-1/4 h-[500px] relative">
                    {movie.poster_path || movie.backdrop_path ? (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}${
                          movie.poster_path || movie.backdrop_path
                        }`}
                        alt={`${movie.title} poster`}
                        layout="fill"
                        sizes={`(min-width: 640px) 25vw, 50vw`}
                        objectFit="cover"
                      />
                    ) : (
                      <Image
                        src={`/image-placeholder.webp`}
                        alt={`Director's reel over a bunch of popcorn`}
                        layout="fill"
                        objectFit="cover"
                      />
                    )}
                  </div>
                  <div className="md:w-3/4 flex flex-col">
                    <CardHeader>
                      <CardTitle>{movie.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{movie.overview}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between mt-auto">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span>{movie.vote_average.toFixed(1)}</span>
                      </div>
                      <Link href={`/movies/${movie.id}`}>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </Link>
                    </CardFooter>
                  </div>
                </Card>
              ))}
            </Fragment>
          ))}
        </div>
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(currentPage - 1)}
              isActive={currentPage === 1}
            />
          </PaginationItem>
          {[...Array(totalPages)].map((_, index) => {
            const page = index + 1;
            if (
              page === 1 ||
              page === totalPages ||
              (page >= currentPage - 2 && page <= currentPage + 2)
            ) {
              return (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => handlePageChange(page)}
                    isActive={page === currentPage}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            } else if (page === currentPage - 3 || page === currentPage + 3) {
              return <PaginationEllipsis key={page} />;
            }
            return null;
          })}
          <PaginationItem>
            <PaginationNext
              onClick={() => handlePageChange(currentPage + 1)}
              isActive={currentPage === totalPages || !hasNextPage}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      {isFetching && !isFetchingNextPage && (
        <div className="text-center mt-4">Fetching...</div>
      )}
    </>
  );
}
