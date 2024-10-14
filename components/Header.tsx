import { Film, User } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Header() {
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
          <Link href="/signIn">
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
  );
}
