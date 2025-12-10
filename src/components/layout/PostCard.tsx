"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import type { Post } from "@/types/blog";

interface PostCardProps {
  post: Post;
  index: number;
}

export function PostCard({ post, index }: PostCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article
      className="group opacity-0 animate-fadeIn"
      style={{
        animationDelay: `${index * 100}ms`,
        animationFillMode: "forwards",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-blue-500/20 border border-gray-100 dark:border-gray-700">
        {post.coverImage && (
          <div className="relative h-64 overflow-hidden">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        )}

        <div className="p-8">
          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories.map((category, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 text-xs font-medium rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors duration-200 cursor-pointer"
                >
                  {category.name}
                </span>
              ))}
            </div>
          )}

          <Link href={`/post/${post.slug}`}>
            <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
              {post.title}
            </h2>
          </Link>

          <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3 leading-relaxed">
            {post.content}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <Clock className="w-4 h-4" />
              <time dateTime={post.createdAt.toISOString()}>
                {formattedDate}
              </time>
            </div>

            <Link
              href={`/post/${post.slug}`}
              className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-medium hover:space-x-3 transition-all duration-200"
            >
              <span>Read more</span>
              <ArrowRight
                className={`w-4 h-4 transition-transform duration-200 ${
                  isHovered ? "translate-x-1" : ""
                }`}
              />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
