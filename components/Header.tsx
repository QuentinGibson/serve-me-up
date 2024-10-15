import { Film } from 'lucide-react';
import Link from 'next/link';
import UserButtons from './UserButtons';

export default async function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Film className="h-6 w-6" />
          <span className="text-xl font-bold ">Serve Me Good</span>
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
          <UserButtons />
        </div>
      </div>
    </header>
  );
}
