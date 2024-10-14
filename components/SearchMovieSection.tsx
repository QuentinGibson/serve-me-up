"use client"

import { Search } from "lucide-react";
import { FormEvent, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useSearchParams, useRouter } from "next/navigation";


export default function SearchMovieSection() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [inputValue, setInputValue] = useState(query);
  const router = useRouter();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() !== query) {
      router.push
        (`/movies/search/?q=${encodeURIComponent(inputValue.trim())}`);
    }
  };
  return (
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
  )
}