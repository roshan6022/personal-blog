import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { postSchema } from "@/schema/postSchema";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body
    const validation = postSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validation.error.issues,
        },
        { status: 400 }
      );
    }

    const { title, slug, content, coverImage, published, categories } =
      validation.data;

    // Check if slug already exists
    const existingPost = await prisma.post.findUnique({
      where: { slug },
    });

    if (existingPost) {
      return NextResponse.json(
        { error: "A post with this slug already exists" },
        { status: 409 }
      );
    }

    // Create the post with categories
    const newPost = await prisma.post.create({
      data: {
        title,
        slug,
        content,
        coverImage: coverImage || null,
        published: published ?? false,
        // categories: {
        //   connectOrCreate:
        //     categories?.map((categoryName: string) => ({
        //       where: { name: categoryName },
        //       create: { name: categoryName },
        //     })) || [],
        // },
      },
      include: {
        categories: true,
      },
    });

    return NextResponse.json(
      {
        message: "Post created successfully",
        post: newPost,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating post:", error);

    return NextResponse.json(
      {
        error: "Failed to create post",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
