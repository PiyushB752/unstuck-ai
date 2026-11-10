import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { z } from "zod";
import { getDatabase } from "@/lib/db";
import type { Action } from "@/types";

const requestSchema = z.object({
  clientId: z.string().uuid(),
});

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(
  request: Request,
  { params }: RouteContext
) {
  try {
    const { id } = await params;
    const body = requestSchema.safeParse(await request.json());

    if (!body.success) {
      return NextResponse.json(
        { error: "Invalid request." },
        { status: 400 }
      );
    }

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid action ID." },
        { status: 400 }
      );
    }

    const db = await getDatabase();

    const result = await db.collection<Action>("actions").updateOne(
      {
        _id: new ObjectId(id),
        clientId: body.data.clientId,
        status: "pending",
      },
      {
        $set: {
          status: "completed",
          completedAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Action not found or already completed." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      status: "completed",
    });
  } catch (error) {
    console.error("Complete action error:", error);

    return NextResponse.json(
      { error: "Unable to complete this action." },
      { status: 500 }
    );
  }
}