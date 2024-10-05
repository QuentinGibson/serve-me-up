'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'
import FeaturedList from '@/components/FeaturedList'
import PopularList from './PopularList'
import TopRatedList from './TopRatedList'

export function ServeMeGoodPage() {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <section className="py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Serve Me Good</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Your ultimate movie database and review platform
          </p>
          <div className="max-w-md mx-auto flex">
            <Input
              type="search"
              placeholder="Search for movies..."
              className="rounded-r-none"
            />
            <Button type="submit" className="rounded-l-none">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </section>

        <FeaturedList />
        <PopularList />
        <TopRatedList />
      </main>
    </div>
  );
}