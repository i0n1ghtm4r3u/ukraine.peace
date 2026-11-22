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
            Гуманитарная помощь людям, пострадавшим от войны: лекарства и продовольствие.
          </p>
        </div>
        <nav className="flex flex-col gap-3 text-sm text-muted-foreground">
          <Link to="/fundraisers" className="hover:text-bone">Сборы</Link>
          <Link to="/research" className="hover:text-bone">Исследования</Link>
          <Link to="/news" className="hover:text-bone">Новости</Link>
          <Link to="/donate" className="hover:text-bone">Пожертвовать</Link>
        </nav>
        <p className="text-xs leading-relaxed text-muted-foreground">
          Фотографии разрушений — Викисклад (Wikimedia Commons), авторы Kharkivian, Dimma837,
          Kisnaak; лицензии CC BY-SA 4.0 и CC0. Автор и ссылка на оригинал указаны под каждым
          снимком.
        </p>
      </div>
    </footer>
  );
}
