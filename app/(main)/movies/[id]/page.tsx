import MovieDetailsPage from "@/components/app-movies-details-page";
import { useParams } from "next/navigation";


export default async function Page() {
  const params = useParams();
  const id = params.id as string
  return <MovieDetailsPage id={id} />;
}
