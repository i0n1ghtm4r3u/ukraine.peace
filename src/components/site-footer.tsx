import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-3">
        <div>
          <p className="font-mono text-sm tracking-[0.2em] text-bone">
            ukraine<span className="text-ember">.</span>peace
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Help for people hurt by the war: medicine, food and medical care.
          </p>
        </div>
        <nav className="flex flex-col gap-3 text-sm text-muted-foreground">
          <Link to="/fundraisers" className="hover:text-bone">Fundraisers</Link>
          <Link to="/research" className="hover:text-bone">Research</Link>
          <Link to="/news" className="hover:text-bone">News</Link>
          <Link to="/donate" className="hover:text-bone">Donate</Link>
        </nav>
        <p className="text-xs leading-relaxed text-muted-foreground">
          Photos of destruction: Wikimedia Commons, by Kharkivian, Dimma837 and Kisnaak. Licences:
          CC BY-SA 4.0 and CC0. The author and a link to the original are under each photo.
        </p>
      </div>
    </footer>
  );
}
