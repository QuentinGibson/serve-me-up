'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Film, Search, User } from 'lucide-react'
import FeaturedList from '@/components/FeaturedList'
import PopularList from './PopularList'

export function ServeMeGoodPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Film className="h-6 w-6" />
            <span className="text-xl font-bold">Serve Me Good</span>
          </Link>
          <nav className="hidden md:flex space-x-4">
            <Link
              href="/movies"
              className="text-muted-foreground hover:text-primary"
            >
              Movies
            </Link>
            <Link
              href="/reviews"
              className="text-muted-foreground hover:text-primary"
            >
              Reviews
            </Link>
            <Link
              href="/about"
              className="text-muted-foreground hover:text-primary"
            >
              About
            </Link>
          </nav>
          <div className="flex items-center space-x-2">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                <User className="h-4 w-4 mr-2" />
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

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
      </main>

      <footer className="border-t py-8 text-center text-muted-foreground">
        <p>&copy; 2024 Serve Me Good. All rights reserved.</p>
      </footer>
    </div>
  );
}