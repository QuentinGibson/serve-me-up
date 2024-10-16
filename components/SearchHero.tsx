"use client"
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function SearchHero() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push("/movies/search?q=" + encodeURIComponent(query));
    }
  };
  return (
    <section className="py-20 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Serve Me Good</h1>
      <p className="text-xl text-muted-foreground mb-8">
        Your ultimate movie database and review platform
      </p>
      <form onSubmit={handleSubmit}>
        <div className="max-w-md mx-auto flex">
          <Input
            type="search"
            placeholder="Search for movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="rounded-r-none"
          />
          <Button type="submit" className="rounded-l-none">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </form>
    </section>
  );
}
