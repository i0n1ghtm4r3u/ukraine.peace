import type { Photo } from "@/lib/content";
import { cn } from "@/lib/utils";

export function PhotoFigure({ photo, className }: { photo: Photo; className?: string }) {
  return (
    <figure className={cn("group relative overflow-hidden bg-muted", className)}>
      <img
        src={photo.src}
        alt={`${photo.place}. ${photo.caption}`}
        loading="lazy"
        className="photo-grade h-full w-full object-cover transition-[filter,transform] duration-[2000ms] group-hover:scale-[1.03] group-hover:[filter:grayscale(0.4)_brightness(0.8)]"
      />
      <figcaption className="caption-fade absolute inset-x-0 bottom-0 p-4 pt-16">
        <p className="eyebrow !text-bone">{photo.place}</p>
        <p className="mt-1 text-sm text-foreground/90">{photo.caption}</p>
        <a
          href={photo.source}
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-block font-mono text-[0.65rem] text-muted-foreground underline-offset-2 hover:underline"
        >
          Photo: {photo.author} · {photo.license}
        </a>
      </figcaption>
    </figure>
  );
}
