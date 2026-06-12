import Link from "next/link";
import Image from "next/image";

type PostCardProps = {
  index: number;
  title: string;
  readTime: number | null;
  slug: string;
  coverImage: string | null;
  createdAt: Date;
  categories: {
    name: string;
    slug: string;
  }[];
};

export function PostCard({
  index,
  title,
  readTime,
  slug,
  coverImage,
  createdAt,
  categories,
}: PostCardProps) {
  const entryNumber = String(index).padStart(3, "0");

  return (
    <Link
      href={`/post/${slug}`}
      className="
        group relative block overflow-hidden border border-black/20
        bg-stone-100 transition-[background,transform] duration-200
        hover:-translate-y-1 hover:bg-white
        dark:border-white/15 dark:bg-neutral-900 dark:hover:bg-neutral-800
      "
    >
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent_0,transparent_17px,rgba(0,0,0,0.16)_17px,rgba(0,0,0,0.16)_18px)] opacity-0 transition-opacity group-hover:opacity-100 dark:bg-[repeating-linear-gradient(90deg,transparent_0,transparent_17px,rgba(255,255,255,0.1)_17px,rgba(255,255,255,0.1)_18px)]" />

      <div className="absolute -left-10 top-1/2 hidden -translate-y-1/2 rotate-90 sm:block">
        <span className="text-[9px] font-mono uppercase tracking-[0.24em] text-neutral-400 dark:text-neutral-500">
          Object / {slug}
        </span>
      </div>

      <div
        className="
          flex items-center justify-between border-b border-black/20 px-4 py-2
          font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-600
          dark:border-white/15 dark:text-neutral-400
        "
      >
        <span>Entry {entryNumber}</span>
        <span>{readTime ?? "--"} Min</span>
      </div>

      <div className="relative aspect-[4/3] overflow-hidden border-b border-black/20 dark:border-white/15">
        {coverImage ? (
          <Image
            src={coverImage}
            alt={title}
            fill
            className="
              object-cover grayscale transition duration-500
              group-hover:scale-[1.03] group-hover:grayscale-0
            "
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[repeating-linear-gradient(135deg,transparent,transparent_8px,rgba(0,0,0,0.05)_8px,rgba(0,0,0,0.05)_9px)] text-xs font-mono uppercase tracking-[0.24em] text-neutral-400 dark:bg-[repeating-linear-gradient(135deg,transparent,transparent_8px,rgba(255,255,255,0.07)_8px,rgba(255,255,255,0.07)_9px)] dark:text-neutral-500">
            Unscanned
          </div>
        )}
        <div className="absolute bottom-2 left-2 border border-black/20 bg-stone-100 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-neutral-600 dark:border-white/15 dark:bg-neutral-950 dark:text-neutral-300">
          {createdAt.toISOString().slice(0, 10)}
        </div>
      </div>

      <div className="px-4 py-6">
        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.24em] text-neutral-500 dark:text-neutral-400">
          Catalogued Thought
        </p>

        <h2
          className="
            text-xl font-medium leading-tight tracking-tight text-neutral-950
            transition-transform group-hover:translate-x-1
            dark:text-neutral-100
          "
        >
          {title}
        </h2>

        <div className="mt-7 flex flex-wrap gap-2">
          {(categories.length ? categories : [{ name: "Unclassified", slug: "none" }]).map(
            (category) => (
              <span
                key={category.slug}
                className="border border-black/20 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-neutral-500 dark:border-white/15 dark:text-neutral-400"
              >
                {category.name}
              </span>
            )
          )}
        </div>
      </div>
    </Link>
  );
}
