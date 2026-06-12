import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { markdownToHtml } from "@/lib/markdown";
import { CodeCopyScript } from "@/components/CodeCopyScript";
import { CornerMarks } from "@/components/corner-marks";
import { PostContent } from "@/components/PostContent";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: { slug },
    include: {
      categories: {
        select: {
          name: true,
          slug: true,
        },
      },
    },
  });

  if (!post) notFound();

  const connectedEntries = await prisma.post.findMany({
    where: {
      published: true,
      slug: {
        not: post.slug,
      },
      ...(post.categories.length
        ? {
            categories: {
              some: {
                slug: {
                  in: post.categories.map((category) => category.slug),
                },
              },
            },
          }
        : {}),
    },
    orderBy: { createdAt: "desc" },
    take: 4,
    select: {
      id: true,
      title: true,
      slug: true,
      createdAt: true,
      expectedReadTime: true,
    },
  });

  const html = await markdownToHtml(post.content);
  const primaryClass = post.categories[0]?.name ?? "Unclassified";
  const entryId = post.slug.toUpperCase();
  const date = post.createdAt.toISOString().slice(0, 10);
  const diskLetter = String.fromCharCode(65 + (post.createdAt.getFullYear() % 26));

  return (
    <main className="relative overflow-hidden bg-stone-100 text-neutral-950 dark:bg-neutral-950 dark:text-neutral-100">
      <section className="document-shell bg-grid px-4 py-8  sm:px-6 lg:px-8">
        <div className="reading-progress fixed left-0 top-0 z-50 h-1 w-full origin-left bg-neutral-950" />
        <CornerMarks />

        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[180px_minmax(0,1fr)_220px]">
            <aside className="hidden border-r border-black/15 pr-6 font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-500 lg:block">
              <div className="sticky top-28 space-y-8">
                <p className="[writing-mode:vertical-rl]">
                  Archive Entry / {post.slug}
                </p>
                <div className="space-y-3 pt-10">
                  <p>Status: Preserved</p>
                  <p>Class: {primaryClass}</p>
                  <p>Mode: Slow Read</p>
                </div>
              </div>
            </aside>

            <article>
              <header className="mb-16 border-b border-black/20 pb-8">
                <div className="mb-8 flex flex-wrap gap-2">
                  {post.categories.length ? (
                    post.categories.map((category) => (
                      <span
                        key={category.slug}
                        className="border border-black/20 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500"
                      >
                        {category.name}
                      </span>
                    ))
                  ) : (
                    <span className="border border-black/20 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500">
                      Unclassified
                    </span>
                  )}
                </div>

                <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.28em] text-neutral-500">
                  Archive Entry / Technical Thought Record
                </p>
                <h1 className="max-w-4xl text-[clamp(2.7rem,7vw,6.5rem)] font-semibold leading-[0.95] text-neutral-950">
                  {post.title}
                </h1>

                <div className="mt-8 grid gap-px border border-black/20 bg-black/20 font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-600 sm:grid-cols-3">
                  <span className="bg-stone-100 px-3 py-3">Date / {date}</span>
                  <span className="bg-stone-100 px-3 py-3">
                    Read / {post.expectedReadTime ?? "--"} Min
                  </span>
                  <span className="bg-stone-100 px-3 py-3">Id / {entryId}</span>
                </div>
              </header>

              {post.coverImage && (
                <figure className="relative mb-16 aspect-video overflow-hidden border border-black/20">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover grayscale transition duration-500 hover:grayscale-0"
                    sizes="(max-width: 1024px) 100vw, 760px"
                    priority={false}
                  />

                  <figcaption className="absolute left-2 top-2 border border-black/20 bg-stone-100 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-600">
                    Figure 01 / Source Material
                  </figcaption>
                </figure>
              )}

              <PostContent post={post} html={html} />

              <footer className="mt-20 border-t border-black/20 pt-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-neutral-500">
                  End of Entry / {entryId}
                </p>
              </footer>
            </article>

            <aside className="border-t border-black/20 pt-8 lg:border-t-0 lg:pt-0">
              <div className="sticky top-28 space-y-6">
                <section className="border border-black/20">
                  <h2 className="border-b border-black/20 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-500">
                    Reading History
                  </h2>
                  <div className="space-y-3 p-3 font-mono text-[11px] uppercase tracking-[0.14em] text-neutral-600">
                    <p>Opened: Now</p>
                    <p>Progress: Active</p>
                    <p>Annotation Layer: Ready</p>
                  </div>
                </section>

                <section className="border border-black/20">
                  <h2 className="border-b border-black/20 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-500">
                    Connected Thoughts
                  </h2>
                  <div className="divide-y divide-black/15">
                    {connectedEntries.length ? (
                      connectedEntries.map((entry) => (
                        <Link
                          key={entry.id}
                          href={`/post/${entry.slug}`}
                          className="block p-3 transition-colors hover:bg-white"
                        >
                          <p className="text-sm leading-snug tracking-tight text-neutral-900">
                            {entry.title}
                          </p>
                          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-500">
                            {entry.createdAt.toISOString().slice(0, 10)} /{" "}
                            {entry.expectedReadTime ?? "--"} Min
                          </p>
                        </Link>
                      ))
                    ) : (
                      <p className="p-3 font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-500">
                        No connected thoughts found.
                      </p>
                    )}
                  </div>
                </section>

                <section className="border border-black/20 p-3">
                  <h2 className="font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-500">
                    References
                  </h2>
                  <p className="mt-4 text-sm leading-6 text-neutral-600">
                    References and personal annotations can be layered onto this
                    entry as the archive grows.
                  </p>
                </section>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="hidden min-h-screen px-3 py-5  sm:px-5 lg:px-8">
        <div className="reading-progress fixed left-0 top-0 z-50 h-1 w-full origin-left bg-[#8cff7a]" />
        <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(216,246,208,0.06),transparent_32%),linear-gradient(rgba(140,255,122,0.045)_1px,transparent_1px)] [background-size:100%_100%,100%_4px]" />

        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-4 grid gap-4 lg:grid-cols-[320px_1fr]">
            <aside className="machine-window boot-panel h-fit">
              <div className="machine-titlebar">
                <span>Sector Retrieval</span>
                <span>RUN</span>
              </div>
              <div className="space-y-4 p-4 font-mono text-[10px] uppercase leading-6 tracking-[0.18em] text-[#8cff7a]/75">
                <p>Loading memory sector...</p>
                <p>Sector found</p>
                <p>ID: {entryId}</p>
                <p>Date: {date}</p>
                <p>Status: Recovered</p>
                <p>Checksum: Valid</p>
                <p className="terminal-cursor">Opening read-only file</p>
              </div>
            </aside>

            <article className="machine-window">
              <div className="machine-titlebar">
                <span>Memory File / {entryId}</span>
                <span>READ ONLY</span>
              </div>

              <header className="border-b-2 border-[#8cff7a]/35 p-4">
                <div className="mb-6 grid gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[#8cff7a]/70 sm:grid-cols-3">
                  <span>Directory: {primaryClass}</span>
                  <span>Disk: {diskLetter} / {post.createdAt.getFullYear()}</span>
                  <span>Read: {post.expectedReadTime ?? "--"} Min</span>
                </div>
                <h1 className="max-w-4xl font-mono text-[clamp(1.6rem,4vw,3.5rem)] font-normal uppercase leading-tight tracking-[0.04em] text-[#d8f6d0]">
                  {post.title}
                </h1>
              </header>

              {post.coverImage && (
                <figure className="relative mx-4 mt-4 aspect-video overflow-hidden border-2 border-[#8cff7a]/35">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover grayscale contrast-125 sepia"
                    sizes="(max-width: 1024px) 100vw, 760px"
                    priority={false}
                  />

                  <figcaption className="absolute left-2 top-2 border-2 border-[#8cff7a]/35 bg-black px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#8cff7a]">
                    Recovered Image Buffer
                  </figcaption>
                </figure>
              )}

              <div className="p-4 sm:p-6">
                <PostContent post={post} html={html} />
              </div>
            </article>
          </div>

          <div className="grid gap-4 border-t-2 border-[#8cff7a]/30 pt-4 lg:grid-cols-[1fr_320px]">
            <section className="machine-window">
              <div className="machine-titlebar">
                <span>Linked Sectors</span>
                <span>{connectedEntries.length} FOUND</span>
              </div>
              <div className="divide-y-2 divide-[#8cff7a]/25">
                {connectedEntries.length ? (
                  connectedEntries.map((entry, index) => (
                    <Link
                      key={entry.id}
                      href={`/post/${entry.slug}`}
                      className="grid gap-3 p-4 font-mono uppercase tracking-[0.13em] transition-colors hover:bg-[#8cff7a] hover:text-black sm:grid-cols-[96px_1fr_100px]"
                    >
                      <span className="text-[10px]">
                        LINK {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm normal-case tracking-normal">
                        {entry.title}
                      </span>
                      <span className="text-[10px]">
                        {entry.expectedReadTime ?? "--"} MIN
                      </span>
                    </Link>
                  ))
                ) : (
                  <p className="p-4 font-mono text-[10px] uppercase tracking-[0.18em] text-[#8cff7a]/70">
                    No linked sectors recovered.
                  </p>
                )}
              </div>
            </section>

            <section className="machine-window h-fit">
              <div className="machine-titlebar">
                <span>Access Log</span>
                <span>ACTIVE</span>
              </div>
              <div className="space-y-3 p-4 font-mono text-[10px] uppercase leading-6 tracking-[0.16em] text-[#8cff7a]/75">
                <p>Opened: Today</p>
                <p>Saved Sector: Available</p>
                <p>Annotation Layer: Mounted</p>
                <p>User Record: Active</p>
              </div>
            </section>
          </div>
        </div>

      </section>

      <CodeCopyScript />
    </main>
  );
}
