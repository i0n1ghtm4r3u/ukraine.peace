import { Link } from "@tanstack/react-router";

const nav = [
  { to: "/fundraisers", label: "Сборы" },
  { to: "/research", label: "Исследования" },
  { to: "/news", label: "Новости" },
] as const;

export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-6">
        <Link to="/" className="font-mono text-sm tracking-[0.2em] text-bone">
          ukraine<span className="text-ember">.</span>peace
        </Link>
        <nav className="flex items-center gap-6">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="eyebrow hidden transition-colors hover:text-bone sm:inline"
              activeProps={{ className: "text-bone" }}
            >
              {item.label}
            </Link>
          ))}
          <Link to="/donate" className="btn-ember !px-4 !py-2">
            Помочь
          </Link>
        </nav>
      </div>
    </header>
  );
}
