export const revalidate = 60;

import Link from "next/link";
import { PostCard } from "@/components/layout/PostCard";
import prisma from "@/lib/prisma";

export default async function Home() {
  const posts = await prisma.post.findMany({
    where: {
      published: true,
    },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      coverImage: true,
      createdAt: true,
      expectedReadTime: true,
      categories: {
        select: {
          name: true,
          slug: true,
        },
      },
    },
  });

  const classifications = posts.reduce<Record<string, number>>((acc, post) => {
    post.categories.forEach((category) => {
      acc[category.name] = (acc[category.name] ?? 0) + 1;
    });
    return acc;
  }, {});

  const years = Array.from(
    posts.reduce<Map<number, number>>((acc, post) => {
      const year = post.createdAt.getFullYear();
      acc.set(year, (acc.get(year) ?? 0) + 1);
      return acc;
    }, new Map()),
  ).sort(([a], [b]) => b - a);

  const graphNodes = Object.entries(classifications).slice(0, 6);
  const firstPost = posts[0];
  const totalReadTime = posts.reduce(
    (sum, post) => sum + (post.expectedReadTime ?? 0),
    0,
  );
  const directories = Object.entries(classifications);

  return (
    <main className="relative overflow-hidden bg-stone-100 text-neutral-950 dark:bg-neutral-950 dark:text-neutral-100">
      <section className="archive-shell bg-grid px-4 py-8  sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 z-0 hidden grid-cols-12 gap-4 px-8 lg:grid">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="border-l border-black/5" />
          ))}
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <section className="grid min-h-[78vh] border-y border-black/20 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="flex flex-col justify-between border-black/20 py-8 lg:border-r lg:py-12 lg:pr-12">
              <div>
                <div className="mb-16 grid grid-cols-2 gap-px border border-black/20 bg-black/20 text-[10px] font-mono uppercase tracking-[0.24em] text-neutral-600 sm:grid-cols-4">
                  {["Index 001", "Class Active", "No Feed", "Slow Read"].map(
                    (item) => (
                      <span key={item} className="bg-stone-100 px-3 py-2">
                        {item}
                      </span>
                    ),
                  )}
                </div>

                <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.34em] text-neutral-500">
                  Personal Knowledge Facility
                </p>
                <h1 className="max-w-4xl text-[clamp(3.1rem,9vw,8.4rem)] font-semibold leading-[0.86] text-neutral-950">
                  The Living Archive
                </h1>
                <p className="mt-8 max-w-2xl text-lg leading-8 text-neutral-700">
                  A precision system for thoughts, books, observations,
                  fragments, and philosophies. Entries are catalogued for
                  discovery, not consumed as a feed.
                </p>
              </div>

              <div className="mt-16 grid gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-700 sm:grid-cols-3">
                <div className="border border-black/20 p-4">
                  <span className="block text-3xl font-sans tracking-tight text-neutral-950">
                    {posts.length.toString().padStart(2, "0")}
                  </span>
                  Archive Entries
                </div>
                <div className="border border-black/20 p-4">
                  <span className="block text-3xl font-sans tracking-tight text-neutral-950">
                    {Object.keys(classifications).length
                      .toString()
                      .padStart(2, "0")}
                  </span>
                  Classifications
                </div>
                <div className="border border-black/20 p-4">
                  <span className="block text-3xl font-sans tracking-tight text-neutral-950">
                    {totalReadTime || "--"}
                  </span>
                  Reading Minutes
                </div>
              </div>
            </div>

            <aside className="relative border-t border-black/20 py-8 lg:border-t-0 lg:pl-12">
              <div className="sticky top-24 space-y-8">
                <div className="border border-black/20 bg-stone-100">
                  <div className="flex items-center justify-between border-b border-black/20 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.24em] text-neutral-500">
                    <span>System Diagnostic</span>
                    <span>Live</span>
                  </div>
                  <div className="space-y-4 p-4 font-mono text-xs uppercase tracking-[0.16em] text-neutral-700">
                    <p>Index resolved: complete</p>
                    <p>Retrieval mode: discovery-first</p>
                    <p>
                      Last entry:{" "}
                      {firstPost
                        ? firstPost.createdAt.toISOString().slice(0, 10)
                        : "none"}
                    </p>
                  </div>
                </div>

                <div className="border border-black/20 p-4">
                  <div className="mb-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">
                    <span>Entry Density</span>
                    <span>Last 10</span>
                  </div>
                  <div className="grid grid-cols-5 items-end gap-2">
                    {posts.slice(0, 10).map((post, index) => (
                      <div
                        key={post.id}
                        className="border border-black/20 bg-neutral-950"
                        style={{ height: `${28 + ((index * 17) % 80)}px` }}
                        title={post.title}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </section>

          <section
            id="index"
            className="grid border-b border-black/20 py-14 lg:grid-cols-[280px_1fr]"
          >
            <div className="mb-8 lg:mb-0">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500">
                Index / Classifications
              </p>
            </div>
            <div className="grid gap-px border border-black/20 bg-black/20 sm:grid-cols-2 lg:grid-cols-3">
              {Object.entries(classifications).map(([name, count], index) => (
                <div key={name} className="bg-stone-100 p-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-neutral-500">
                    Class {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-8 text-2xl tracking-tight text-neutral-950">
                    {name}
                  </p>
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-500">
                    {count} connected {count === 1 ? "entry" : "entries"}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section
            id="archive"
            className="grid border-b border-black/20 py-14 lg:grid-cols-[280px_1fr]"
          >
            <div className="mb-8 lg:mb-0">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500">
                Archive / Entries
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
              {posts.map((post, index) => (
                <PostCard
                  key={post.id}
                  index={index + 1}
                  title={post.title}
                  readTime={post.expectedReadTime}
                  slug={post.slug}
                  coverImage={post.coverImage}
                  createdAt={post.createdAt}
                  categories={post.categories}
                />
              ))}
            </div>
          </section>

          <section
            id="map"
            className="grid border-b border-black/20 py-14 lg:grid-cols-[280px_1fr]"
          >
            <div className="mb-8 lg:mb-0">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500">
                Map / Connected Thoughts
              </p>
            </div>
            <div className="relative min-h-[360px] border border-black/20 p-6">
              <div className="absolute left-1/2 top-10 hidden h-[75%] w-px bg-black/20 md:block" />
              <div className="grid gap-5 md:grid-cols-2">
                {graphNodes.length ? (
                  graphNodes.map(([name, count], index) => (
                    <div
                      key={name}
                      className={`relative border border-black/20 bg-stone-100 p-5 ${
                        index % 2 ? "md:translate-y-16" : ""
                      }`}
                    >
                      <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-neutral-500">
                        Node {String(index + 1).padStart(2, "0")}
                      </p>
                      <h2 className="mt-6 text-3xl tracking-tight">{name}</h2>
                      <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-neutral-500">
                        {count} document links
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500">
                    No classifications have been catalogued yet.
                  </p>
                )}
              </div>
            </div>
          </section>

          <section
            id="timeline"
            className="grid py-14 lg:grid-cols-[280px_1fr]"
          >
            <div className="mb-8 lg:mb-0">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500">
                Timeline / Chronological Register
              </p>
            </div>
            <div className="space-y-4">
              {years.map(([year, count], index) => (
                <div
                  key={year}
                  className="grid border border-black/20 sm:grid-cols-[140px_1fr]"
                >
                  <div className="border-b border-black/20 p-5 text-4xl tracking-tight sm:border-b-0 sm:border-r">
                    {year}
                  </div>
                  <div className="p-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-neutral-500">
                      Register {String(index + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-4 max-w-2xl text-xl tracking-tight">
                      {count === 1
                        ? "A single preserved fragment enters the archive."
                        : `${count} entries mark a visible shift in the archive.`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>

      <section className="hidden min-h-screen px-3 py-5  sm:px-5 lg:px-8">
        <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(216,246,208,0.06),transparent_32%),linear-gradient(rgba(140,255,122,0.045)_1px,transparent_1px)] [background-size:100%_100%,100%_4px]" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <section className="grid min-h-[82vh] gap-4 lg:grid-cols-[360px_minmax(0,1fr)]">
            <div className="machine-window boot-panel self-start">
              <div className="machine-titlebar">
                <span>Memory Machine OS</span>
                <span>v2.6</span>
              </div>
              <div className="space-y-5 p-4">
                <div className="mx-auto flex h-24 w-24 items-center justify-center border-2 border-[#8cff7a]/70 bg-[#8cff7a]/10 shadow-[inset_0_0_0_4px_#030503]">
                  <div className="h-12 w-16 border-2 border-[#8cff7a]/80">
                    <div className="h-3 border-b-2 border-[#8cff7a]/80" />
                    <div className="mx-auto mt-4 h-2 w-8 bg-[#8cff7a]/80" />
                  </div>
                </div>
                <div className="font-mono text-[11px] uppercase leading-7 tracking-[0.18em] text-[#8cff7a]/80">
                  <p>SYSTEM STATUS: ONLINE</p>
                  <p>ARCHIVES FOUND: {posts.length}</p>
                  <p>
                    LAST MEMORY SAVED:{" "}
                    {firstPost
                      ? firstPost.createdAt.toISOString().slice(0, 10)
                      : "NONE"}
                  </p>
                  <p>USER RECORD: ACTIVE</p>
                </div>
                <Link
                  href="#memory-directories"
                  className="block border-2 border-[#8cff7a]/80 bg-[#8cff7a] px-4 py-3 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-black shadow-[4px_4px_0_#8cff7a55] active:translate-x-1 active:translate-y-1 active:shadow-none"
                >
                  Access Archive
                </Link>
              </div>
            </div>

            <div className="grid content-start gap-4">
              <div className="machine-window">
                <div className="machine-titlebar">
                  <span>Desktop / Recovered Session</span>
                  <span>READY</span>
                </div>
                <div className="grid gap-4 p-4 md:grid-cols-[1fr_280px]">
                  <div>
                    <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[#8cff7a]/65">
                      Select Directory
                    </p>
                    <div
                      id="memory-directories"
                      className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3"
                    >
                      {(directories.length
                        ? directories
                        : [["Unclassified", posts.length] as [string, number]]
                      ).map(([name, count], index) => (
                        <a
                          href="#memory-files"
                          key={name}
                          className="directory-button"
                        >
                          <span className="disk-icon" />
                          <span className="min-w-0">
                            <span className="block truncate">{name}</span>
                            <span className="mt-1 block text-[9px] text-[#8cff7a]/60">
                              DIR {String(index + 1).padStart(2, "0")} / {count}{" "}
                              FILES
                            </span>
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="border-2 border-[#8cff7a]/35 p-3 font-mono text-[10px] uppercase leading-6 tracking-[0.16em] text-[#8cff7a]/75">
                    <p>&gt; mounting index</p>
                    <p>&gt; directories restored</p>
                    <p>&gt; access log attached</p>
                    <p>&gt; saved sectors writable</p>
                  </div>
                </div>
              </div>

              <div id="memory-files" className="machine-window">
                <div className="machine-titlebar">
                  <span>Memory Files</span>
                  <span>{posts.length.toString().padStart(3, "0")} FOUND</span>
                </div>
                <div className="divide-y-2 divide-[#8cff7a]/25">
                  {posts.slice(0, 8).map((post, index) => (
                    <Link
                      key={post.id}
                      href={`/post/${post.slug}`}
                      className="grid gap-3 p-4 font-mono uppercase tracking-[0.13em] transition-colors hover:bg-[#8cff7a] hover:text-black sm:grid-cols-[88px_1fr_110px]"
                    >
                      <span className="text-[10px]">
                        FILE {String(index + 1).padStart(3, "0")}
                      </span>
                      <span className="text-sm normal-case tracking-normal">
                        {post.title}
                      </span>
                      <span className="text-[10px]">
                        DISK {String.fromCharCode(65 + (index % 26))}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section
            id="machine-map"
            className="grid gap-4 border-t-2 border-[#8cff7a]/30 py-8 lg:grid-cols-[320px_1fr]"
          >
            <div className="font-mono text-[10px] uppercase leading-6 tracking-[0.2em] text-[#8cff7a]/70">
              <p>Sector Map</p>
              <p>Connections are discovered through retrieval, not shown as a feed.</p>
            </div>
            <div className="machine-window min-h-[340px] p-4">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {graphNodes.map(([name, count], index) => (
                  <div
                    key={name}
                    className="sector-node"
                    style={{ animationDelay: `${index * 90}ms` }}
                  >
                    <span>SECTOR {String(index + 1).padStart(2, "0")}</span>
                    <strong>{name}</strong>
                    <small>{count} linked files</small>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section
            id="machine-timeline"
            className="grid gap-4 border-t-2 border-[#8cff7a]/30 py-8 lg:grid-cols-[320px_1fr]"
          >
            <div className="font-mono text-[10px] uppercase leading-6 tracking-[0.2em] text-[#8cff7a]/70">
              <p>Disk Library</p>
              <p>Years are mounted as physical storage.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {years.map(([year, count], index) => (
                <div key={year} className="machine-window disk-card">
                  <div className="machine-titlebar">
                    <span>DISK {String.fromCharCode(65 + index)}</span>
                    <span>{year}</span>
                  </div>
                  <div className="p-4">
                    <div className="mb-5 h-28 border-2 border-[#8cff7a]/60 bg-[#8cff7a]/10 p-3">
                      <div className="h-6 border-2 border-[#8cff7a]/60" />
                      <div className="mt-8 h-8 w-16 bg-[#8cff7a]/70" />
                    </div>
                    <p className="font-mono text-[10px] uppercase leading-6 tracking-[0.18em] text-[#8cff7a]/75">
                      Mount status: recovered
                      <br />
                      Memory files: {count}
                      <br />
                      Index table: valid
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
