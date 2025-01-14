import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: "Please Signin to Comment" },
        { status: 401 }
      );
    }
  const { postId, value } = await req.json();

  console.log(postId, value);

  try {
    // Check if the user has already voted on this post
    const existingVote = await prisma.vote.findUnique({
      where: {
        postId_userId: {
          postId,
          userId : session.user.id,
        },
      },
    });

    if (existingVote) {
      // Update the existing vote
      const updatedVote = await prisma.vote.update({
        where: { id: existingVote.id },
        data: { value },
      });
      return new NextResponse(JSON.stringify(updatedVote), { status: 200 });
    } else {
      // Create a new vote
      const newVote = await prisma.vote.create({
        data: {
          postId,
          value,
          userId : session.user.id,
        },
      });
      return new NextResponse(JSON.stringify(newVote), { status: 201 });
    }
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ error: 'Failed to register vote' }), { status: 500 });
  }
}