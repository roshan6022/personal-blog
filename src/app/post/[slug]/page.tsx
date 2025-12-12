import React from "react";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import Image from "next/image";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: { slug },
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="relative max-w-4xl mx-auto px-8 py-24">
      {/* Background Grid */}
      <div className="absolute inset-0 -z-10 bg-grid pointer-events-none" />

      {/* Side Labels */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 rotate-90">
        <span className="text-[10px] font-mono tracking-widest text-neutral-400">
          ARTICLE • {post.slug}
        </span>
      </div>

      {/* Header Section */}
      <div className="mb-20 border-b border-black/15 pb-8">
        <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-3">
          SECTION • 01.00
        </p>

        <h1 className="text-[40px] font-semibold leading-none tracking-tight text-neutral-900">
          {post.title}
        </h1>

        {/* Metadata Block */}
        <div className="mt-6 text-[12px] font-mono text-neutral-500 flex gap-6 flex-wrap">
          <span>DATE • {post.createdAt.toISOString().slice(0, 10)}</span>
          <span>READ • {post.expectedReadTime} MIN</span>
        </div>
      </div>

      {/* Optional Cover Image */}
      {post.coverImage && (
        <div className="mb-16 border border-black/10">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full object-cover grayscale hover:grayscale-0 transition"
          />
        </div>
      )}

      {/* Content */}
      <article
        className="
          prose prose-neutral max-w-none
          prose-h2:text-[26px] prose-h2:font-medium prose-h2:tracking-tight
          prose-p:text-[16px] prose-p:leading-relaxed
          prose-strong:text-neutral-900
          prose-code:text-[14px]
          prose-pre:bg-neutral-50 prose-pre:border prose-pre:border-black/10
        "
      >
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>

      {/* Footer Divider */}
      <div className="mt-20 border-t border-black/15 pt-6 text-[11px] font-mono text-neutral-500">
        END OF DOCUMENT
      </div>
    </div>
  );
}
