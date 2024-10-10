'use client'

import FeaturedList from '@/components/FeaturedList'
import PopularList from '@/components/PopularList'
import TopRatedList from '@/components/TopRatedList'
import TrendingMoviesList from "@/components/TrendingMoviesList"
import SearchHero from './SearchHero'

export default function ServeMeGoodPage() {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <SearchHero />
        <FeaturedList />
        <PopularList />
        <TopRatedList />
        <TrendingMoviesList />
      </main>
    </div>
  );
}