import { notFound } from "next/navigation";
import Image from "next/image";
import prisma from "@/lib/prisma";
import { markdownToHtml } from "@/lib/markdown";
import { CodeCopyScript } from "@/components/CodeCopyScript";
import { randomNumber } from "@/lib/randomNumber";
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
  });

  if (!post) notFound();

  const html = await markdownToHtml(post.content);

  console.log("=== FULL HTML OUTPUT ===");
  console.log(html);
  console.log("=== END HTML ===");

  return (
    <div className="relative max-w-5xl mx-auto px-8 py-24 dark:text-neutral-100">
      {/* Background Grid */}
      <div className="absolute inset-0 -z-10 bg-grid pointer-events-none" />
      {/* Blueprint corner marks */}
      <CornerMarks />
      {/* Side marginalia */}
      <div className="hidden lg:block absolute top-50 -left-15 w-16">
        <span className="absolute left-1/2 rotate-90 -translate-x-1/2 text-[10px] font-mono tracking-widest text-neutral-400 dark:text-neutral-500 whitespace-nowrap">
          DOCUMENT REF • {post.slug}
        </span>
      </div>
      {/* Header */}
      <header className="mb-24 border-b border-black/10 dark:border-white/15 pb-8">
        <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 mb-4">
          SECTION • 01.{randomNumber} – TECHNICAL REPORT
        </p>

        <h1 className="text-[42px] leading-[1.1] tracking-tight text-neutral-900 dark:text-neutral-100">
          {post.title}
        </h1>

        <div className="mt-6 flex flex-wrap gap-8 text-[12px] font-mono text-neutral-500 dark:text-neutral-400">
          <span>DATE • {post.createdAt.toISOString().slice(0, 10)}</span>
          <span>READ • {post.expectedReadTime} MIN</span>
          <span>ID • {post.slug.toUpperCase()}</span>
        </div>
      </header>
      {/* Cover */}
      {post.coverImage && (
        <div className="mb-20 border border-black/10 dark:border-white/15 relative aspect-video overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="
      object-cover
      grayscale-50
      hover:grayscale-25
      transition duration-500
    "
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={false}
          />

          <div className="absolute top-2 left-2 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-sm px-2 py-0.5 text-[10px] font-mono tracking-wider border border-black/10 dark:border-white/15">
            FIGURE 1.{randomNumber}
          </div>
        </div>
      )}
      {/* Content */}
      <PostContent post={post} html={html} />

      {/* Footer */}
      <footer className="mt-24 pt-6 border-t border-black/10 dark:border-white/15 text-[11px] font-mono text-neutral-500 dark:text-neutral-400 tracking-widest">
        END OF DOCUMENT • {post.slug.toUpperCase()}
      </footer>
      {/* Copy button injector */}
      <CodeCopyScript />
    </div>
  );
}
