import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma  from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

// Validation schema
const postSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  content: z.string().min(1, "Content is required"),
  categoryId: z.string().min(1, "Category is required"),
  isAnonymous: z.boolean().default(false),
});

export async function POST(req: Request) {
  try {
    console.log(1)
    // Get authenticated user
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    console.log(2)

    // Parse and validate request body
    const body = await req.json();
    console.log(body);
    const validatedData = postSchema.parse(body);

    // Verify category exists
    const category = await prisma.category.findUnique({
      where: { id: validatedData.categoryId },
    });

    if (!category) {
      return NextResponse.json(
        { error: "Invalid category" },
        { status: 400 }
      );
    }

    // Create post with efficient query
    const post = await prisma.post.create({
      data: {
        title: validatedData.title,
        content: validatedData.content,
        categoryId: validatedData.categoryId,
        isAnonymous: validatedData.isAnonymous,
        authorId: validatedData.isAnonymous ? null : session.user.id,
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
      },
    });

    return NextResponse.json(post, { status: 201 });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error("[POST_CREATION_ERROR]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 

// to get the posts 

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const posts = await prisma.post.findMany({
      take: limit,
      skip: skip,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        category: {
          select: {
            id: true,
            name: true
          }
        },
        author: {
          select: {
            id: true,
            name: true,
            image: true
          }
        },
        _count: {
          select: {
            comments: true,
            votes: true
          }
        }
      }
    });

    const totalPosts = await prisma.post.count();

    return NextResponse.json({
      posts,
      metadata: {
        currentPage: page,
        totalPages: Math.ceil(totalPosts / limit),
        totalPosts
      }
    });
  }
  catch (error) {
    console.error("[POSTS_GET]", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
