
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
        { error: "Invalid action ID." },
        { status: 400 }
      );
    }

    const db = await getDatabase();

    const result = await db.collection<Action>("actions").deleteOne({
      _id: new ObjectId(id),
      clientId: body.data.clientId,
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Action not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Action deleted successfully.",
    });
  } catch (error) {
    console.error("Delete action error:", error);

    return NextResponse.json(
      { error: "Unable to delete this action." },
      { status: 500 }
    );
  }
}