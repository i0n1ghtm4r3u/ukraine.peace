<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Project rules
- All site content (photos with credits, directions, fundraisers, news, research, wallets) lives in `src/lib/content.ts`; pages only render it — one place to swap sample content for real content.
- Donation directions are a closed list (`DIRECTIONS`) validated by `parseDirection`; the donate page's search params never accept other values — keeps the scope humanitarian-only.
- Photos are real, freely licensed images served via Lovable Assets pointers in `src/assets/photos/`, each with author, license and source link shown on the page — license compliance.
- Visual style is defined only in `src/styles.css` (tokens + `@utility` classes like `photo-grade`, `btn-ember`); components use those, never raw colors.
- Fundraiser pages (`/fundraisers`, `/fundraisers/$category`) wrap content in `.theme-hope`, a scoped token override in `src/styles.css` — lighter, warmer mood without touching the rest of the site.
