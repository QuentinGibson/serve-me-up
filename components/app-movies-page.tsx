"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import GenreDropdown from "./GenreDropdown";
import useMoviesByGenre from "@/app/hook/useMoviesByGenre";
import { useSearchParams } from "next/navigation";
import { Fragment, useState } from "react";
import Image from "next/image";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "./ui/pagination";

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const searchParams = useSearchParams();
  const genre = searchParams.get("genre") || undefined;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const { data, isPending, isError, error, hasNextPage } = useMoviesByGenre(
    currentPage,
    genre,
  );
  const totalPages = data?.pages[0]?.total_pages || 0;

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  return (
    <div className="flex-grow container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Browse Movies by Genre</h1>

      <div className="mb-8">
        <GenreDropdown />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {data.pages.map((group, i) => (
          <Fragment key={i}>
            {group.results.map((movie) => (
              <Card key={movie.id} className="flex flex-col">
                <CardHeader className="p-0 relative h-[500px]">
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
                </CardHeader>
                <CardContent className="flex-grow p-4">
                  <CardTitle>{movie.title}</CardTitle>
                  <CardDescription>{movie.release_date}</CardDescription>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button asChild className="w-full">
                    <Link href={`/movies/${movie.id}`}>View Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </Fragment>
        ))}
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
    </div>
  );
}
