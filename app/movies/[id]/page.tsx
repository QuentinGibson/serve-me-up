import MovieDetailsPage from "@/components/app-movies-details-page";

export default function Page({params}: {params: {id: string}}) {
  return <MovieDetailsPage params={params} />
}