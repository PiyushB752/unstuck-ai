import { NextResponse } from "next/server";
import { z } from "zod";
import { getDatabase } from "@/lib/db";
import type { Session, Action } from "@/types";

const requestSchema = z.object({
  clientId: z.string().uuid(),
});

export async function DELETE(request: Request) {
  try {
    const body = requestSchema.safeParse(await request.json());

    if (!body.success) {
      return NextResponse.json(
        { error: "Invalid request." },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const { clientId } = body.data;

    await db.collection<Action>("actions").deleteMany({ clientId });
    await db.collection<Session>("sessions").deleteMany({ clientId });

    return NextResponse.json({
      success: true,
      message: "All history cleared successfully.",
    });
  } catch (error) {
    console.error("Clear history error:", error);

    return NextResponse.json(
      { error: "Unable to clear history." },
      { status: 500 }
    );
  }
}