import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      where: {
        status: "APPROVED",
      },
      orderBy: {
        startDate: "asc",
      },
      select: {
        id: true,
        title: true,
        description: true,
        venue: true,
        startDate: true,
        endDate: true,
        link: true,
        contactInfo: true,
        status: true,
      },
    });
    
    if (!events) {
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  console.log("Creating event");
  try {
    // const session = await getServerSession(authOptions);
    
    // if (!session?.user) {
    //   console.log("Unauthorized request");
    //   return NextResponse.json(
    //     { error: "Unauthorized" },
    //     { status: 401 }
    //   );
    // }

    const data = await request.json();

    console.log(data)
    const event = await prisma.event.create({
      data: {
        ...data,
        userId: "cm5qv12xt0000jczcvqxd2rqk",
      },
    });

    return NextResponse.json(event);
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}