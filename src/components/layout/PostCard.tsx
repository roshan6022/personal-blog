import { Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// import type { Post } from "@prisma/client";

// type PostCardProps = Pick<Post, "title" | "slug" | "readTime" | "coverImage">;

type PostCardProps = {
  title: string;
  readTime: number | null;
  slug: string;
  coverImage: string | null;
};

export function PostCard({ title, readTime, slug, coverImage }: PostCardProps) {
  return (
    <Link
      href={`/post/${slug}`}
      className="group relative block border border-black/20 bg-white hover:bg-neutral-50 transition-colors overflow-hidden"
    >
      {/* Vertical Side Label */}
      <div className="absolute left-0 top-0 h-full w-[1px] bg-black/10" />
      <div className="absolute right-0 top-0 h-full w-[1px] bg-black/10" />

      <div className="absolute -left-8 top-1/2 -translate-y-1/2 rotate-90">
        <span className="text-[9px] font-mono tracking-widest text-neutral-400">
          MODULE • {slug}
        </span>
      </div>

      {/* Header Row */}
      <div className="flex justify-between items-center border-b border-black/15 px-4 py-2 bg-neutral-50/30">
        <span className="text-[10px] font-mono tracking-wider text-neutral-600">
          SECTION 01.{Math.floor(Math.random() * 90)}
        </span>
        <span className="text-[10px] font-mono tracking-wider text-neutral-600">
          {readTime} MIN
        </span>
      </div>

      {/* Image */}
      <div className="aspect-[4/3] border-b border-black/15 relative overflow-hidden">
        {coverImage ? (
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-neutral-400 text-xs font-mono tracking-wider">
            NO IMAGE
          </div>
        )}
      </div>

      {/* Title Block */}
      <div className="px-4 py-6">
        <p className="text-[10px] font-mono text-neutral-500 mb-3 tracking-wider">
          SPECIFICATION ENTRY
        </p>

        <h2 className="text-[18px] font-medium text-neutral-900 leading-tight tracking-tight group-hover:translate-x-[2px] transition-transform">
          {title}
        </h2>
      </div>
    </Link>
  );
}
