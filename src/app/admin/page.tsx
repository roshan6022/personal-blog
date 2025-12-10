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
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      <Link
        href="/admin/post/create"
        className="bg-black text-white px-3 py-2 rounded"
      >
        Create New Post
      </Link>

      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="border p-4 rounded">
            <h3 className="text-xl font-semibold">{post.title}</h3>
            <p className="text-gray-600 text-sm">{post.slug}</p>
            <p className="text-gray-500 text-sm">
              {post.published ? "Published" : "Draft"}
            </p>

            <div className="flex gap-4 mt-4">
              {/* EDIT BUTTON */}
              <Link
                href={`/admin/post/edit/${post.id}`}
                className="text-blue-600 underline"
              >
                Edit
              </Link>

              {/* DELETE BUTTON (Client Component) */}
              <DeleteButton id={post.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
