"use client";
import { useState, useEffect } from "react";
import { Search, Database } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import Link from "next/link";
import { Kbd } from "@/components/ui/kbd";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const sections = [
    ["INDEX", "/#index"],
    ["ARCHIVE", "/#archive"],
    ["MAP", "/#map"],
    ["TIMELINE", "/#timeline"],
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-40 border-b border-black/20 bg-stone-100/95 backdrop-blur dark:border-white/15 dark:bg-neutral-950/95">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-16 items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-3 text-neutral-950 transition-colors dark:text-neutral-100"
          >
            <span className="flex h-8 w-8 items-center justify-center border border-black/25 dark:border-white/20">
              <Database className="h-4 w-4" />
            </span>
              <span className="leading-none">
                <span className="block text-sm font-semibold uppercase tracking-[0.24em]">
                  Living Archive
                </span>
                <span className="hidden font-mono text-[9px] uppercase tracking-[0.24em] text-neutral-500 dark:text-neutral-400 sm:block">
                  User Record Online
                </span>
              </span>
          </Link>

          <div className="hidden items-center border border-black/20 font-mono text-[10px] uppercase tracking-[0.2em] dark:border-white/15 md:flex">
            {sections.map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className="border-r border-black/20 px-3 py-2 text-neutral-600 transition-colors last:border-r-0 hover:bg-neutral-950 hover:text-white dark:border-white/15 dark:text-neutral-300 dark:hover:bg-white dark:hover:text-neutral-950"
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <div className="relative hidden sm:block">
              <input
                type="text"
                placeholder="Archive Query"
                readOnly
                onClick={() =>
                  document.dispatchEvent(
                    new KeyboardEvent("keydown", { key: "k", ctrlKey: true }),
                  )
                }
                className="
                  w-44 cursor-pointer border border-black/25 bg-transparent
                  px-3 py-2 pr-16 font-mono text-[11px] uppercase tracking-[0.16em]
                  text-neutral-800 outline-none transition-colors
                  placeholder:text-neutral-500 hover:bg-white
                  dark:border-white/20 dark:text-neutral-100
                  dark:placeholder:text-neutral-500 dark:hover:bg-white/5
                  md:w-56
                "
              />

              <button
                onClick={() =>
                  document.dispatchEvent(
                    new KeyboardEvent("keydown", { key: "k", ctrlKey: true }),
                  )
                }
                className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                aria-label="Open archive query"
              >
                <Search className="w-4 h-4" />
              </button>

              <Kbd className="absolute right-13 top-1/2 mr-1 -translate-y-1/2 rounded-none bg-transparent text-[14px] text-neutral-600 dark:text-neutral-400">
                ⌘
              </Kbd>
              <Kbd className="absolute right-7 top-1/2 mr-1 -translate-y-1/2 rounded-none bg-transparent text-[11px] text-neutral-600 dark:text-neutral-400">
                K
              </Kbd>
            </div>

            <button
              aria-label="Open archive query"
              onClick={() =>
                document.dispatchEvent(
                  new KeyboardEvent("keydown", { key: "k", ctrlKey: true }),
                )
              }
              className="border border-black/25 p-2 text-neutral-700 hover:text-neutral-950 dark:border-white/20 dark:text-neutral-300 dark:hover:text-neutral-100 sm:hidden"
            >
              <Search className="w-5 h-5" />
            </button>

            <ThemeToggle />

            <Link
              href="https://github.com/alcanivorax/personal-blog"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden text-neutral-700 transition-colors hover:text-neutral-950 dark:text-neutral-300 dark:hover:text-neutral-100 sm:block"
              aria-label="GitHub"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-4 border-t border-black/20 font-mono text-[10px] uppercase tracking-[0.16em] dark:border-white/15 md:hidden">
          {sections.map(([label, href]) => (
            <Link
              key={label}
              href={href}
              className="border-r border-black/20 px-2 py-2 text-center text-neutral-600 last:border-r-0 dark:border-white/15 dark:text-neutral-300"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
