import useMovieGenres from "@/app/hook/useMovieGenres";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";

export default function GenreDropdown() {
  const { data, isPending, isError, error } = useMovieGenres();
  const genreObjects = data?.genres;
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentGenre = searchParams.get("genre") || "";

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  function handleSelectValueChange(value: string) {
    console.log("not yet implemented:", value);
    router.push(`?genre=${value}`);
  }

  return (
    <Select defaultValue={currentGenre} onValueChange={handleSelectValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Genre" />
      </SelectTrigger>
      <SelectContent>
        {genreObjects?.map(({ name, id }) => (
          <SelectItem key={id} value={id.toString()}>
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
