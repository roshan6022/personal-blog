"use client";

import * as React from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useRouter } from "next/navigation";
import { DialogTitle } from "@radix-ui/react-dialog";
import { GitBranch, Library, Map, ScanSearch, TextAlignStart } from "lucide-react";
import { Kbd } from "./ui/kbd";
import { CornerDownLeft } from "lucide-react";

type SearchItem = {
  id: number;
  title: string;
  slug: string;
};

export function SearchCommand({ posts }: { posts: SearchItem[] }) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  // ⌘K / Ctrl+K
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <DialogTitle className="sr-only">Archive Query System</DialogTitle>
      <div className="border-b border-black/20 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.24em] text-neutral-500 dark:border-white/15 dark:text-neutral-400">
        Archive Query / Retrieval System
      </div>
      <CommandInput placeholder="Query archive entries..." />
      <CommandList>
        <CommandEmpty>No matching archive records.</CommandEmpty>
        <CommandGroup heading="Archive Entries">
          {posts.map((post) => (
            <CommandItem
              key={post.id}
              value={post.title}
              onSelect={() => {
                router.push(`/post/${post.slug}`);
                setOpen(false);
              }}
            >
              <TextAlignStart />
              <span>{post.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Navigation Modes">
          <CommandItem
            value="Index"
            onSelect={() => {
              router.push("/#index");
              setOpen(false);
            }}
          >
            <Library />
            <span>Index / Classifications</span>
          </CommandItem>
          <CommandItem
            value="Map"
            onSelect={() => {
              router.push("/#map");
              setOpen(false);
            }}
          >
            <Map />
            <span>Map / Connected Thoughts</span>
          </CommandItem>
          <CommandItem
            value="Timeline"
            onSelect={() => {
              router.push("/#timeline");
              setOpen(false);
            }}
          >
            <GitBranch />
            <span>Timeline / Evolution</span>
          </CommandItem>
          <CommandItem
            value="Archive"
            onSelect={() => {
              router.push("/#archive");
              setOpen(false);
            }}
          >
            <ScanSearch />
            <span>Archive / All Entries</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
      <div className="flex items-center justify-end gap-6 border-t border-black/20 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-500 dark:border-white/15 dark:text-neutral-400">
        <div className="flex items-center gap-2">
          <span>Retrieve</span>
          <Kbd>
            <CornerDownLeft />
          </Kbd>
        </div>

        <div className="flex items-center gap-2">
          <span>Exit</span>
          <Kbd>Esc</Kbd>
        </div>
      </div>
    </CommandDialog>
  );
}
