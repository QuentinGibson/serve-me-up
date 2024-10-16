"use client";

import { useState, useEffect, Fragment } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
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
import { Star } from "lucide-react";
import useMovieSearch from "@/app/hook/useMovieSearch";
import SearchMovieSection from "./SearchMovieSection";

export default function PageComponent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data,
    isFetchingNextPage,
    isFetching,
    status,
    error,
    hasNextPage,
    refetch,
  } = useMovieSearch(query, currentPage);
  const totalPages = data?.pages[0]?.total_pages || 0;

  useEffect(() => {
    if (query) refetch();
  }, [refetch, query, currentPage]);

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
          <SearchMovieSection />
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
                      <Link href={`/movies/${movie.id}`}>
                        <Image
                          src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}${
                            movie.poster_path || movie.backdrop_path
                          }`}
                          alt={`${movie.title} poster`}
                          sizes={`(min-width: 640px) 25vw, 20vw`}
                          fill={true}
                          objectFit="cover"
                        />
                      </Link>
                    ) : (
                      <Link href={`/movies/${movie.id}`}>
                        <Image
                          src={`/image-placeholder.webp`}
                          alt={`Director's reel over a bunch of popcorn`}
                          sizes={`(min-width: 640px) 25vw, 20vw`}
                          fill={true}
                          objectFit="cover"
                        />
                      </Link>
                    )}
                  </div>
                  <div className="md:w-3/4 flex flex-col">
                    <Link href={`/movies/${movie.id}`}>
                      <CardHeader>
                        <CardTitle>{movie.title}</CardTitle>
                      </CardHeader>
                    </Link>
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
