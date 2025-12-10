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
      content: true,
      coverImage: true,
      createdAt: true,
      categories: {
        select: {
          name: true,
          slug: true,
        },
      },
    },
  });

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-300">
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-12 opacity-0 animate-fadeIn">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
            Recent Stories
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Discover perspectives that matter
          </p>
        </div>
        <div className="text-white bg-black dark:bg-green-500 p-4">
          Test Dark Mode
        </div>

        {posts.length === 0 ? (
          <p>No posts yet</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-1">
            {posts.map((post, index) => (
              <PostCard key={post.id} post={post} index={index} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
