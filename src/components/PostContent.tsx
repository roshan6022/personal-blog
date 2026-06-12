"use client";
import { cn } from "@/lib/utils";

export function PostContent({ post, html }: { post: any; html: string }) {
  return (
    <article className="relative">
      <aside className="absolute -right-28 top-0 hidden w-24 text-[10px] font-mono uppercase leading-relaxed tracking-[0.24em] text-neutral-400 dark:text-neutral-500 xl:block">
        <p>Annotation Margin / {post.slug}</p>
      </aside>

      <div className="py-2">
        <div
          className={cn(
            "document-content max-w-none",

            "[&>p]:mb-7 [&>p]:text-[18px] [&>p]:leading-[1.9]",
            "[&>p]:text-neutral-700 dark:[&>p]:text-neutral-300",

            "[&>h1]:text-[38px] [&>h1]:font-semibold [&>h1]:tracking-tight",
            "[&>h1]:mt-16 [&>h1]:mb-8",
            "[&>h1]:text-neutral-950 dark:[&>h1]:text-neutral-100",

            "[&>h2]:border-t [&>h2]:border-black/20 [&>h2]:pt-8",
            "[&>h2]:text-[30px] [&>h2]:font-semibold [&>h2]:tracking-tight",
            "[&>h2]:mt-14 [&>h2]:mb-6",
            "[&>h2]:text-neutral-950 dark:[&>h2]:border-white/15 dark:[&>h2]:text-neutral-100",

            "[&>h3]:text-[22px] [&>h3]:font-medium",
            "[&>h3]:mt-10 [&>h3]:mb-4",
            "[&>h3]:text-neutral-950 dark:[&>h3]:text-neutral-100",

            "[&>h4]:text-[18px] [&>h4]:font-medium",
            "[&>h4]:mt-8 [&>h4]:mb-3",
            "[&>h4]:text-neutral-950 dark:[&>h4]:text-neutral-100",

            "[&>pre]:bg-neutral-950 dark:[&>pre]:bg-black",
            "[&>pre]:my-10 [&>pre]:rounded-none [&>pre]:px-1 [&>pre]:py-4",
            "[&>pre]:overflow-x-auto [&>pre]:border",
            "[&>pre]:border-neutral-800 dark:[&>pre]:border-white/15",

            "[&>pre>code]:bg-transparent [&>pre>code]:p-0",
            "[&>pre>code]:text-sm [&>pre>code]:text-neutral-100",

            "[&>:not(pre)>code]:bg-white dark:[&>:not(pre)>code]:bg-neutral-900",
            "[&>:not(pre)>code]:border [&>:not(pre)>code]:border-black/15 dark:[&>:not(pre)>code]:border-white/15",
            "[&>:not(pre)>code]:text-neutral-950 dark:[&>:not(pre)>code]:text-neutral-100",
            "[&>:not(pre)>code]:px-1.5 [&>:not(pre)>code]:py-0.5 [&>:not(pre)>code]:rounded",
            "[&>:not(pre)>code]:text-[15px] ",

            "[&>a]:text-neutral-950 dark:[&>a]:text-neutral-100",
            "[&>a]:underline [&>a]:decoration-black/30 dark:[&>a]:decoration-white/40",
            "[&>a]:underline-offset-4",
            "hover:[&>a]:decoration-black dark:hover:[&>a]:decoration-white",
            "[&>a]:transition-colors",

            "[&>ul]:list-disc [&>ul]:ml-6 [&>ul]:my-6",
            "[&>ul]:text-neutral-700 dark:[&>ul]:text-neutral-300",

            "[&>ol]:list-decimal [&>ol]:ml-6 [&>ol]:my-6",
            "[&>ol]:text-neutral-700 dark:[&>ol]:text-neutral-300",

            "[&>li]:mb-2 [&>li]:leading-[1.75]",

            "[&>blockquote]:border-l",
            "[&>blockquote]:border-neutral-950 dark:[&>blockquote]:border-white/40",
            "[&>blockquote]:my-10 [&>blockquote]:pl-6 [&>blockquote]:py-2",
            "[&>blockquote]:text-neutral-600 dark:[&>blockquote]:text-neutral-400",

            "[&>hr]:border-neutral-300 dark:[&>hr]:border-white/15 [&>hr]:my-12",

            "[&>table]:w-full [&>table]:my-8 [&>table]:border-collapse",
            "[&>table>thead]:border-b-2",
            "[&>table>thead]:border-neutral-300 dark:[&>table>thead]:border-white/15",
            "[&>table>thead>tr>th]:px-4 [&>table>thead>tr>th]:py-3 [&>table>thead>tr>th]:text-left",
            "[&>table>thead>tr>th]:font-semibold",
            "[&>table>thead>tr>th]:text-neutral-950 dark:[&>table>thead>tr>th]:text-neutral-100",
            "[&>table>tbody>tr]:border-b",
            "[&>table>tbody>tr]:border-neutral-200 dark:[&>table>tbody>tr]:border-white/10",
            "[&>table>tbody>tr>td]:px-4 [&>table>tbody>tr>td]:py-3",
            "[&>table>tbody>tr>td]:text-neutral-700 dark:[&>table>tbody>tr>td]:text-neutral-300",

            "[&>img]:my-12 [&>img]:rounded-none [&>img]:border",
            "[&>img]:border-neutral-300 dark:[&>img]:border-white/15"
          )}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </article>
  );
}
