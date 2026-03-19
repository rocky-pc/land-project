import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 glass border-b-0 border-transparent bg-background/40 backdrop-blur-md px-6 py-4 flex items-center justify-between transition-colors duration-300">
      <div className="font-serif text-2xl font-bold tracking-tight text-primary">
        <Link href="/">உங்கள் நிலம்</Link>
      </div>
      <div className="hidden md:flex items-center gap-8 font-medium text-sm text-foreground/80">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <Link href="/cctv" className="hover:text-primary transition-colors">Live CCTV</Link>
        <Link href="/analytics" className="hover:text-primary transition-colors">Plot Analytics</Link>
        <Link href="/portal" className="hover:text-primary transition-colors">Investor Portal</Link>
      </div>
      <div>
        <Link href="/contact" passHref>
          <Button variant="default" className="rounded-full">Contact Concierge</Button>
        </Link>
      </div>
    </nav>
  );
}
