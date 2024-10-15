import MovieDetailsPage from "@/components/app-movies-details-page";

interface PageProps {
  params: {
    id: string;
  };

}

export default function Page({ params }: PageProps) {
  return <MovieDetailsPage params={params} />;
}
