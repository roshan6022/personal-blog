export const revalidate = 60;
import prisma from "@/lib/prisma";
import Link from "next/link";
import DeleteButton from "./DeleteButton";

export default async function Page() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      published: true,
    },
  });

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>

        <Link
          href="/admin/post/create"
          className="inline-flex items-center gap-2 rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/90 transition"
        >
          + New Post
        </Link>
      </div>

      {/* Posts List */}
      <div className="grid gap-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="rounded-lg border bg-white p-5 shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-start justify-between gap-4">
              {/* Post Info */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-500">{post.slug}</p>
              </div>

              {/* Status Badge */}
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                  post.published
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {post.published ? "Published" : "Draft"}
              </span>
            </div>

            {/* Actions */}
            <div className="mt-4 flex items-center gap-4">
              <Link
                href={`/admin/post/edit/${post.id}`}
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                Edit
              </Link>

              <DeleteButton id={post.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
