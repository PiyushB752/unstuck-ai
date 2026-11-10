
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { z } from "zod";
import { getDatabase } from "@/lib/db";
import type { Session, Action } from "@/types";

const requestSchema = z.object({
  clientId: z.string().uuid(),
});

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function DELETE(
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
        { error: "Invalid session ID." },
        { status: 400 }
      );
    }

    const db = await getDatabase();

    const session = await db.collection<Session>("sessions").findOne({
      _id: new ObjectId(id),
      clientId: body.data.clientId,
    });

    if (!session) {
      return NextResponse.json(
        { error: "Session not found." },
        { status: 404 }
      );
    }

    await db.collection<Action>("actions").deleteMany({
      sessionId: session._id,
      clientId: body.data.clientId,
    });

    await db.collection<Session>("sessions").deleteOne({
      _id: session._id,
      clientId: body.data.clientId,
    });

    return NextResponse.json({
      success: true,
      message: "Session deleted successfully.",
    });
  } catch (error) {
    console.error("Delete session error:", error);

    return NextResponse.json(
      { error: "Unable to delete this session." },
      { status: 500 }
    );
  }
}
